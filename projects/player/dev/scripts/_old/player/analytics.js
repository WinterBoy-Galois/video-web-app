var config = require('config'),
    Radio = require('radio');


var video = null,
    state = null,
    service = null;

var builderChannel = Radio.channel(config.channels.builder),
    analyticsChannel = Radio.channel(config.channels.analytics);

var categories = {
    userActions: "user actions",
    playerActions: "player actions",
    initialization: "initialization",

    // builder events
    video: "video"
};

var events = {

    // user actions
    play: "play",
    pause: "pause",
    hideOverlay: "hide overlay",
    showOverlay: "show overlay",
    toggleFullscreen: "toggle fullscreen",
    toggleVolume: "toggle volume",
    share: "share",
    click: "click",
    clickCTA: "click cta",
    clickEndscreenCTA: "click endscreen cta",

    // player actions
    videoEnded: "video ended",

    // init
    playerLoading: "pathplayer loading",
    playerReady: "pathplayer ready",

    // builder actions
    addMarker: "add marker",
    deleteMarker: "delete marker",
    addContent: "add content",
    deleteContent: "delete content"

};

function trackEvent(cat, name, label) {
    if (state.get("mode") === state.modes.PLAYER) {
        service.trackEvent(cat, name, label);
    }
}

function setKey(key) {
    if (state.get("mode") === state.modes.PLAYER) {
        service.setVideoKey(key);
    }
}

function trackPlayback(second, duration) {
    if (state.get("mode") === state.modes.PLAYER) {
        service.trackPlaybackSecond(second, duration);
    }
}

function setupStateChanges() {

    state.on('change:state', function(state, newState) {

        if (newState == state.states.PLAYING) {
            trackEvent(categories.userActions, events.play);

        } else if (newState == state.states.PAUSED) {
            trackEvent(categories.userActions, events.pause);

        } else if (newState == state.states.ENDED) {
            trackEvent(categories.playerActions, events.videoEnded);

        } else if (newState == state.states.READY) {
            trackEvent(categories.initialization, events.playerReady);
        }
    });

    state.on('change:play_progress_seconds', function(state, seconds) {
        trackPlayback(seconds, state.get('duration'));
    });

    state.on('change:open_marker', function(state, markerId) {
        if (markerId < 0) {
            trackEvent(categories.userActions, events.hideOverlay);

        } else {
            var marker = video.markers.get(markerId);
            if (marker) {
                trackEvent(categories.userActions, events.showOverlay, marker.get('key'));
            }
        }
    });
}

function setupEvents() {

    // track engine events
    analyticsChannel.on("player_init", function() {
        trackEvent(categories.initialization, events.playerLoading);
    });

    // track overlay content events
    analyticsChannel.on("overlay_click_cta_button", function(key) {
        trackEvent(categories.userActions, events.clickCTA, key);
    });

    // endscreen events
    analyticsChannel.on("endscreen_click_cta_button", function() {
        trackEvent(categories.userActions, events.clickEndscreenCTA, "endscreen cta button");
    });

    // track share events
    analyticsChannel.on("controls_share", function(platform) {
        trackEvent(categories.userActions, events.share, "controls " + platform);
    });

    analyticsChannel.on("overlay_share", function(platform) {
        trackEvent(categories.userActions, events.share, "overlay " + platform);
    });

    analyticsChannel.on("endscreen_share", function(platform) {
        trackEvent(categories.userActions, events.share, "endscreen " + platform);
    });

}

// public setup
function setup(videoModel, stateModel, analyticsService) {

    state = stateModel;
    service = analyticsService;
    video = videoModel;
    setKey(video.get("key"));

    // insert custom code
    if (video.get("custom_tracking_code")) {
        service.setCustomGACode(video.get("custom_tracking_code"));
    }

    setupEvents();
    setupStateChanges();
}


module.exports = {
    setup: setup,
    channel: analyticsChannel
};
