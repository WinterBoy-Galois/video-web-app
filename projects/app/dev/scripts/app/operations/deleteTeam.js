/* 
 *  Delete a video	
 */
var s = require('strings')('ops.delete_team'),
    operations = require('./');

var opts = {
    successToast: s('success'),
    successRoute: 'dashboard'
};

function run(ctx, opts) {
    var team = opts.team;

    if (team.get('stats').number_of_videos > 0 ) {
    	var modal = s('has_videos_modal', team.get('name'));
    	ctx.modals.alert(modal);
    	return ctx.reject();
    }

    var confirmModal = s('confirm_modal', team.get('name'));

    return ctx.modals.confirm(confirmModal).then(function() {
        return team.destroy({
            wait: true
        });
    });
}

module.exports = operations.wrap(run, opts);