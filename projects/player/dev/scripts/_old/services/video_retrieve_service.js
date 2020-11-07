var config = require('config'),
    _ = require('underscore'),
    $ = require('jquery'),
    AES = require('cryptojs_aes'),
    SHA256 = require('cryptojs_sha256');


var videoMap = {
    "base": require('config/test_videos/cooking-base.json'),
    "cooking-videopath": require('config/test_videos/cooking-videopath.json'),
    "cooking-youtube": require('config/test_videos/cooking-youtube.json'),
    "cooking-vimeo": require('config/test_videos/cooking-vimeo.json'),
    "cooking-wistia": require('config/test_videos/cooking-wistia.json'),
    "cooking-dummy": require('config/test_videos/cooking-dummy.json'),
    "cooking-brightcove": require('config/test_videos/cooking-brightcove.json'),
    "cooking-custom": require('config/test_videos/cooking-custom.json'),
    "cooking-sprites": require('config/test_videos/cooking-sprites.json'),
    "other": require('config/test_videos/other.json'),
    "other-iphone": require('config/test_videos/other-iphone.json'),
    "cooking-encrypted": require('config/test_videos/cooking-encrypted.json'),
    "jpg1": require('config/test_videos/jpg1.json'), // quality 50, 17 mb
    "jpg2": require('config/test_videos/jpg2.json'), // quality 40, 16 mb
    "jpg3": require('config/test_videos/jpg3.json'), // quality 30, 13.5 mb

};

var VideoRevision = require('sdk/models/video_revision');

var passwordView;

function decrypt(data, dfd) {

    passwordView.getPassword().then(function(pw) {
        try {
            // decrypt
            var salted_pw = pw + data.salt;
            var key = SHA256(salted_pw, {
                asBytes: true
            });
            var plain = AES.decrypt(data.data, key);

            // remove zero padding
            while (plain.charCodeAt(plain.length - 1) === 0) {
                plain = plain.substring(0, plain.length - 1);
            }


            var vdata = JSON.parse(plain);
            dfd.resolve(new VideoRevision(vdata));

        } catch (_) {
            setTimeout(function() {
                decrypt(data, dfd);
            }, 10);
        }

    });
}

function importVideo(data, dfd) {

    // decrypt encrypted video
    if (data.encrypted) {
        data = decrypt(data, dfd);
        return;
    }
    var rv = new VideoRevision(data);
    dfd.resolve(rv);
}

function retrieve(_passwordView) {

    passwordView = _passwordView;

    // prepare promise
    var dfd = new $.Deferred();
    var promise = dfd.promise();


    // extract video id from url
    var elems = window.location.pathname.split('/');
    var videoname = _.last(elems);
    if (config.queryParams.v) {
        videoname = config.queryParams.v;
    }

    // try to get video from data
    if (document.videopath.player.conf.video) {
        importVideo(document.videopath.player.conf.video, dfd);
    }

    // try to load from stock videos
    else if (videoMap[videoname]) {
        var data = _.extend(videoMap.base, videoMap[videoname]);
        importVideo(data, dfd);
    } else if (config.buildMode) {
        if (window.parent.videopath_app.currentVideo) {
            dfd.resolve(window.parent.videopath_app.currentVideo);
        } else {
            dfd.reject();
        }
    }

    //builder or preview mode
    else if (config.previewMode) {


        // inject auth token
        // this part will need some refactoring in the future
        $.ajaxSetup({
            headers: {
                "Authorization": "Token " + config.token
            }
        });

        var url;
        if (config.videoID) {
            url = config.revisionURL.replace("{key}", config.videoID);
        } else {
            url = config.revisionURL2.replace("{key}", config.revisionID);
        }

        // get current version of video
        $.ajax({
            url: url,
            success: function(result) {
                importVideo(result, dfd);
            },
            error: function() {
                dfd.reject("Video access denied.");
            }
        });
    }

    return promise;
}

module.exports = {
    retrieve: retrieve,
};