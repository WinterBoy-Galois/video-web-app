/*
 *  
 */
var operations = require('./'),
	s = require('strings')('ops.remove_integration');

/*
 *  Setup config
 */
var config = {
};



/*
 * Actual code goes here
 */
function run(ctx, opts) {

	var ig = opts.integration;

	var confirmModal = s('confirm_modal', ig.get('title'));

	return ctx.modals.confirm(confirmModal).then(function(){
		return ig.remove();
	});

}

module.exports = operations.wrap(run, config);