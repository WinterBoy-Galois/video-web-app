var config = require('config'),
    Radio = require('radio'),
    $ = require('jquery'),
    _ = require('underscore');


var engineChannel = Radio.channel(config.channels.engine),
    state = null,
    video = null;


// ===== Player actions =====

// React to play progress:
// Set play and bufferprogress from engine
// Set correct marker and overlay points
var updatePlayProgress = _.throttle(function(progress) {

    var duration = state.get("duration"),
        secondsDec = progress * duration,
        seconds = Math.floor(progress * duration),
        currentOverlay = video.markers.nextBeforeTime(secondsDec),
        currentMarker = video.markers.nearestToTime(secondsDec, 3);

    state.set({
        play_progress: progress,
        play_progress_seconds: seconds,
        current_marker: currentMarker,
        current_overlay: currentOverlay && currentOverlay.get('id')
    });

    // display the endscreen about a second before the video ends
    // this is to prevent youtube endscreens from flashing
    var secondsToGo = duration - progress * duration;
    if (secondsToGo < 1 &&
        (state.get("mode") === state.modes.PLAYER ||
            state.get("mode") === state.modes.PREVIEW)) {
        state.set({
            endscreen_showing: true
        });
    }

}, 300);

var updateBufferProgress = _.throttle(function(progress) {
    state.set({
        buffer_progress: progress
    });
}, 300);

function getProgress(seconds) {
    return seconds / state.get('duration');
}


// toggle wether player is playing
function togglePlay() {

    // if on mobile and controls are collapsed,
    // don't do anything
    if (state.get("controls_collapsed") && state.get("platform") === state.platforms.MOBILE) {
        return;
    }

    // switch between playing and pausing
    switch (state.get("state")) {
        case state.states.PLAYING:
        case state.states.BUFFERING:
            pause();
            break;
        case state.states.PAUSED:
        case state.states.ENDED:
        case state.states.READY:
            play();
            break;
    }
}

function play() {
    engineChannel.command("play");
    state.set({
        endscreen_showing: false,
        autoplay: true
    });
}

function pause() {
    engineChannel.command("pause");
}

// toggle the volume
function toggleVolume() {
    if (state.get("volume") > 0) {
        engineChannel.command("set_volume", 0);
    } else {
        engineChannel.command("set_volume", 1);
    }
}


// replay
function replay() {
    engineChannel.command("set_play_progress", 0);
    engineChannel.command("play");
    state.set({
        endscreen_showing: false
    });
}

function setPlayProgress(progress) {
    engineChannel.command("set_play_progress", progress);
    if (state.get("state") === state.states.READY) {
        // if we have not started playing, play and then set progress
        engineChannel.command("play");
    }
}


//  ===== Overlay actions =====

function showMarkerContent(markerId) {
    state.set({
        playing_suspended: state.get("state") === state.states.PLAYING,
        view_mode: state.viewModes.OVERLAY
    });

    // only pause if not in continous playback mode
    if (!video.get("continuous_playback")) {
        pause();
    }

    markerId = markerId || state.get('current_overlay');
    state.set({
        open_marker: markerId
    });
}

function hideMarkerContent() {
    var markerId = state.get('open_marker');

    if (state.get("playing_suspended") && !video.get("continuous_playback")) {
        play();
    }

    state.set({
        playing_suspended: false,
        last_opened_marker: markerId,
        open_marker: -1,
        view_mode: state.viewModes.VIDEO
    });
}

function showNextMarker(backwards) {
    var marker = video.markers.next(state.get('current_overlay'), backwards);

    if (marker) {
        var id = marker.get('id');
        state.set({
            open_marker: id,
            current_overlay: id
        });
    }
}

function showPrevMarker() {
    showNextMarker(true);
}

function jumpToMarkerTime(markerId) {
    var marker = video.markers.get(markerId);

    if (marker) {
        setPlayProgress(getProgress(marker.get('time') + 1));
    }
}

// ===== Mobile marker menu =====

function showMarkerMenu() {
    state.set({
        marker_menu_open: true
    });
}

function hideMarkerMenu() {
    state.set({
        marker_menu_open: false
    });
}

function toggleMarkerMenu() {
    state.set({
        marker_menu_open: !state.get('marker_menu_open')
    });
}

// ===== Fullscreen actions =====

function showFullscreen() {
    state.set({
        is_fullscreen: true
    });
}

function hideFullscreen() {
    state.set({
        is_fullscreen: false
    });
}

function toggleFullscreen() {
    state.set({
        is_fullscreen: !state.get('is_fullscreen')
    });
}


// ===== Endscreen actions =====

function showEndscreen() {
    state.set({
        endscreen_showing: true
    });
}

function hideEndscreen() {
    state.set({
        endscreen_showing: false
    });
}


// ===== Engine events =====

function setupStateEvents() {

    state.listenTo(engineChannel, 'setup', function(engineOptions) {
        state.set(engineOptions);
    });

    state.listenTo(engineChannel, "ready", function(args) {
        state.set({
            state: state.states.READY,
        });

        // autoplay after ready
        // needs timeout, otherwise players sometimes
        // won't work, should not be done on mobile
        // as a user interaction is requred there to start
        // the player
        if (state.get("autoplay")) {
            setTimeout(function() {
                engineChannel.command("play");
            }, 200);
        }

        // auto open marker when set
        // do not auto open marker on mobile
        if (state.get("auto_open_marker") && state.get("platform") !== state.platforms.MOBILE) {
            setTimeout(function() {
                showMarkerContent(state.get("auto_open_marker"));
            }, 200);
        }
    });

    state.listenTo(engineChannel, "playing", function() {
        state.set({
            state: state.states.PLAYING,
            has_played: true,
            reduced_ui: false
        });
    });

    state.listenTo(engineChannel, "paused", function() {
        state.set({
            state: state.states.PAUSED,
            controls_collapsed: false
        });
    });

    state.listenTo(engineChannel, "ended", function() {
        state.set({
            state: state.states.ENDED,
            play_progress: state.duration
        });

        // show endscreen
        if (state.get("mode") === state.modes.PLAYER ||
            state.get("mode") === state.modes.PREVIEW) {
            state.set({
                endscreen_showing: true
            });
        }
    });


    state.listenTo(engineChannel, "buffering", function() {
        state.set({
            state: state.states.BUFFERING,
        });
    });

    state.listenTo(engineChannel, "volume_change", function(volume) {
        state.set({
            volume: volume
        });
    });

    state.listenTo(engineChannel, "buffer_progress", function(progress) {
        updateBufferProgress(progress);
    });

    state.listenTo(engineChannel, "play_progress", function(progress) {
        updatePlayProgress(progress);
    });

    state.listenTo(engineChannel, "duration_change", function(duration) {
        state.set({
            'duration': duration
        });
        video.set({
            'duration': duration
        });
    });

}


// ===== Idle & Timeout Management =====

function collapseControls() {
    // collapse controls if in playing of buffering mode
    var pstate = state.get("state");
    if ((pstate === state.states.PLAYING || pstate === state.states.BUFFERING) &&
        state.get("mode") !== state.modes.BUILDER) {
        state.set({
            controls_collapsed: true
        });
    }
}

function showControls() {
    state.set({
        controls_collapsed: false
    });
}


// ===== Setup =====

// initialize only once, even if setup is called more often
var eventsInitialized = false;

function setupGlobalStateChanges() {
    if (!eventsInitialized) {
        $(window).resize(function() {
            state.set({
                window_width: window.innerWidth,
                window_height: window.innerHeight,
                window_size: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            });
        });
        eventsInitialized = true;
    }
}

function setup(videoModel, stateModel) {
    video = videoModel;
    state = stateModel;
    playerInterface.state = state;

    state.set({
        duration: video.get('duration')
    });

    setupGlobalStateChanges();
    setupStateEvents();
}

// configure interface to expose
var playerInterface = {

    state: state,
    setup: setup,

    togglePlay: togglePlay,
    play: play,
    pause: pause,
    replay: replay,

    toggleVolume: toggleVolume,

    showMarkerContent: showMarkerContent,
    hideMarkerContent: hideMarkerContent,
    showNextMarker: showNextMarker,
    showPrevMarker: showPrevMarker,
    jumpToMarkerTime: jumpToMarkerTime,

    showMarkerMenu: showMarkerMenu,
    hideMarkerMenu: hideMarkerMenu,
    toggleMarkerMenu: toggleMarkerMenu,

    showFullscreen: showFullscreen,
    hideFullscreen: hideFullscreen,
    toggleFullscreen: toggleFullscreen,

    hideEndscreen: hideEndscreen,
    showEndscreen: showEndscreen,

    setPlayProgress: setPlayProgress,
    collapseControls: collapseControls,
    showControls: showControls
};

module.exports = playerInterface;