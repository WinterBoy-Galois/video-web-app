/*
 *  Revert a video to a former revision
 */

var s = require('strings')('ops.revert_video_revision'),
    operations = require('./'),
    utils = require('mixins/utils').utils;

var config = {
    requiresFeature: 'advanced_library',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),
    successToast: s('success')
};

function run(ctx, opts) {
    var video = opts.video,
        revision = opts.revision;

    return ctx.modals.confirm(s('confirm_modal', revision.get("title"), utils.timeago(new Date(revision.get('created')))))
        .then(function() {
        return video.revertToRevisionID(revision.get('id'));
    });

}


module.exports = operations.wrap(run, config);
