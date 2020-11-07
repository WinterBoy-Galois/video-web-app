/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.create_team'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    requiresFeature: 'teams',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),
    planLevel: 'individual',
    successToast: s('success'),
};

/*
 *  Running code
 */
function run(ctx, opts) {

	var createModal = s('confirm_modal');

	return ctx.modals.confirm(createModal, {
		inputs: [{
			type:'text',
			placeholder:'Project name',
			name:'name'
		},
        ]
	}).then(function(result){
		var name = result.name;
		return ctx.sdk.teams.create({
			name:name
		}, {wait: true});

	});

}

module.exports = operations.wrap(run, config);
