/*
 *	
 */
var operations = require('./'),
    React = require('react'),
    Modal = require('modals/video');

/*
 *	Setup config
 */

var config = {
    successTrackPage: 'navbar/tutorial'
};


/*
 * Actual code goes here
 */
function run(ctx) {
    return ctx.modals.showModal(<Modal videoKey='orJG3pf351o'/>);
}

module.exports = operations.wrap(run, config);