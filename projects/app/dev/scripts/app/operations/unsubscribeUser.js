/*
 *	Unsubscribe user from their plan
 */
var s = require('strings')('ops.unsubscribe_user'),
    operations = require('./'),
    PlanModals = require('shared/configs/plans/modal_data');

var modal = s('confirm_modal');

var config = {
	successRoute:'settings/billing'
};

/*
 * Actual code goes here
 */
function run(ctx) {

    return ctx.modals.confirm(modal).then(function() {
        return ctx.sdk.currentUser.unsubscribe().then(function() {
            return ctx.modals.alert(s('success_modal'));
        }, function() {
            ctx.toasts.error(s('failure'), 'Error');
        });
    });
}

module.exports = operations.wrap(run, config);