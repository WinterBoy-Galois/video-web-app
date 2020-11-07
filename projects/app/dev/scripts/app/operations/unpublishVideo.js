/*
 *	Unpublish a video
 */
var s = require('strings')('ops.unpublish_video'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successTrackPage: 'editor/unpublish',
    successToast: s('success')
};

var modal = s('confirm_modal');

/*
 * Execution
 */
function run(ctx, opts) {
    var video = opts.video;
    return ctx.modals.confirm(modal).then(function() {
        ctx.toasts.info(s('progress'));
        return video.unpublish();
    });
}

module.exports = operations.wrap(run, config);