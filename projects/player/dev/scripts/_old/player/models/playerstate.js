var Backbone = require('backbone');


// possible values for the state
var states = {
        INITIALIZING: "initializing",
        READY: "ready",
        PAUSED: "paused",
        PLAYING: "playing",
        BUFFERING: "buffering",
        ENDED: "ended",
        ERROR: "error"
    },

    deviceClasses = {
        DESKTOP: "desktop",
        TABLET: "tablet",
        PHONE: "phone"
    },

    // which mode the player is in
    modes = {
        PLAYER: "player",
        BUILDER: "builder",
        PREVIEW: "preview"
    },

    // def special behaviour for certain platforms
    platforms = {
        DESKTOP: "desktop",
        MOBILE: "mobile"
    },

    viewModes = {
        VIDEO: "video",
        OVERLAY: "overlay"
    };


var Model = Backbone.Model.extend({

    // defaults
    defaults: {

        // engine states
        play_progress: 0,
        load_progress: 0,
        has_played: false,
        replayed: false,
        duration: 0,
        state: states.INITIALIZING,
        volume: 1,

        autoplay: false,

        //environment vars
        fullscreen_available: true,
        is_fullscreen: false,

        // set to the id of the marker which is opened, if a marker is opened
        open_marker: -1,
        last_opened_marker: -1,
        current_marker: null,

        // mark collapsed controls
        controls_collapsed: false,
        marker_menu_open: false,

        // this is true if playing is suspended during an open overlay
        playing_suspended: false,

        // modes
        mode: modes.PLAYER,
        platform: platforms.DESKTOP,
        deviceClass: deviceClasses.DESKTOP,
        view_mode: viewModes.VIDEO,

        // window and screen properties
        window_width: window.innerWidth,
        window_height: window.innerHeight,
        window_size: {
            width: window.innerWidth,
            height: window.innerHeight
        },

        // wether the engine has its own loading indicator
        engine_provides_loading_indicator: false,

        // wether engine needs to get direct
        // touches on mobile devices
        engine_needs_direct_touch_on_start: false,
        engine_enable_youtube_ad_fix: false,
        engine_displays_logo_in_bottom_right: false,

    },

    modes: modes,
    states: states,
    platforms: platforms,
    deviceClasses: deviceClasses,
    viewModes: viewModes

});
module.exports = Model;