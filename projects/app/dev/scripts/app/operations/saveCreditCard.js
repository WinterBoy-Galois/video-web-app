/*
 *	
 */
var s = require('strings')('ops.save_credit_card'),
    operations = require('./');

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
    ctx.sdk.currentUser.creditCard.set(opts);
    return ctx.sdk.currentUser.creditCard.save().fail(function(result) {
        if (result.detail) {
            ctx.toasts.error(result.detail);
        }
    });
}

module.exports = operations.wrap(run, config);