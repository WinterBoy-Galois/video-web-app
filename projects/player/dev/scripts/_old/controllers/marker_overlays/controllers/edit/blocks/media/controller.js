var Controller = require('shared/controllers/controller'),
    embed_helpers = require('_old/util/service_embed_helpers'),
    View = require('./view');


module.exports = Controller.extend({

    buildRootView: function() {
        return new View({
            model: this.options.content
        });
    },

    validateAndUpdateURL: function(val) {
        var result = embed_helpers.extractService(val);
        this.rootView.toggleInvalid(!result);
        if (!result) {
            return;
        }
        this.options.content.set({
            service: result.service,
            service_id: result.service_id,
            original_url: result.original_url
        });
        this.trigger("changed");
    },

    onRootViewShow: function() {
        this.setupSubmit();
    },

    setupSubmit: function() {
        this.listenTo(this.rootView, 'submit', function(val) {
            this.validateAndUpdateURL(val);
        }.bind(this));

        this.listenTo(this.rootView, 'autoplay', function(val) {
            this.options.content.set({
                autoplay:val
            });
            this.trigger('changed');
        }.bind(this));
    }
});