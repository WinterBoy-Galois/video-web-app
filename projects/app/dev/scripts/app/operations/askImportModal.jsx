/*
 *	
 */
var operations = require('./'),
    
React = require('react'),
Modal = require('modals/ask_import');

/*
 * Actual code goes here
 */
function run(ctx, opts) {
    return ctx.modals.showModal(<Modal onFail = {opts.onFail} team = {opts.team} project_id = {opts.project_id} />  ); 
}

module.exports = operations.wrap(run);
