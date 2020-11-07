var $ = require('jquery'),
    Marionette = require('marionette');


module.exports = Marionette.Controller.extend({

    initialize: function(player) {

        // bind to document for now
        $(document).keydown(function(e) {

            // flilter out tinymce popups (hacky...)
            if ($(e.target).hasClass('mce-textbox')) {
                return;
            }

            var keycode = e.keyCode;

            // toggle play on space
            if (keycode === 32) {
                // prevent player engines own space
                // fixes wistia issues in safari
                e.preventDefault();
                e.stopImmediatePropagation();

                player.api.command("toggle_play");
            }

            // close overlay on escape
            if (keycode === 27) {
                player.api.command("hide_marker_content");
            }

        });

    },

});