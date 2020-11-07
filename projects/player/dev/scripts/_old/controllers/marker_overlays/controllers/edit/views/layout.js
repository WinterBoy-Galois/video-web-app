var Marionette = require('marionette'),
    timestring_helpers = require('_old/util/timestring_helpers'),
    template = require('./layout.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_marker_overlay_edit",

    regions: {
        content: ".vp_marker_overlay_content",
        toolbar: ".vp_toolbar_wrapper",
        preview: ".vp_preview_wrapper"
    },

    ui: {
        "overlay_content": "vp_marker_overlay_content"
    },

    bindings: {
        ".vp_title_edit": "title",
        ".vp_time_edit": {
            observe: "time",
            onGet: function(val) {
                return timestring_helpers.secondsToString(val);
            },
            onSet: function(val) {
                val = timestring_helpers.stringToSeconds(val);
                return val;
            },
            updateModel: function(val) {
                val = timestring_helpers.stringToSeconds(val);
                return val >= 0;
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        Form: {}
    },

    events: {
        "click": "onClick",
        "keydown": "onKeyDown"
    },

    onShow: function() {
        this.ui.overlay_content.sortable();
    },

    onClick: function(e) {
        e.stopImmediatePropagation();
    },

    onKeyDown: function(e) {
        e.stopImmediatePropagation();
    }

});