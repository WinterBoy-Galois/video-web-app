var Marionette = require('marionette');

require('stickit');


module.exports = Marionette.ItemView.extend({

    template: false,
    className: "vp_loading_indicator",

    bindings: {
        ":el": {
            observe: ['dark', 'stopped'],
            update: function($el, vals) {
                $el.toggleClass('vp_dark', !!vals[0]);
                $el.toggleClass('vp_stopped', !!vals[1]);
            }
        }
    },

    onRender: function() {
        this.stickit();
    }
});