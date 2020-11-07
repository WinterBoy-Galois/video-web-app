/*
 *	
 */
var operations = require('./');


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    ctx.route(opts.route);
    return ctx.resolve();
}

module.exports = operations.wrap(run);