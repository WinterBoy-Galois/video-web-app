/*
 *	
 */
var s = require('strings')('ops.upload_file'),
    _ = require('underscore'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {

    requiresFeature: 'upload',

    //tracking
    startTrackPage: 'library/upload_start',
    successTrackPage: 'library/upload_complete',
    failureTrackPage: 'library/upload_failed'
};

/*
 *	Helpers
 */
function isFilenameValid(file) {
    var ext = file.name.split('.').pop();
    var disabled = ["mp3", "png", "jpg", "pdf", "txt", "doc", "zip", "tiff"];
    return _.indexOf(disabled, ext) == -1;
}

/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var file = opts.file,
        video = opts.video,
        team = opts.team;

    // check valid filename
    if (!isFilenameValid(file)) {
        ctx.modals.alert(s('file_failure_modal'));
        return ctx.reject();
    }

    // get request object
    var request;
    if (!video) {
        request = team.videos.createWithFile(file);
    } else {
        request = video.uploadVideoFile(file);
    }

    // in this case make complete / fail as modals
    request.then(function() {
        ctx.modals.alert(s('complete_modal'));
    }, function(result) {
        ctx.modals.alert(s('upload_failure_modal', result.detail));
    });

    return request;
}

module.exports = operations.wrap(run, config);