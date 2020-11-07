var Marionette = require('marionette'),
    template = require('./toolbar.html'),
    ToolView = require('./tool'),
    $ = require('jquery');


module.exports = Marionette.CompositeView.extend({

    template: template,
    className: "vp_toolbar",

    // collection view
    childView: ToolView,
    childViewEventPrefix: "child",
    childViewContainer: ".vp_tools",

    bindings: {
        ".vp_tools": {
            observe: "toolbar_active",
            update: function($el, val) {

                $el.toggleClass("vp_folded", !val);
            }
        },
        ".vp_preview_button": "preview_button_title"
    },

    events: {
        "click .vp_preview_button": "onPreviewClicked",
        "click .vp_delete_button": "onDeleteClicked",
        "click .vp_save_button": "onSaveClicked",
        "click .vp_edit_tool": "onToolClicked"
    },

    behaviors: {
        Stickit: {}
    },

    onRender: function() {
        this.setupSorting();
    },

    setupSorting: function() {
        var _this = this;
        this.$(".vp_edit_tool").draggable({
            appendTo: 'body',
            containment: 'window',
            revert: true,
            revertDuration: 0,
            helper: "clone",
            stop: function() {
                _this.trigger("tool_dragged");
                _this.render();
            },
            connectToSortable: ".vp_content_blocks_edit"
        });
    },

    onPreviewClicked: function() {
        this.trigger("preview_clicked");
    },

    onDeleteClicked: function() {
        this.trigger("delete_clicked");
    },

    onSaveClicked: function() {
        this.trigger("save_clicked");
    },

    onToolClicked: function(e){
        var tool = $(e.currentTarget).data('tool');
        this.trigger("tool_clicked", tool);
    }


});