/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.remove_team_member'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
};

/*
 *  Running code
 */
function run(ctx, opts) {

	var teamMember = opts.teamMember,
		team = opts.team;

	var confirmModal = s('confirm_modal', teamMember.get('email'), team.get('name'));

	return ctx.modals.confirm(confirmModal)
		.then(function(result){
			return teamMember.destroy();
		});

}

module.exports = operations.wrap(run, config);