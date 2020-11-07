/*
 *	
 */
var s = require('strings')('ops.show_change_source'),
    operations = require('./'),
    React = require('react'),
    Modal = require('modals/create_video');


/*
 *	Setup config
 */

var config = {
    requiresFeature: 'advanced_library',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),
    successTrackPage: "library/change_source"
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    return ctx.modals.showModal(<Modal video = {opts.video} team={opts.team}/>);
}

module.exports = operations.wrap(run, config);
