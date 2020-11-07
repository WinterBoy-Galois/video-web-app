/*
 *	
 */
var s = require('strings')('ops.change_email'),
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
    var password = opts.password,
        email = opts.email;
    return ctx.sdk.currentUser.changeEmail(email, password).fail(function(result) {
        if (result.detail)
            ctx.toasts.error(result.detail);
        return result;
    });

}

module.exports = operations.wrap(run, config);