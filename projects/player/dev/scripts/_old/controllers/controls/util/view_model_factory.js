var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder'),
    timestringHelpers = require('_old/util/timestring_helpers');


function create(state, video) {

    var model = new Backbone.Model();

    model_binder.bind({

        // wether the large play button is displayed
        show_large_play_button: {
            observe: ["state", "open_marker", "autoplay"],
            map: function(pstate, open_marker, autoplay) {

                var result = false;

                switch (pstate) {
                    case state.states.ENDED:
                    case state.states.READY:
                    case state.states.PAUSED:
                        result = true;
                }

                // if a marker is open, never show loading or play indicator
                if (open_marker >= 0) {
                    result = false;
                }

                // if state is ready but we'll autoplay,
                // never show play button
                if (pstate === state.states.READY && autoplay) {
                    result = false;
                }

                return result;
            }
        },

        show_small_buttons_right: {
            observe: ["open_marker"],
            map: function(open_marker) {
                return open_marker < 0;
            }
        },

        disable_large_buttons: {
            observe: ["state", "controls_collapsed", "has_played"],
            map: function(pstate, controls_collapsed, has_played) {

                // before has played this is taken care of by the bootstrap view
                if (!has_played) {
                    return true;
                }

                if (!video || !video.source || !video.source.get("youtube_allow_clickthrough")) {
                    return false;
                }

                if (pstate === state.states.READY)  {
                    return false;
                }


                return !controls_collapsed;
            }
        },

        enable_youtube_ad_fix: {
            observe: "engine_enable_youtube_ad_fix",
        },

        // wether the loading indicator is displayed
        show_large_loading_indicator: {
            observe: ["state", "open_marker", "has_played"],
            map: function(pstate, open_marker) {
                var result = false;

                switch (pstate) {
                    case state.states.BUFFERING:
                        result = true;
                }

                // if a marker is open, never show loading or play indicator
                if (open_marker >= 0) {
                    result = false;
                }

                return result;
            }
        },

        indicate_is_muted: {
            observe: "volume",
            map: function(value) {
                return value === 0;
            }
        },

        indicate_is_fullscreen: "is_fullscreen",

        indicate_is_playing: {
            observe: "state",
            map: function(pstate) {
                switch (pstate) {
                    case state.states.ENDED:
                    case state.states.READY:
                    case state.states.PAUSED:
                        return false;
                }
                return true;
            }
        },

        show_fullscreen_button: "fullscreen_available",

        show_knob: {
            observe: "platform",
            map: function() {
                return false;
                // return value === state.platforms.MOBILE;
            }
        },

        show_mute_button: {
            observe: "platform",
            map: function(value) {
                return value === state.platforms.DESKTOP;
            }
        },

        show_logo: {
            observe: "engine_displays_logo_in_bottom_right",
            map: function() {
                // always disable bottom right logo
                return false;
                //return !value;
            }
        },

        play_progress_string: {
            observe: "play_progress_seconds",
            map: timestringHelpers.secondsToString
        },

        play_progress: "play_progress",

        editing: {
            observe: "mode",
            map: function(val) {
                return val === state.modes.BUILDER;
            }
        },

        show_add_marker_button: {
            observe: "mode",
            map: function(val) {
                return val === state.modes.BUILDER;
            }
        },


        disable_small_right_buttons: {
            observe: "mode",
            map: function(val) {
                return val === state.modes.BUILDER;
            }
        },

        user_activity_enabled: {
            observe: ["engine_needs_direct_touch_on_start", "has_played", "platform"],
            map: function(needs_touch, has_played, platform) {
                return has_played || !needs_touch || platform !== state.platforms.MOBILE;
            }
        },

        show_playbar: {
            observe: "reduced_ui",
            map: function(val) {
                return !val;
            }
        },

        show_small_playbutton: {
            observe: "reduced_ui",
            map: function(val) {
                return !val;
            }
        },


        buffer_progress_normalized: "buffer_progress",
        controls_collapsed: {
            observe: ["controls_collapsed", "reduced_ui"],
            map: function(controls_collapsed, reduced_ui) {
                return controls_collapsed && !reduced_ui;
            }
        }

    }, state, model);

    if (video) {
        model_binder.bind({
            icon_url: "ui_icon",
            show_share_buttons: {
                observe: ["ui_disable_share_buttons"],
                map: function(sharing_disabled) {
                    return !sharing_disabled && !state.get("reduced_ui");
                }
            }
        }, video, model);
    }

    return model;
}

module.exports = {
    create: create
};