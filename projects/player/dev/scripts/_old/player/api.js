var config = require('config'),
    Radio = require('radio'),
    Player = require('./player'),
    Builder = require('./builder'),
    Analytics = require('./analytics'),
    PlayerState = require('./models/playerstate'),
    analytics_service = require('_old/services/analytics_service'),
    browser_support_helper = require('shared/util/browser_support_helpers'),
    fullscreen_helper = require('_old/util/fullscreen_helper');


var channel = new Radio.channel(config.channels.api),
    state = null,
    video = null;


// TODO create some kind of environment setup
// should probably be moved out of the api object
function setupEnv() {

    if (document.videopath.player.bootstrap) {

        // notify bootstrapper, that main app has launched
        document.videopath.player.bootstrap.mainAppStarted();

        // set thumbnail 
        document.videopath.player.bootstrap.setThumbnail(video.attributes.thumbnails.large);

        // set loaded video colors
        document.videopath.player.bootstrap.setColors(video.get("ui_color_1"), video.get("ui_color_2"), video.get("ui_color_button_text"));
    }


    // set state to autoplay if
    // query params has it
    // don't on mobile!
    if (config.queryParams.autoplay && !browser_support_helper.mobile) {
        state.set({
            autoplay: config.queryParams.autoplay
        });
    }

    // set to autoplay if play already started in bootstrap code
    if (document.videopath.player.bootstrap && document.videopath.player.bootstrap.play_button_tapped && !browser_support_helper.mobile) {
        state.set({
            autoplay: true
        });
    }

    state.set({
        auto_open_marker: config.queryParams.m
    });

    // set mobile platform if this is the case
    if (browser_support_helper.mobile) {
        state.set({
            platform: state.platforms.MOBILE
        });
    }

    // set to builder mode
    if (!!config.queryParams.build) {

        // set to builder mode
        state.set({
            mode: state.modes.BUILDER
        });
    }

    // if  jpgs are enabled and we're on iphone
    // set this to state
    if (browser_support_helper.iPhone && video.source && (video.source.get("sprite_support"))) {
        state.set("jpg_sequence_playback_enabled", true);
    }

    // on iphone, the video gets pulled out into quicktime
    // so we only show a reduced UI, and give a hint about
    // watching it on desktop   
    else if (browser_support_helper.iPhone) {
        state.set("reduced_ui", true);
    }


    state.set({
        fullscreen_available: fullscreen_helper.fullscreenAvailable()
    });
}


function setup(v) {
    video = v;
    state = new PlayerState();

    Player.setup(video, state);
    Analytics.setup(video, state, analytics_service);

    setupEnv();
    setupPlayerApi();

    if (state.get('mode') === state.modes.BUILDER) {
        Builder.setup(video, Player);
        setupBuilderApi();
    }

    apiInterface.video = video;
    apiInterface.playerState = state;
}


function setupPlayerApi() {
    channel.comply('toggle_play', Player.togglePlay);
    channel.comply('play', Player.play);
    channel.comply('pause', Player.pause);

    channel.comply('toggle_volume', Player.toggleVolume);
    channel.comply('replay', Player.replay);

    channel.comply('show_marker_content', Player.showMarkerContent);
    channel.comply('hide_marker_content', Player.hideMarkerContent);
    channel.comply('show_next_marker', Player.showNextMarker);
    channel.comply('show_prev_marker', Player.showPrevMarker);
    channel.comply('jump_to_marker_time', Player.jumpToMarkerTime);

    channel.comply('show_fullscreen', Player.showFullscreen);
    channel.comply('hide_fullscreen', Player.hideFullscreen);
    channel.comply('toggle_fullscreen', Player.toggleFullscreen);

    channel.comply('play_progress', Player.setPlayProgress);

    channel.comply('hide_marker_menu', Player.hideMarkerMenu);
    channel.comply('show_marker_menu', Player.showMarkerMenu);
    channel.comply('toggle_marker_menu', Player.toggleMarkerMenu);
    channel.comply('collapse_controls', Player.collapseControls);
    channel.comply('show_controls', Player.showControls);
}


function setupBuilderApi() {
    channel.comply('add_marker', Builder.addMarker);
    channel.comply('delete_marker', Builder.deleteMarker);
    channel.comply('add_marker_content', Builder.addMarkerContent);
    channel.comply('delete_marker_content', Builder.deleteMarkerContent);

    // expose endscreen api only in builder:
    channel.comply('show_endscreen', Player.showEndscreen);
    channel.comply('hide_endscreen', Player.hideEndscreen);

}


var apiInterface = {
    setup: setup,

    api: channel,
    analytics: Analytics.channel,
    playerState: state,

    video: video,
};

module.exports = apiInterface;