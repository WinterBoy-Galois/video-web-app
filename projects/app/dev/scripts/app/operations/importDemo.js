/*
 *	
 */
var s = require('strings')('ops.import_demo'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successTrackPage: 'library/import_demo',
    successToast: s('success')
};


/*
 * Actual code goes here
 */
function run(ctx,opts) {
	var team = opts.team;
	

    return team.videos.importDemo();
}

module.exports = operations.wrap(run, config);