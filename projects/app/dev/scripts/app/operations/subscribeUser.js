/*
 *	
 */
var s = require('strings')('ops.subscribe_user'),
    operations = require('./'),
    savePaymentDetailsOp = require('app/operations/savePaymentDetails'),
    saveCreditCardOp = require('app/operations/saveCreditCard');


/*
 *	Setup config
 */
var config = {
    successRoute:'dashboard'
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    return savePaymentDetailsOp(opts.paymentDetails, {
        successToast: false
    }).then(function() {
        return saveCreditCardOp(opts.creditCard, {
            successToast: false
        });
    }).then(function() {
        return ctx.sdk.currentUser.subscribe(opts.plan);
    }).then(function() {
        return ctx.modals.alert(s('success_modal'));
    });
}

module.exports = operations.wrap(run, config);