var Marionette = require('marionette'),
    template = require('./layout.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_marker_overlays",

    regions: {
        content: ".vp_content_wrapper"
    },

    events: {
        "click": "onClick"
    },

    bindings: {
        ":el": {
            observe: ["hasLargeContent", "state", "hasNarrowContent"],
            update: function($el, val) {
                $el.toggleClass("vp_large_content", val[0]);
                $el.toggleClass("vp_narrow_content", val[2]);
                $el.toggleClass("vp_editing", val[1] !== "view");
            }
        }
    },

    behaviors: {
        Fading: {
            removed: true
        },
        SelfTest: {},
        Stickit: {}
    },

    showOverlay: function(view) {
        this.content.show(view);
        this.fadeIn();
    },

    hideOverlay: function() {
        var _this = this;
        this.fadeOut(function() {
            _this.content.reset();
        });
    },

    onClick: function(e) {
        this.trigger("click", {
            x: e.clientX,
            y: e.clientY
        });
    },

});