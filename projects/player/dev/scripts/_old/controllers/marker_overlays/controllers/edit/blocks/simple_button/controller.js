var Controller = require('shared/controllers/controller'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    model_factory = require('../../../util/button_model_factory'),
    url_helpers = require('shared/util/url_helpers'),
    View = require('./view');


module.exports = Controller.extend({

    views: {
        ctaButton: {
            factory: function(c) {
                return new CTAButtonWidget({
                    model: model_factory.create(c.options.content)
                });
            },
            region: "button"
        },

        rootView: {
            events: {
                "selected_color": function(color) {
                    this.options.content.set({
                        color: color
                    });
                    this.trigger("changed");
                },
                "url_change": function(val) {
                    if (url_helpers.isValidURL(val)) {
                        this.options.content.set({
                            target_url: url_helpers.processURLInput(val)
                        });
                        this.trigger("changed");
                    } else {
                        this.rootView.setURLInvalid();
                    }
                },
                "title_change": function(val) {
                    this.options.content.set({
                        title: val
                    });
                    this.trigger("changed");
                }
            }
        }

    },

    buildRootView: function() {
        return new View({
            model: this.options.content,
            featureColor: true
        });
    },

    onRootViewShow: function() {
        if (!this.options.content.get("color")) {
            this.options.content.set({
                title: "",
                color: "green"
            });
        }
    },

});