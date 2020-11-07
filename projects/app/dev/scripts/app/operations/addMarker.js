/*
 *	
 */
var s = require('strings')('ops.add_marker'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success'),
    successTrackPage: "builder/add_marker",
};

/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var video = opts.video,
        time = opts.time,
        markerCount = video.markers.length;

    function createMarker(video, time) {
        return video.markers.create({
            time: time
        });
    }

    if (markerCount >= 999) {
        ctx.modals.confirm(s('limit_modal')).then(function() {});
        return ctx.reject();
    } else if (markerCount >= 7) {
        return ctx.modals.confirm(s('warn_modal')).then(function() {
            return createMarker(video, time);
        });
    } else {
        return createMarker(video, time);
    }
    
}

module.exports = operations.wrap(run, config);