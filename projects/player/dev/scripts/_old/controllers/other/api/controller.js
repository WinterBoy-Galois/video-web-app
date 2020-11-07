var config = require('config'),
    Marionette = require('marionette'),
    Radio = require('radio');


module.exports = Marionette.Controller.extend({

    channel: Radio.channel(config.channels.builder),

    initialize: function(options) {

        // hand the channel over to the app
        try {
            window.parent.videopath_app.connect_builder(this.channel);
        } catch(_){}

        // route request events
        var _this = this;

        // endscreen
        this.channel.comply("edit_endscreen", function() {
            options.api.command('show_endscreen');
        });

        this.channel.comply("pause", function() {
            options.api.command("pause");
        });

        // endscreen events
        this.listenTo(this.options.playerState, "change:endscreen_showing", function(state, showing) {
            if (showing) {
                _this.channel.trigger('show_endscreen');
            } else {
                _this.channel.trigger('hide_endscreen');
            }
        });

        // overlay events
        this.listenTo(this.options.playerState, "change:open_marker", function(state, marker) {
            if (marker < 0) {
                _this.channel.trigger('hide_overlay');
            } else {
                _this.channel.trigger('show_overlay');
            }
        });

    },

});