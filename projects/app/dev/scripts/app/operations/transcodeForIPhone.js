/*
 *  
 */
var s = require('strings')('ops.iphone_transcode'),
    operations = require('./');

/*
 *  Setup config
 */

var config = {
    successTrackPage: 'builder/transcode_iphone',
    successToast: s('success'),
    failureToast: s('failure')
};


var modalConfirm = s('confirm_modal');

/*
 * Actual code goes here
 */
function run(ctx, opts, config) {
    var revision = opts.revision;
    return ctx.modals.confirm(modalConfirm).then(function() {
        return revision.transcodeJPGSequence().fail(function(result) {
            if (result.detail) {
                config.failureToast = result.detail;
            }
        });
    });
}

module.exports = operations.wrap(run, config);
