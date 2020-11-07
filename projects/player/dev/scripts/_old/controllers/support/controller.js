var Backbone = require('backbone'),
    Controller = require('shared/controllers/controller'),
    View = require('./views/view'),
    browser_support_helper = require('shared/util/browser_support_helpers');


module.exports = Controller.extend({

    buildRootView: function() {

        // figure out what to do
        var model = new Backbone.Model({

        });

        // if this browser is not supported at all
        // disable the player and say so
        if (!browser_support_helper.browserSupported) {
            model.set({
                title: "Your browser is unsupported",
                subtitle: "Please upgrade to a newer browser",
                active: true,
            });
        } else if (this.options.playerState && this.options.playerState.get("reduced_ui")) {
            model.set({
                title: "",
                subtitle: "For interactivity, please watch on desktop",
                active: true,
                playable: true,
                minimal: true
            });
        }

        // disable if it actually somehow does receive a has_played event
        if (this.options.playerState) {
            this.listenTo(this.options.playerState, "change:has_played", function() {
                if (this.options.playerState.get("has_played")) {
                    model.set({
                        active: false
                    });
                }
            });
        }

        return new View({
            model: model
        });
    },

    onRootViewShow: function()  {

    }

});