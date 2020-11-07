/*
 *	
 */
var s = require('strings')('ops.reset_password'),
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
    return ctx.sdk.users.resetPassword(opts.email).fail(function() {
        ctx.toasts.error(s('failure'));
    });
}

module.exports = operations.wrap(run, config);