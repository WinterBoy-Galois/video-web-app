/*
 *	Share video via email
 */
var s = require('strings')('ops.share_email'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success')
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var video = opts.video,
        message = opts.message,
        recipients = opts.recipients;

    return video.sendShareEmail(recipients, message).then(false,
        function(result) {
            if (result.status === 400) {
                ctx.toasts.warning(s('failure'));
            }
            return result;
        });

}

module.exports = operations.wrap(run, config);