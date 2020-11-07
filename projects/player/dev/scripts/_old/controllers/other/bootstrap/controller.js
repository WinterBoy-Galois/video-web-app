var Marionette = require('marionette');

require('radio');


module.exports = Marionette.Controller.extend({

    initialize: function(config) {

        this.listenTo(config.playerState, "change:has_played", function(state, has_played) {
            if (document.videopath.player.bootstrap && has_played) {
                document.videopath.player.bootstrap.remove();
            }
        });

    },

});