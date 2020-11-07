var config = require('../config'),
    ajax = require('../util/ajax'),
    Model = require('./_singleton_model'),
    Address = require('./user_address'),
    CreditCard = require('./user_creditcard'),
    Subscription = require('./user_subscription'),
    Plan = require('./plan');


/*
 *  Main User Model
 */
var User = Model.extend({

    defaults: {
        id: false,
        mail: '',
        username: 'anonymous',
        loggedIn: false,
        profile: {}
    },

    reset: function() {
        Model.prototype.reset.call(this);
        this.plan.reset();
        this.address.reset();
        this.creditCard.reset();
        this.subscription.reset();
    },

    initialize: function() {
        Model.prototype.initialize.call(this);
        this.plan = new Plan();
        this.address = new Address();
        this.creditCard = new CreditCard();
        this.subscription = new Subscription();
    },

    url: function() {
        return config.urls.userURL;
    },

    set: function(json, arg1, arg2) {
        if (json.plan) {
            this.plan.set(json.plan);
            json.plan = false;
        }
        Model.prototype.set.call(this, json, arg1, arg2);
    },

    /*
     * Manage sensitive changes
     */
    changeEmail: function(email, password) {
        var model = this;
        return ajax.put({
            url: this.url(),
            data: {
                password: password,
                email: email
            }
        }).then(function() {
            model.set('email', email);
        });
    },

    changePassword: function(password_old, password_new) {
        return ajax.put({
            url: this.url(),
            data: {
                password: password_old,
                new_password: password_new
            }
        });
    },

    setAvatar: function(avatar) {
        var model = this;
        var profile = model.get('profile');
        profile.avatar = avatar; 
        model.set('profile', profile); 
        model.trigger('change');
    },

    /*
     *  Manage Subscription
     */
    subscribe: function(planID) {
        this.subscription.set('plan_id', planID);
        return this.subscription.save();
    },

    unsubscribe: function() {
        var _this = this;
        return this.subscription.destroy().then(function() {
            return _this.subscription.fetch();
        });

    },

    /*
     * Helpers
     */
    isLoggedIn: function()  {
        return !!(this.attributes.id === 0 || this.attributes.id);
    },

    isOnFreePlan: function() {
        return this.plan.isFreePlan();
    },

    isOnIndividualPlan: function() {
        return this.plan.isIndividualPlan();
    },

    canUseFeature: function(feature) {
        return this.plan.isFeatureEnabled(feature);
    },

    uppercaseName: function() {
        return this.attributes.username.replace(/^./, function(char) {
            return char.toUpperCase();
        });
    }

});

module.exports = User;
