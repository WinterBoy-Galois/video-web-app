var Marionette = require('marionette'),
    template = require('./small_buttons.html');

require('stickit');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_small_buttons",

    regions: {
        "shareButtons": ".vp_share_links"
    },

    events: {
        "click .vp_fullscreen_button": "onFullscreenClick",
        "click .vp_playbutton": "onPlayClick",
        "click .vp_mute_button": "onVolumeClick",
        "click .vp_favicon": "onFaviconClick",
        "click .vp_add_marker_button": "onAddMarkerClick",
    },

    bindings: {
        ".vp_playbutton": {
            observe: ['indicate_is_playing', 'show_small_playbutton'],
            update: function($el, val) {
                $el.toggleClass("active", val[0]);
                $el.toggleClass("vp_removed", !val[1]);
            }
        },
        ".vp_mute_button": {
            observe: ['indicate_is_muted', 'show_mute_button'],
            update: function($el, val) {
                $el.toggleClass("active", !val[0]);
                $el.toggleClass("vp_removed", !val[1]);
            }
        },
        ".vp_add_marker_button": {
            observe: 'show_add_marker_button',
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        ".vp_fullscreen_button": {
            observe: ['indicate_is_fullscreen', 'show_fullscreen_button'],
            update: function($el, val) {
                $el.toggleClass("active", val[0]);
                $el.toggleClass("vp_removed", !val[1]);
            }
        },
        ".vp_favicon": {
            observe: ["icon_url", "controls_collapsed"],
            update: function($el, val) {
                var image = "";
                if (val[0] && !val[1]) {
                    image = 'url(' + val[0] + ')';
                }
                $el.css("background-image", image);

            }
        },
        ".vp_small_buttons_right": {
            observe: ["disable_small_right_buttons", "show_small_buttons_right"],
            update: function($el, val) {
                $el.toggleClass("vp_disabled", !!val[0]);
                $el.toggleClass("vp_hidden", !val[1]);

            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        FastClick: {},
        ShareButtons: {}
    },

    onFullscreenClick: function(e) {
        e.preventDefault();
        this.trigger("fullscreen_clicked");
    },

    onVolumeClick: function() {
        this.trigger("volume_clicked");
    },

    onPlayClick: function(e) {
        e.preventDefault();
        this.trigger("play_clicked");
    },

    onFaviconClick: function(e) {
        e.preventDefault();
        this.trigger("favicon_clicked");
    },

    onAddMarkerClick: function() {
        this.trigger("add_marker_clicked");
    },

});