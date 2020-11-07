/* 
 *  Delete a video	
 */
var s = require('strings')('ops.delete_video'),
    operations = require('./');

var opts = {
    successToast: s('success'),
    successTrackPage: "library/delete_video"
};

function run(ctx, opts) {
    var model = opts.video,
        title = model.revision_info.get("title");
    return ctx.modals.confirm(s('confirm_modal', title)).then(function() {
        return model.destroy({
            wait: true
        });
    });
}

module.exports = operations.wrap(run, opts);
