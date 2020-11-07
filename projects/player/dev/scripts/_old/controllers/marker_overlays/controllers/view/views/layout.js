var Marionette = require('marionette'),
    template = require('./layout.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_marker_overlay_view",

    regions: {
        content: ".vp_marker_overlay_content",
        share_buttons: ".vp_share_links"
    },

    bindings: {
        ".vp_overlay_title": {
            observe: ["title"],
            update: function($el, vals) {
                $el.text(vals[0]);
            }
        },
    },

    events: {
        "click .vp_close_button": "onCloseClicked",
        "touchmove": "onMainTouch",
        "click": "onClick",
        "touchstart": function() {} // Prevent FastClick from making ios unscrollable
    },

    ui: {
        'title': '.vp_title',
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        FastClick: {},
        ShareButtons: {}
    },

    onCloseClicked: function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.trigger("close_clicked");
    },

    // this needs to stay in so the touch event
    // does not bubble to the body where we catch and
    // disable it, so the whole view does not bounce
    onMainTouch: function(e) {
        e.stopImmediatePropagation();
    },

    onClick: function(e) {
        e.stopImmediatePropagation();
    },

});