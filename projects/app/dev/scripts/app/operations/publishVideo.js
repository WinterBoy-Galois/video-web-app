/*
 *	Publish a video
 */
var s = require('strings')('ops.publish_video'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successTrackPage: 'editor/publish',
    successToast: s('success')
};

var publishModal = s('confirm_publish_modal'),
    updateModal =  s('confirm_update_modal');
/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var video = opts.video;

    return ctx.modals.confirm(video.isPublished() ? updateModal : publishModal).then(function() {
        ctx.toasts.info(s('progress'));
        return video.publish();
    });
}

module.exports = operations.wrap(run, config);