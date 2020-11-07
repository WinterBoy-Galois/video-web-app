/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.add_team_member'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success'),
    failureToast: s('failure')
};

/*
 *  Running code
 */
function run(ctx, opts) {

	var team = opts.team;

	var createModal = s('confirm_modal');

	return ctx.modals.confirm(createModal, {
		inputs: [{
			type:'text',
			placeholder:'Email',
			name:'email'
		}]
	}).then(function(result){
		return team.members.addUserByEmail(result.email);
	});

}

module.exports = operations.wrap(run, config);