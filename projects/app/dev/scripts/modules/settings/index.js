var analytics = require('analytics'),
    BaseModule = require('../module'),
    React = require('react'),

    sdk = require('sdk'),

    // components
    AccountComponent = require('./components/account'),
    BillingComponent = require('./components/billing'),
    CardComponent = require('./components/card'),
    AddressComponent = require('./components/address'),
    PlansComponent = require('./components/plans'),
    PlansChangeComponent = require('./components/plans_change');

module.exports = BaseModule.extend({

    appRoutes: {
        "settings/account": function(){
            var _this = this;
            var pid = sdk.currentUser.get('profile').ref;
            sdk.profiles.fetchById(pid).then(function(profile) {
                _this.setComponent(AccountComponent, {
                    profile:profile,
                    user:sdk.currentUser
                });
            });
        },

        "settings/billing": function(){
            this.setComponent(BillingComponent, {
                user:sdk.currentUser,
                subscription:sdk.currentUser.subscription,
                card: sdk.currentUser.creditCard,
                invoices: sdk.invoices,
                address:sdk.currentUser.address
            });
        },

        "settings/card": function(){
            this.setComponent(CardComponent, {
                card: sdk.currentUser.creditCard
            });
        },

         "settings/address": function(){
            this.setComponent(AddressComponent, {
                address:sdk.currentUser.address
            });
        },

        "settings/plans": function(){
            this.setComponent(PlansComponent, {
                subscription:sdk.currentUser.subscription,
                plans:sdk.plans
            });
        },

        "settings/plans/change/:plan": function(plan) {
            sdk.plans.reset();
            this.setComponent(PlansChangeComponent, {
                planGroup:plan,
                plans:sdk.plans,
                address:sdk.currentUser.address,
            });
        }
    },

});
