var Controller = require('shared/controllers/controller'),
    url_helpers = require('shared/util/url_helpers'),
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
            this.validateAndUpdateURL(val);
        }.bind(this));
    },

    validateAndUpdateURL: function(val) {

        if (!url_helpers.isValidURL(val)) {
            this.rootView.setURLInvalid();
            return;
        }

        // change val
        val = url_helpers.processURLInput(val);

        if (val === this.options.content.get("url")) {
            return;
        }

        this.rootView.clearFrame();

        // set val
        this.options.content.set({
            url: val
        });

        // notify save
        this.trigger("changed");
    },

});