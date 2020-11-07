var config = require('config'),
    Radio = require('radio');


var video = null,
    player = null,

    apiChannel = Radio.channel(config.channels.builder);


// ===== Marker Actions =====

function addMarker(time) {

    if (!time) {
        time = player.state.get("play_progress") * video.get("duration");
    }

    window.parent.videopath_app.operations.addMarkerOp({
        video: video,
        time: time
    }).then(function(m) {
        player.showMarkerContent(m.get('id'));

    });

}

function deleteMarker(marker) {
    window.parent.videopath_app.operations.deleteMarkerOp({
        marker: marker
    });
    player.hideMarkerContent();
}

function addMarkerContent(marker, type, position, done) {
    return window.parent.videopath_app.operations.addMarkerContentOp({
        marker: marker,
        type: type,
        position: position
    }).then(function(content) {
        if (done) done(content);
    });

}

function deleteMarkerContent(c, done) {
    return window.parent.videopath_app.operations.deleteMarkerContentOp({
        content: c,
    }).then(function() {
        if (done) done();
    });
}


// ===== Setup =====

function setup(videoModel, playerApi) {
    video = videoModel;
    player = playerApi;
}


module.exports = {
    setup: setup,

    addMarker: addMarker,
    deleteMarker: deleteMarker,
    addMarkerContent: addMarkerContent,
    deleteMarkerContent: deleteMarkerContent,
};