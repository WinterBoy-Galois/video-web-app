var Marionette = require('marionette'),
    helper = require('_old/util/fullscreen_helper');


module.exports = Marionette.Controller.extend({

    initialize: function(config) {

        this.listenTo(config.playerState, "change:is_fullscreen", function(state, fullscreen) {
            if (!helper.fullscreenAvailable()) {
                return;
            }
            if (fullscreen) {
                helper.showFullscreen();
            } else {
                helper.hideFullscreen();
            }
        });

        var changeHandler = function() {
            if (helper.isFullscreen()) {
                config.api.command("show_fullscreen");
            } else {
                config.api.command("hide_fullscreen");
            }
        };
        helper.registerChangeHandler(changeHandler);

    },

});