/*
 *	Create a new video from a revision
 */
var s = require('strings')('ops.create_video_from_revision'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    requiresFeature: 'advanced_library',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),
    successToast: s('success')
};

/*
 *  Running code
 */
function run(ctx, opts) {
    var model = opts.revision;
    return ctx.modals.confirm(s('confirm_modal', model.get('title'))).then(function() {
        return ctx.sdk.videos.createFromRevisionID(model.get('id'));
    });
}

module.exports = operations.wrap(run, config);