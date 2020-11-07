/*
 *	Delete a Marker from a video
 */
var s = require('strings')('ops.delete_marker'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success'),
    successTrackPage: "builder/delete_marker"
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var marker = opts.marker,
        title = marker.get('title') ||  '-untitled marker-';
    return ctx.modals.confirm(s('confirm_modal', title)).then(function() {
        return marker.destroy({
            wait: true
        }).fail(function() {
            ctx.toasts.error(s('failure'));
        });
    });
}

module.exports = operations.wrap(run, config);