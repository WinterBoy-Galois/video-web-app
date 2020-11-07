var config = require('config'),
    Radio = require('radio'),
    Controller = require('shared/controllers/controller'),
    model_factory = require('../util/view_model_factory'),
    LayoutView = require('./views/layout'),
    WebsiteView = require('./views/blocks/website'),
    SocialView = require('./views/blocks/social'),
    BlocksView = require('./views/blocks'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    shareHelpers = require('shared/util/share_helpers');


module.exports = Controller.extend({

    views: {
        "rootView": {
            events: {
                "close_clicked": function() {
                    this.options.api.command("hide_marker_content");
                }
            }

        },
        shareButtons: {
            factory: function() {
                return new ShareButtonsWidget();
            },
            region: "share_buttons",
            events: {
                "share_clicked": function(platform) {
                    shareHelpers.shareAction(
                        config.shareBaseURL + this.options.video.get("key") + "/?m=" + this.options.marker.get("key"),
                        platform
                    );

                    Radio.channel(config.channels.analytics).trigger('overlay_share', platform);
                }
            }
        },
    },

    buildRootView: function() {

        // inject share here
        // should be in own
        return new LayoutView({
            model: model_factory.create(this.options.marker, this.options.playerState, this.options.video)
        });
    },

    onDestroy: function() {
        clearTimeout(this.showTimeout);
    },

    onRootViewShow: function() {

        // flag this view to let the parent know it requires
        // the large layout
        var contents = this.options.marker.contents;
        var requiresLargeContent = false,
            requiresNarrowContent = false;

        if (contents.findWhere({
                type: "website"
            })) {
            requiresLargeContent = true;
        }

        if (contents.findWhere({
                type: "social"
            })) {
            requiresNarrowContent = true;
        }

        this.options.overlayState.set({
            hasLargeContent: requiresLargeContent,
            hasNarrowContent: requiresNarrowContent,
            hasExclusiveContent: requiresLargeContent
        });

        // delay this slightly, so css animations will not be interrupted
        var _this = this;
        this.showTimeout = setTimeout(function() {

            if (!_this.rootView ||  !_this.rootView.content) {
                return;
            }

            // detect which type of content view
            // we want to show
            var view;

            // if there is only one content block with
            // website content, show the big website block
            var webContent = contents.findWhere({
                type: "website"
            });

            var socialContent = contents.findWhere({
                type: "social"
            });

            if (webContent) {
                view = new WebsiteView({
                    model: webContent
                });
            } else if (socialContent) {
                view = new SocialView({
                    model: socialContent
                });
            } else {
                // build the blocks view
                view = new BlocksView({
                    collection: _this.options.marker.contents
                });

                _this.listenTo(view, 'child:button_click', function(key) {
                    Radio.channel(config.channels.analytics).trigger('overlay_click_cta_button', key);
                });
            }
            _this.rootView.content.show(view);

        }, 100);


    },

});