/*
 *	
 */
var operations = require('./');

/*
 * Actual code goes here
 */
function run(ctx) {
    return ctx.resolve();
}

module.exports = operations.wrap(run);