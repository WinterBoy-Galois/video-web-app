/*
 *  
 */
var s = require('strings')('ops.add_integration'),
	_ = require('underscore'),
	operations = require('./');

/*
 *  Setup config
 */
var config = {
	planLevel: 'enterprise',
	requiresFeature: 'integrations',
	featureDescription: s('feature_description'),
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
	var ig = opts.integration;


	// if we have a regular oauth 2 flow
	if ( ig.get('oauth2_endpoint') ) {
		ctx.modals.confirm(s('oauth_modal', ig.get('title'))).then(function(){
			window.location.replace(ig.get('oauth2_endpoint'));
		});
		return ctx.reject();
	}

	// if we need credentials, get them via a modal
	if ( ig.get('credentials') ) {

		var inputs = _.map(ig.get('credentials'), function(item){
			return {
				type:'password',
				placeholder:item.name,
				name:item.id
			};
		});

		var modal = s('credentials_modal', ig.get('title'));

		return ctx.modals.confirm(modal, {inputs:inputs}).then(function(result){
    		result = ig.connectWithCredentials(result);
    	});
	}

	return ctx.reject();

}

module.exports = operations.wrap(run, config);