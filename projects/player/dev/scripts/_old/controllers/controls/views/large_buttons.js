var Marionette = require('marionette'),
    template = require('./large_buttons.html');

require('stickit');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_large_buttons",

    regions: {
        "loadIndicator": ".vp_large_loading_indicator"
    },

    bindings: {

        '.vp_large_play_button': {
            observe: 'show_large_play_button',
            update: function($el, val) {
                $el.toggleClass("vp_hidden", !val);
            }
        },

        '.vp_large_loading_indicator': {
            observe: 'show_large_loading_indicator',
            update: function($el, val) {
                $el.toggleClass("vp_hidden", !val);
            }
        },

        ':el': {
            observe: ['enable_youtube_ad_fix', 'disable_large_buttons'],
            update: function($el, val) {
                $el.toggleClass("vp_youtube_ad_fix", !!val[0]);
                $el.toggleClass("vp_removed", !!val[1]);
            }
        }

    },

    events: {
        'click': 'onClick',
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        FastClick: {}
    },

    onClick: function() {
        this.trigger("clicked");
    },
});