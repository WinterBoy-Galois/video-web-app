/*
 *	
 */
var s = require('strings')('ops.change_password'),
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
    var old = opts.oldPassword,
        new1 = opts.newPassword,
        new2 = opts.newPasswordRepeat;

    if (new1 != new2) {
        ctx.toasts.error(s('failure_mismatch'));
        return ctx.reject();
    }

    return ctx.sdk.currentUser.changePassword(old, new1).fail(function(response) {
        ctx.toasts.error(response.detail);
        return response;
    });
}

module.exports = operations.wrap(run, config);