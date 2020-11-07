var View = require('./button_edit_view'),
    Controller = require('shared/controllers/controller'),
    ModelFactory = require('../../util/model_factory'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    URLHelpers = require('shared/util/url_helpers');


module.exports = Controller.extend({

    views: {
        rootView: {
            events: {
                'change_label': function(val) {
                    this.options.video.set('endscreen_button_title', val);
                    this.options.video.save();
                },
                'change_action': function(val) {
                    if (URLHelpers.isValidURL(val)) {
                        this.options.video.set('endscreen_button_target',
                            URLHelpers.processURLInput(val));
                        this.options.video.save();
                    } else {
                        this.rootView.setURLInvalid();
                    }
                },
                'change_color': function(val) {
                    this.options.video.set('endscreen_button_color', val);
                    this.options.video.save();
                }
            }
        },
        ctaButton: {
            factory: function(c) {
                return new CTAButtonWidget({
                    model: c.rootView.model
                });
            },
            region: 'ctaPreviewRegion'
        }
    },

    buildRootView: function() {
        var view = new View({
            model: ModelFactory.createCTA(this.options.video, this.options.playerState),
            featureColor: this.options.featureColor
        });
        return view;
    },

    onRootViewShow: function() {
        if (this.local$ && this.rootView.initializeLocal) {
            this.rootView.initializeLocal(this.local$);
        }
    },

    //the cusom modal options
    modalOptions: {
        title: "Add a CTA Button",
        closeDisabled: true,
        size: {
            width: 520
        },
        buttons: [{
            title: "done",
            className: 'vp_action_button',
            onClick: function() {
                this.rootView.saveButton();
                this.trigger('close_modal');
            }
        }, {
            title: "remove",
            className: 'vp_destructive_button',
            onClick: function() {
                this.removeCTA();
            }
        }],
    },

    removeCTA: function() {
        this.options.video.set('endscreen_button_title', "");
        this.options.video.save();
        this.trigger('close_modal');
    }
});