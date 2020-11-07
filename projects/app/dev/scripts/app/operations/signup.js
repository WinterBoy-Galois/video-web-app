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
	var campaignParams = vtmHelper.getCampaignParams();
    return ctx.sdk.users.signup(opts.email, opts.email, opts.password, opts.password_confirm, opts.first_name, opts.last_name, opts.birthdate, opts.gender, opts.occupation, opts.industry, opts.industry_other, opts.phone, opts.newsletter, campaignParams).fail(function(result){
    	if (result.status === 503) {
    		config.failureRoute = 'maintenance';
    		config.failureToast = '';
    	}
    });;
}

module.exports = operations.wrap(run, config);
