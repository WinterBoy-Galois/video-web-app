/*
 *  
 */
var operations = require('./'),
	vtmHelper = require('app/util/vtmHelper');

/*
 *  Setup config
 */

var config = {
};

/*
 * Actual code goes here
 */
function run(ctx, opts, config) {
    return ctx.sdk.teams.create({
			name:opts.name,
			description:opts.description,
			cover:opts.cover,
			tags: opts.tags
	}, {wait: true});
}

module.exports = operations.wrap(run, config);
