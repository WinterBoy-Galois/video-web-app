/*
 *	Preview a video in an overlay
 */
var
    s = require('strings')('ops.preview_video'),
    $ = require('jquery'),
    operations = require('./'),
    config = require('config');


function showVideo(opts) {
    var url;
    if (opts.revision_id) {
        url = config.previewURL + "?revisionID=" + opts.revision_id;
    } else if (opts.video) {
        var baseURL = config.previewURL;
        url = baseURL + "?preview=true&videoID=" + opts.video.get('id');
    }
    window.videopath_lightbox.showVideo({
        "id": "builder_preview",
        "retain_aspect": 1.77,
        "custom_url": url
    });

}

function run(ctx, opts) {
    ctx.toasts.info(s('progress'));

    if (window.videopath_lightbox && window.videopath_lightbox.showVideo) {
        showVideo(opts);
    } else {
        $.getScript(config.embedURL).then(function() {
            showVideo(opts);
        });
    }

    return ctx.resolve();
}

module.exports = operations.wrap(run);