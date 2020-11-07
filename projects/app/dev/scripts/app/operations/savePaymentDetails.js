/*
 *	
 */
var s = require('strings')('ops.save_payment_details'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success'),
    failureToast: s('failure')
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    ctx.sdk.currentUser.address.set(opts);
    return ctx.sdk.currentUser.address.save();
}

module.exports = operations.wrap(run, config);