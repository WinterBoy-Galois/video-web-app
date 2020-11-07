var Marionette = require('marionette');

require('tooltipster');


var behavior = Marionette.Behavior.extend({

    onRender: function() {

        // setup tooltips
        var conf = {
            animation: "fade",
            position: "top",
            maxWidth: 250,
            delay: 500,
            interactive: true,
            contentAsHTML: true
        };

        // setup all tooltips for top
        this.view.$el.find('.tt-top, .info_bubble, .vp_info_bubble').tooltipster(conf);

        conf.position = "left";
        this.view.$el.find('.tt-left').tooltipster(conf);
    },


});

module.exports = behavior;