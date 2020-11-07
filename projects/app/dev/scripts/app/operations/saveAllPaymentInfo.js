/*
 *	
 */
var s = require('strings')('ops.save_all_payment_info'),
    operations = require('./'),
    savePaymentDetailsOp = require('app/operations/savePaymentDetails'),
    saveCreditCardOp = require('app/operations/saveCreditCard');


/*
 *	Setup config
 */

var config = {
    successToast: s('success')
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
    });
}

module.exports = operations.wrap(run, config);