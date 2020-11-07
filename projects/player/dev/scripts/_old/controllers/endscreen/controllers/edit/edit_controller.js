var _ = require('underscore'),
    Radio = require('radio'),
    config = require('config'),
    Controller = require('shared/controllers/controller'),
    View = require('./views/view'),
    ModelFactory = require('../util/model_factory'),
    ButtonEditController = require('./views/button_edit_controller'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    CTAButtonWidget = require('widgets/cta_button/view');


module.exports = Controller.extend({

    // Enables Color selection
    featureColor: false,

    views: {

        // share buttons on the bottom of the screen
        shareButtons: {
            factory: function() {
                return new ShareButtonsWidget({
                    disabled: true
                });
            },
            region: "shareButtons",
        },

        // call to action button
        ctaButton: {
            factory: function(c) {
                return new CTAButtonWidget({
                    model: ModelFactory.createCTA(c.options.video, c.options.playerState),
                    disabled: true
                });
            },
            region: "actionButton"
        },
    },

    buildRootView: function() {
        this.featureColor = true;

        var view = new View({
            model: ModelFactory.create(this.options.video, null, this.options.playerState),
            featureColor: this.featureColor
        });

        return view;
    },

    onRootViewShow: function() {
        this.setupEvents();
    },

    setupEvents: function() {
        this.listenTo(this.rootView, 'change_title', this.onTitleChange);
        this.listenTo(this.rootView, 'change_subtitle', this.onSubtitleChange);
        this.listenTo(this.rootView, 'change_background_color', this.onBackgroundColorChange);
        this.listenTo(this.rootView, 'change_cta', this.onCTAClick);
    },

    onTitleChange: function(value) {
        this.options.video.set('endscreen_title', value);
        this.options.video.save();
    },

    onSubtitleChange: function(value) {
        this.options.video.set('endscreen_subtitle', value);
        this.options.video.save();
    },

    onBackgroundColorChange: function(value) {
        if (this.featureColor) {
            this.options.video.set('endscreen_background_color', value);
            this.options.video.save();
        }
    },

    onCTAClick: function() {
        var controller = new ButtonEditController(_.extend({
            featureColor: this.featureColor
        }, this.options));
        var apiChannel = Radio.channel(config.channels.builder);
        try {
            window.parent.videopath_app.modals.showModalController(controller);
        } catch(_e) {}
    }
});