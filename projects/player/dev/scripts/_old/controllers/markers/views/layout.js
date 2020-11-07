var Marionette = require('marionette'),
    template = require('./layout.html'),
    strings = require('config/strings');


module.exports = Marionette.LayoutView.extend({

    className: "vp_markers vp_hidden",
    template: template,

    regions: {
        marker_collection: ".vp_markers_collection_wrapper",
        infoArrow: ".vp_help_indicator",
        addMarker: ".vp_add_marker_wrapper",
        brandedMarker: ".vp_branded_marker_wrapper"
    },

    events: {
        "touchmove": "onTouchMove",
        "touchend": "onTouchEnd",
        "touchstart": "onTouchStart",
        "touchcancel": "onTouchCancel",
        'click': 'onClick'
    },

    bindings: {
        ":el": {
            observe: ["editing", "markers_active"],
            update: function($el, val) {
                // weird bug, getting a different model instance here...
                // for now grab value from model directly
                val[0] = this.model.get("editing");
                $el.toggleClass("vp_editing", !!val[0]);

                val[1] = this.model.get("markers_active");
                $el.toggleClass("vp_active", !!val[1]);
            }
        },

        ".vp_info_arrow": {
            observe: "show_drag_marker_hint",
            update: function($el, val) {
                val = this.model.get("show_drag_marker_hint");
                $el.toggleClass("vp_hidden", !val);
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        StringBindings: {
            strings: strings
        },
        FastClick: {}
    },

    onClick: function() {
        this.trigger("click");
    },

    onTouchMove: function(e) {
        this.trigger("touch_move", e);
    },

    onTouchEnd: function(e) {
        e.preventDefault();
        this.trigger("touch_end", e);
    },

    onTouchStart: function(e) {
        e.preventDefault();
        this.trigger("touch_start", e);
    },

    onTouchCancel: function(e) {
        this.trigger("touch_cancel", e);
    },


    // helpers
    getAddMarkerOffset: function() {
        return this.addMarker.$el.offset().top - this.marker_collection.$el.offset().top;
    },

});