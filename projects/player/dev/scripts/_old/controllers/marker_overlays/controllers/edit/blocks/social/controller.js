var Controller = require('shared/controllers/controller'),
    social_embed_helper = require('_old/util/social_embed_helper'),
    View = require('./view');


module.exports = Controller.extend({

    buildRootView: function() {
        return new View({
            model: this.options.content
        });
    },

    onRootViewShow: function() {
        this.setupSubmit();
    },

    setupSubmit: function() {
        this.listenTo(this.rootView, 'submit', function(val) {
            // update stuff
            var result = social_embed_helper.detect(val);
            if (result) {
                this.options.content.set({
                    service_id: result.service_id,
                    service: result.service,
                    original_url: val
                });
            } else {
                this.options.content.set({
                    service_id: "",
                    service: "",
                    original_url: val
                });
                if (val) {
                    this.rootView.showMessage("This does not seem to be a valid social URL");
                }
            }

            this.trigger("changed");


        }.bind(this));
    },

});