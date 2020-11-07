/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.rename_team'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success'),
};

/*
 *  Running code
 */
function run(ctx, opts) {

	var team = opts.team, 
		createModal = s('confirm_modal');

	return ctx.modals.confirm(createModal, {
		inputs: [{
			type:'text',
			placeholder:team.get('name'),
			name:'name'
		}]
	}).then(function(result){
		var name = result.name;
		team.set({
			name:name
		});
		return team.save();
	});

}

module.exports = operations.wrap(run, config);