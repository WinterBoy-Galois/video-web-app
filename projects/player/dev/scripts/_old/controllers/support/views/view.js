var Marionette = require('marionette');

require('_old/util/aspect_helper');


module.exports = Marionette.ItemView.extend({

    className: "vp_support_view",
    template: "<div><div class = 'vp_play'></div><h1></h1><h4></h4></div>",

    bindings: {
        "h1": "title",
        "h4": "subtitle",
        ".vp_play": {
            observe: "playable",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        ":el": {
            observe: ["active", "playable", "minimal"],
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val[0]);
                $el.toggleClass("vp_no_interaction", val[1]);
                $el.toggleClass("vp_minimal", val[2]);
            }
        }
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },

});