var $ = require('jquery'),
    config = require('../config'),
    Model = require('./_model');

/*
 *	Load Stripe dependency
 */
var getStripe = function() {
    var dfd = new $.Deferred();
    if (window.Stripe) {
        dfd.resolve(window.Stripe);
    } else {
        $.getScript(config.urls.stripeSDKURL).then(function() {
            window.Stripe.setPublishableKey(config.stripePublicKey);
            return dfd.resolve(window.Stripe);
        });
    }
    return dfd.promise();
};


/*
 * Create Creditcard Token
 */
var createToken = function(attrs) {
    return getStripe().then(function(Stripe) {
        var dfd = new $.Deferred();
        Stripe.card.createToken(attrs, function(status, response) {
            if (status === 200) {
                dfd.resolve(response.id);
            } else {
                return dfd.reject({
                    detail: response.error.message
                });
            }
        });
        return dfd;
    });
};


/*
 * Encapsulate saving of credit card in regular model
 */
var UserCreditCard = Model.extend({

    url: function() {
        return config.urls.creditCardURL;
    },

    save: function() {

        var _this = this;
        return createToken(this.attributes).then(function(token) {
            _this.set('token', token);
            _this.set('id', 'me'); // fool backbone to use put method
            return Model.prototype.save.call(_this);
        }).fail(function(result) {
            // make sure we always have an error message
            result = result ||  {};
            result.detail = result.detail ||  'Could not save credit card to server.';
        });

    },

    // convert server answer, should be refactored on server so this step is not needed
    parse: function(json) {
        json.number = '**** **** **** ' + json.last4;
        return json;
    }

});

module.exports = UserCreditCard;