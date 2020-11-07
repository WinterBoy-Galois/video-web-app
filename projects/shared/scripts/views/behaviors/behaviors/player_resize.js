var Marionette = require('marionette'),
    Radio = require('radio');


var behavior = Marionette.Behavior.extend({

    _timeout: null,

    onRender: function() {
        var channel = Radio.channel("videopath.player.gui");
        this.view.listenTo(channel, "resize", function() {
            this.onPlayerResize();
        });
    },

    defaults: function() {
        return {
            onShow: false
        };
    },

    onShow: function() {
        if (this.options.onShow) {
            var view = this.view;
            this._timeout = setTimeout(function() {
                view.onPlayerResize();
            }, 10);
        }
    },

    onDestroy: function() {
        clearTimeout(this._timeout);
    }

});

module.exports = behavior;