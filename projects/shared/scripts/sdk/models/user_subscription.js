var config = require('../config'),
    Model = require('./_singleton_model'),
    Plan = require('./plan');

var Subscription = Model.extend({
    initialize: function() {
        Model.prototype.initialize.call(this);
        this.plan = new Plan();
    },
    url: function() {
        return config.urls.subscriptionURL;
    },
    set: function(json) {
        if (json.plan) {
            this.plan.set(json.plan);
        }
        Model.prototype.set.apply(this, arguments);
    }
});

module.exports = Subscription;