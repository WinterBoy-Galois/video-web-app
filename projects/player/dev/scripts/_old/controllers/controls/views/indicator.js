var Marionette = require('marionette'),
    template = require('./indicator.html');

require('stickit');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_indicator",

    bindings: {
        ":el": {
            observe: ['time'],
            update: function($el, val) {
                // calculate offset from video length and marker position
                var offset = val[0] / this.options.video.get("duration") * 100;
                offset = offset > 100 ? 100 : offset;
                $el.css("top", offset + "%");
            }
        },
    },


    behaviors: {
        SelfTest: {},
        "Stickit": {}
    },

});