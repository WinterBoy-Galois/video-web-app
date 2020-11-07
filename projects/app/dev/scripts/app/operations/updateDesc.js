/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.update_desc'),
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
			type:'textarea',
			placeholder:team.get('description'),
			name:'description'
		}]
	}).then(function(result){
		var name = result.description;
		team.set({
			description:description
		});
		return team.save();
	});

}

module.exports = operations.wrap(run, config);
