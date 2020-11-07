/*
 *	
 */
var s = require('strings')('ops.login'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    failureToast: s('failure')
};


/*
 * Actual code goes here
 */
function run(ctx, opts, config) {
    return ctx.sdk.users.login_password(opts.username, opts.password).fail(function(result){
    	if (result.status === 503) {
    		config.failureRoute = 'maintenance';
    		config.failureToast = '';
    	}
    });
}

module.exports = operations.wrap(run, config);