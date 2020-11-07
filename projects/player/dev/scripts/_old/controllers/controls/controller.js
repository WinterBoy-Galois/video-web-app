var config = require('config'),
    Radio = require('radio'),
    Backbone = require('backbone'),
    Controller = require('shared/controllers/controller'),
    viewModelFactory = require('./util/view_model_factory'),
    LayoutView = require('./views/layout'),
    LargeButtonsView = require('./views/large_buttons'),
    PlaybarView = require('./views/playbar'),
    SmallButtonsView = require('./views/small_buttons'),
    IndicatorsView = require('./views/indicators'),
    LoadingIndicatorWidget = require('widgets/loading_indicator/view'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    add_marker_modal_helper = require('../markers/util/add_marker_modal_helper'),
    ShareHelpers = require('shared/util/share_helpers');


module.exports = Controller.extend({

    views: {

        // small buttons, such as play, volume toggle etc,
        smallButtonsView: {
            factory: function(c) {
                return new SmallButtonsView({
                    model: c.viewModel
                });
            },
            events: {
                "fullscreen_clicked": function() {
                    this.options.api.command("toggle_fullscreen");
                },
                "volume_clicked": function() {
                    this.options.api.command("toggle_volume");
                },
                "play_clicked": function() {
                    this.options.api.command("toggle_play");
                },
                "add_marker_clicked": function() {
                    add_marker_modal_helper.confirmMarkerCreate(this.options);
                },
                "favicon_clicked": function() {

                }
            },
            region: "small_buttons",

            subViews: {
                "socialButtons": {
                    factory: function() {
                        return new ShareButtonsWidget();
                    },
                    events: {
                        "share_clicked": function(platform) {
                            ShareHelpers.shareAction(
                                config.shareBaseURL + this.options.video.get("key"),
                                platform
                            );

                            Radio.channel(config.channels.analytics).trigger('controls_share', platform);
                        }
                    },
                    region: "shareButtons"
                }
            }
        },


        // playbar view
        // containt playbar, sliders and indicators
        // also timecode
        playbarView: {

            factory: function(c) {
                return new PlaybarView({
                    model: c.viewModel
                });
            },
            events: {
                "progress_dragged": function(value) {
                    this.viewModel.set("play_progress_dragged", value);
                },
                "progress_drag_ended": function() {
                    this.viewModel.unset("play_progress_dragged");
                },
                "progress_selected": function(value) {
                    var _this = this;
                    this.options.playerState.once('change:play_progress_seconds', function() {
                        _this.viewModel.unset("play_progress_dragged");
                    });
                    this.options.api.command("play_progress", value);
                }
            },
            region: "playbar",

            subViews: {
                "indicators": {
                    factory: function(c) {
                        return new IndicatorsView({
                            collection: c.options.video.markers,
                            video: c.options.video
                        });
                    },
                    region: "indicatorsWrapper"
                }
            }
        },

        // large buttonsview includes play button and loading
        // indicator in center of screen
        largeButtonsView: {
            factory: function(c) {
                return new LargeButtonsView({
                    model: c.viewModel
                });
            },
            events: {
                "clicked": function() {
                    this.options.api.command("toggle_play");
                },
            },
            region: "large_buttons",

            subViews: {
                "loadIndicator": {
                    factory: function() {
                        return new LoadingIndicatorWidget({
                            model: new Backbone.Model({
                                dark: false
                            })
                        });
                    },
                    region: "loadIndicator"
                },
            }
        },

    },

    buildRootView: function() {
        this.viewModel = viewModelFactory.create(this.options.playerState, this.options.video);
        return new LayoutView({
            model: this.viewModel
        });
    },

    onRootViewShow: function() {
        // fade in complete thing after a short delay
        var _this = this;
        setTimeout(function() {
            _this.rootView.$el.find(".vp_inner").removeClass("vp_hidden");
        }, 1000);
    },
});