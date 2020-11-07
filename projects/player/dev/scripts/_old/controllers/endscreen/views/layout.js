var Marionette = require('marionette');


module.exports = Marionette.LayoutView.extend({

    className: "vp_endscreen_container",
    template: "<div> <div class = 'vp_content'></div> </div>",

    regions: {
        contentRegion: ".vp_content",
    },

    events: {
        "click": "onClick",
        'touchmove': "onTouchMove"
    },

    behaviors: {
        SelfTest: {},
        Fading: {
            removed: true
        },
        FastClick: {}
    },

    showEndscreen: function(view) {
        this.contentRegion.show(view);
        this.fadeIn();
    },

    hideEndscreen: function() {
        var _this = this;
        this.fadeOut(function() {
            _this.contentRegion.reset();
        });
    },

    onClick: function() {
        this.trigger("background_clicked");
    },

    onTouchMove: function(e) {
        // enable endscreen scrolling
        e.stopPropagation();
    }

});