var Marionette = require('marionette'),
    template = require('./layout.html');

require('stickit');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_controls",

    regions: {
        playbar: ".vp_playbar_wrapper",
        large_buttons: ".vp_large_buttons_wrapper",
        small_buttons: ".vp_small_buttons_wrapper"
    },

    bindings: {
        ':el': {
            observe: ['controls_collapsed', 'editing', 'user_activity_enabled'],
            update: function($el, val) {
                $el.toggleClass("vp_collapsed", val[0]);
                $el.toggleClass("vp_editing", val[1]);
                $el.toggleClass("vp_no_interaction", !val[2]);
            },
        },
        '.vp_logo': {
            observe: 'show_logo',
            update: function($el, val) {
                $el.toggleClass("vp_hidden", !val);
            }
        },
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

});