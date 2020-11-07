var Marionette = require('marionette'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    model_factory = require('../../../util/button_model_factory');

require('stickit');


module.exports = Marionette.ItemView.extend({

    template: false,
    className: "vp_content_block vp_content_block_simple_button",

    onRender: function() {
        this.ctaButton = new CTAButtonWidget({
            model: model_factory.create(this.model)
        });
        this.$el.append(this.ctaButton.render().el);
        this.listenTo(this.ctaButton, "click", function() {
            // send message to channel
            this.trigger("button_click", this.model.get("key"));
        });
    },

    onDestroy: function() {
        this.ctaButton.destroy();
    },

    behaviors: {
        SelfTest: {}
    }
});