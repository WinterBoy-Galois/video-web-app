var Marionette = require('marionette'),
    template = require('./layout.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_player",

    regions: {
        video_engine: ".vp_engine_wrapper",
        controls: ".vp_controls_wrapper",
        end_screen: ".vp_endscreen_wrapper",
        marker_overlays: ".vp_marker_overlays_wrapper",
        markers: ".vp_markers_wrapper",
        support: ".vp_support_wrapper"
    },

    events: {
        "mouseleave": "onMouseLeave",
        "mousemove": "onInteraction",
        "touchend": "onInteraction",
        "touchmove": "onInteraction",
        "click": "onInteraction",
        // "touchstart": "preventTouches",
        // "touchend": "preventTouches",
    },

    onMouseLeave: function() {
        this.trigger('interact', -1);
    },

    onInteraction: function(e) {
        this.trigger('interact', e.clientX);
    },

    preventTouches: function(e) {
        e.stopImmediatePropagation();
    },

    behaviors: {
        SelfTest: {},
    }

});