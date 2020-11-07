/* 
 *  Delete a video  
 */
var s = require('strings')('ops.leave_team'),
    operations = require('./');

var opts = {
    successToast: s('success'),
    successRoute: 'dashboard'
};

function run(ctx, opts) {

    var team = opts.team,
        user = ctx.sdk.currentUser;

    var confirmModal = s('confirm_modal', team.get('name'));

    return ctx.modals.confirm(confirmModal)
        .then(team.members.fetch.bind(team.members))
        .then(function(){
            var member = team.members.find(function(model){return model.get('email') == user.get('email');});
            if (member) return member.destroy();
            return ctx.reject();
        });
}

module.exports = operations.wrap(run, opts);