var config = require('../config'),
    Model = require('./_model');

var currencySymbols = {
    'EUR': '€',
    'USD': '$',
    'GBP': '£'
};

/*
 *  Plans
 */
var Plan = Model.extend({

    defaults: {
        group: config.c.plans.freeGroup
    },

    isIndividualPlan: function() {
        return this.attributes.group === config.c.plans.individualGroup;
    },

    isFreePlan: function() {
        return this.attributes.group === config.c.plans.freeGroup;
    },

    isFeatureEnabled: function(feature) {
        var key = "feature_" + feature;
        return this.attributes[key];
    },

    priceFormatted: function() {
        var price = (this.get('price') / 100).toString();
        if (price.length > 3 ) {
            price = price.slice(0,-3) + "." + price.slice(-3);
        }
        var currency = currencySymbols[this.get('currency')];
        return currency + ' ' + price + ' / ' + this.get('payment_interval');
    }

});

module.exports = Plan;