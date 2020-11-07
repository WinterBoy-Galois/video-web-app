var $ = require('jquery'),
    ViewController = require('../view/controller'),
    Controller = require('shared/controllers/controller'),
    view_model_factory = require('./util/view_model_factory'),
    tools_collection_factory = require('./util/tools_collection_factory'),
    marker_delete_helper = require('../../../markers/util/delete_marker_modal_helper'),
    LayoutView = require('./views/layout'),
    BlocksView = require('./views/blocks'),
    ToolbarView = require('./views/toolbar');

require('tooltipster');


module.exports = Controller.extend({

    views: {

        // toolbar
        toolbarView: {
            region: "toolbar",
            factory: function(c) {
                return new ToolbarView({
                    model: view_model_factory.create(c.options.overlayState),
                    collection: tools_collection_factory.create(c.options.overlayState)
                });
            },
            events: {
                "tool_dragged": function() {
                    this.insertBlockForTool();
                },
                "preview_clicked": function() {
                    this.togglePreview();
                },
                "save_clicked": function() {
                    this.options.video.save(false, {
                        nested:true,
                        onlyDirty:true
                    });
                    this.options.api.command("hide_marker_content");
                },
                "delete_clicked": function() {
                    marker_delete_helper.confirmMarkerDelete(this.options, this.options.marker.get("id"));
                },
                "tool_clicked":function(tool) {
                    var _this = this;
                    _this.options.api.command("add_marker_content", this.options.marker, tool, 0, function(){
                        _this.updateState();
                    });
                }
            }
        },

        // edit blocks
        blocksView: {

            region: "content",
            factory: function(c) {
                return new BlocksView({
                    collection: c.options.marker.contents
                });
            },
            events: {

                "child:delete": function(child) {
                    this.deleteBlock(child);
                },

                "child:minify": function() {
                    this.views.blocksView.$el.toggleClass("vp_minified");
                },

                // if blocks are sorted
                // update ordinal on each block
                "sorted_blocks": function() {
                    this.updateBlockOrdinals();
                }
            }
        },

    },

    buildRootView: function() {
        return new LayoutView({
            model: this.options.marker,
            video: this.options.video
        });
    },

    onRootViewShow: function() {
        this.updateState();
    },

    updateState: function() {

        // see if the overlay requires large content
        var contents = this.options.marker.contents,
            firstType;

        if (contents.length === 1) {
            firstType = contents.first().get("type");
        }

        var requiresLargeContent = false;
        if (firstType === "website") {
            requiresLargeContent = true;
        }

        var hasExclusiveContent = false;
        if (firstType === "website" || firstType === "social") {
            hasExclusiveContent = true;
        }

        var hasNarrowContent = false;
        if (firstType === "social") {
            hasNarrowContent = true;
        }

        this.options.overlayState.set({
            hasNarrowContent: hasNarrowContent,
            hasLargeContent: requiresLargeContent,
            hasExclusiveContent: hasExclusiveContent,
            numberOfBlocks: this.options.marker.contents.length
        });
    },


    // toggle preview state
    togglePreview: function() {

        if (this.options.overlayState.get("state") === this.options.overlayState.states.EDIT) {

            // create preview controller
            this.previewController = new ViewController(this.options);
            this.rootView.preview.show(this.previewController.rootView);

            this.options.overlayState.set({
                state: this.options.overlayState.states.PREVIEW
            });
        } else {

            // dispose preview controller
            this.rootView.preview.reset();
            this.previewController.destroy();

            this.options.overlayState.set({
                state: this.options.overlayState.states.EDIT
            });
        }

    },


    // delete a content block
    deleteBlock: function(child) {
        var _this = this;
        this.options.api.command("delete_marker_content", child.model, function(){
            _this.updateState();
        });
    },

    // if blocks have been reordered or a new
    // block has been inserted,
    // update the ordinals
    updateBlockOrdinals: function() {
        var _this = this;
        this.rootView.$(".vp_content_block_edit").each(function(index) {
            var block_id = $(this).attr("data-id");
            var block = _this.options.marker.contents.get(block_id);
            if (block) {
                block.set({
                    ordinal: index
                });
            }
        });
        this.options.marker.contents.sort();

    },

    // goes through the content blocks area and
    // looks if a tool was dropped there
    // if so, insert a new content in to the
    // marker object
    insertBlockForTool: function() {

        var marker = this.options.marker;
        var _this = this;

        // find edit tools
        var editTools = this.rootView.$(".vp_content_blocks_edit .vp_edit_tool");
        editTools.each(function() {

            // find all instances of dragged and dropped
            // tools get the index and remove that div
            var $this = $(this);
            var insertIndex = $this.index();
            var type = $this.attr("data-tool");
            $(this).remove();

            _this.options.api.command("add_marker_content", marker, type, insertIndex, function(){
                _this.updateState();
            });
            _this.updateState();

        });

    }

});