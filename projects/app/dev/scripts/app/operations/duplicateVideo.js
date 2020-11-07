/*
 *	Duplicate a video
 */
var s = require('strings')('ops.duplicate_video'),
    operations = require('./');

/*
 *	Setup config
 */
var config = {
    requiresFeature: 'advanced_library',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),

    successToast: s('success'),
    successTrackPage: 'library/duplicate_video'
};

function run(ctx, opts) {
    var model = opts.video,
        title = model.revision_info.get('title');
    return ctx.modals.confirm(s('confirm_modal', title))
        .then(function() {
        return model.duplicate();
    });
}

module.exports = operations.wrap(run, config);
