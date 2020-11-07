var config = require('config'),
    Radio = require('radio'),
    Controller = require('shared/controllers/controller'),
    model_factory = require('../util/model_factory'),
    View = require('./views/view'),
    ViewCustom = require('./views/view_custom'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    shareHelpers = require('shared/util/share_helpers');


module.exports = Controller.extend({

    views: {

        // share buttons on the bottom of the screen
        shareButtons: {
            factory: function(c) {
                return new ShareButtonsWidget({
                    disabled: c.getOption('disabled')
                });
            },
            region: "shareButtons",
            events: {
                "share_clicked": function(platform) {
                    shareHelpers.shareAction(
                        config.shareBaseURL + this.options.video.get("key"),
                        platform
                    );

                    Radio.channel(config.channels.analytics).trigger('endscreen_share', platform);
                }
            }
        },

        // call to action button
        ctaButton: {
            factory: function(c) {
                return new CTAButtonWidget({
                    model: model_factory.createCTA(c.options.video, c.options.playerState),
                    //disabled: true
                });
            },
            region: "actionButton",
            events: {
                "click": function() {
                    Radio.channel(config.channels.analytics).trigger('endscreen_click_cta_button');
                }
            }
        }

    },

    buildRootView: function() {

        var model = model_factory.create(this.options.video, this.options.editState, this.options.playerState);

        // if there is an endscreen url, display that webpage
        // instead of the default endscreen
        var endscreen_url = this.options.video.get("endscreen_url");
        if (endscreen_url) {
            // remove views
            this.views = {};

            var view = new ViewCustom({
                model: model
            });
            this.listenTo(view, "rewatch", function() {
                this.options.api.command("replay");
            });
            return view;
        }


        return new View({
            model: model
        });
    },

    onRootViewShow: function() {

    },

});