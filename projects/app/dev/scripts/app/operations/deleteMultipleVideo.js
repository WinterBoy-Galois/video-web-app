/* 
 *  Delete a video	
 */
var s = require('strings')('ops.delete_multiplevideo'),
    operations = require('./');

var opts = {
    successToast: s('success'),
    successTrackPage: "library/delete_video"
};

function run(ctx, opts) {
    return ctx.modals.confirm(s('confirm_modal')).then(function() {
        opts.videos.forEach(function(video, index) {
            if (index == opts.length - 1) {
                return video.destroy({
                    wait: true
                });
            } else {
                video.destroy();                
            }
        });
    });
}

module.exports = operations.wrap(run, opts);
