/*
 *	
 */
var s = require('strings')('ops.edit_video'),
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
    config.successRoute = 'video/' + opts.video.get('id') + '/edit';
    if (!opts.video.hasValidFileOrSource()) {
        return ctx.reject();
    }
    return ctx.resolve();
}

module.exports = operations.wrap(run, config);
