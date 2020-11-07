/*
 *	
 */
var operations = require('./'),
 	React = require('react'),
    // StartVideoModal = require('modals/start_video'),
    Modal = require('modals/create_video');


/*
 *	Setup config
 */

var config = {

    successTrackPage: "library/create"
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
	return ctx.modals.showModal(<Modal user={ctx.sdk.currentUser} team={opts.team}/>);
}

module.exports = operations.wrap(run, config);
