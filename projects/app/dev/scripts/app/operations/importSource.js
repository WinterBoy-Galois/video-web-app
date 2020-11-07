/*
 *	
 */
var s = require('strings')('ops.import_source'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successTrackPage: 'library/import_complete'
};

var completeCreate =s('create_complete_modal'),
    completeReplace = s('replace_complete_modal');

/*
 * Actual code goes here
 */
function run(ctx, opts, cfg) {
    var url = opts.url,
        video = opts.video,
        team = opts.team;

    var request;
    if (video) {
        request = video.importMedia(url);
    } else {
        request = team.videos.createWithMediaURL(url);
    }

    return request.then(function(v) {
        if (!video) {
            cfg.successRoute = 'video/' + v.get('id') + '/edit';
        }
        return ctx.modals.alert(video ? completeReplace : completeCreate);
    }, function(result) {
        ctx.modals.alert(s('failure_modal', result.detail));
    });
}

module.exports = operations.wrap(run, config);
