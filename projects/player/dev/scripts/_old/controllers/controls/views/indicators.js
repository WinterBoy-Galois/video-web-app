var Marionette = require('marionette'),
    IndicatorView = require('./indicator');


module.exports = Marionette.CollectionView.extend({

    childView: IndicatorView,
    className: "vp_indicators",

    childViewOptions: function() {
        return {
        	playerState: this.options.playerState,
            video: this.options.video
        };
    },

    childViewEventPrefix: "child"

});