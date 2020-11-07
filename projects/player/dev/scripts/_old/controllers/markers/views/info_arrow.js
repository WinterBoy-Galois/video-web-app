var Marionette = require('marionette'),
    template = require('./info_arrow.html'),
    strings = require('config/strings');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_info_arrow vp_removed",

    stringBindings: {
        ".txt": "clickMe"
    },

    bindings: {
        ":el": {
            observe: ['offset'],
            update: function($el, offset) {
                $el.css('top', offset[0]);
            }
        }
    },

    behaviors: {
        StringBindings: {
            strings: strings
        },
        Stickit: {},
        Fading: {},
        SelfTest: {}
    },
});