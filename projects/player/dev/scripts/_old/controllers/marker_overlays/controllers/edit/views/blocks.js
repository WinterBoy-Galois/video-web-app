var $ = require('jquery'),
    Marionette = require('marionette'),
    content_config = require('../../content_config'),
    EditController = require('../blocks/controller'),
    EmptyView = require('./empty');


module.exports = Marionette.CollectionView.extend({

    className: "vp_content_blocks_edit",
    blockControllers: {},

    getEmptyView: function() {
        return EmptyView;
    },

    childView: Marionette.ItemView,
    childViewEventPrefix: "child",

    behaviors: {
        PlayerResize: {
            onShow: true
        },
        SelfTest: {},
    },

    onShow: function() {
        this.setupSorting();
    },

    buildChildView: function(child, ChildViewClass) {

        // return the empty view if the model is empty
        // seems to be a bug...
        if (ChildViewClass === EmptyView) {
            return new EmptyView();
        }

        var type = child.get("type");
        var typeConfig = content_config[type];

        // instantiate controller for
        // view
        if (typeConfig) {

            var c = new EditController({
                content: child,
                blockClass: typeConfig.editController
            });

            // save controller in controllers array
            // should probably somehow be managed by parent controller
            // not sure...
            this.blockControllers[child.cid] = c;

            return c.rootView;
        } else {
            return new Marionette.ItemView({
                template: "<div> </div>"
            });
        }
    },

    onRemoveChild: function(view) {
        // destroy controller of this view
        // should probably somehow be managed by parent controller
        // not sure...
        if (view && view.model && view.model.cid) {
            this.blockControllers[view.model.cid].destroy();
            this.blockControllers[view.model.cid] = null;
        }
    },

    setupSorting: function() {
        var _this = this;
        this.$el.sortable({
            axis: "y",
            handle: ".vp_handle",
            start: function(e, ui) {
                _this.reportDragStart(ui.item);
            },
            stop: function(e, ui) {
                _this.trigger("sorted_blocks");
                _this.reportDragEnd(ui.item);
            },
            connectWith: ".vp_edit_tools",

            // hack for adding placeholder
            placeholder: {
                element: function() {
                    return $("<div class = 'vp_placeholder'>+</div>")[0];
                },
                update: function() {
                    return;
                }
            }
        });
    },

    getControllerForElement: function(element) {
        var id = element.attr("data-id");
        if (!id) {
            return false;
        }
        var model = this.collection.get(id);
        var c = this.blockControllers[model.cid];
        return c;
    },

    reportDragStart: function(ui) {
        var c = this.getControllerForElement(ui);
        if (c && c.subController.dragStart) {
            c.subController.dragStart();
        }
    },

    reportDragEnd: function(ui) {
        var c = this.getControllerForElement(ui);
        if (c && c.subController.dragEnd) {
            c.subController.dragEnd();
        }
    },

    onPlayerResize: function() {
        var $parent = this.$el.offsetParent();
        var val = $parent.height() - 50;
        this.$el.css("min-height", val + "px");
    },

});