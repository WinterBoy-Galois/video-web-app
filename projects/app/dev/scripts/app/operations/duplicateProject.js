/*
 *	Duplicate a video
 */
var s = require('strings')('ops.duplicate_project'),
    operations = require('./');

/*
 *	Setup config
 */
var config = {
    requiresFeature: 'advanced_library',
    featureName: s('feature_name'),
    featureDescription: s('feature_description'),

    successToast: s('success'),
    successTrackPage: 'library/duplicate_project'
};

function run(ctx, opts) {
console.log(opts);    
    var model = opts.team,
        title = model.attributes.name;
    return ctx.modals.confirm(s('confirm_modal', title))
        .then(function() {
        return model.duplicate();
    });
}

module.exports = operations.wrap(run, config);
