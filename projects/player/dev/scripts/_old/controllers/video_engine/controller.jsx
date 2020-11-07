var _ = require('underscore'),
    config = require("config"),
    engineConfig = require('config/engines_old'),
    Radio = require("radio"),
    Controller = require("shared/controllers/controller"),

    React = require('react'),
    ReactDom= require('react-dom'),
    Component = require('containers/videoEngine/component');

require('shared/util/browser_support_helpers');


/*
 * Wrapper for react engines
 */
module.exports = Controller.extend({

    channel: Radio.channel(config.channels.engine),

    initialize: function(options) {
        this.video = options.video;
        this.playerState = options.playerState;
    },

    start: function() {

        var channel = this.channel,
            engine = this.render();

        this.channel.comply("play", function() {
            engine.play();
        });

        this.channel.comply("pause", function() {
            engine.pause();
        });

        this.channel.comply("set_play_progress", function(value) {
            engine.setProgress(value);
        });

        this.channel.comply("set_volume", function(value) {
            engine.setVolume(value);
        });

        this.listenTo(this.video, "change:ui_fit_video", this.render.bind(this));

    },

    render: function() {

        var channel = this.channel,
            source = _.clone(this.video.source.attributes);

        if (this.playerState.get("jpg_sequence_playback_enabled")) {
            source.service = 'sprites';
        }

        if (!this.started) {
            this.started = true;
             this.channel.trigger('setup', engineConfig[source.service]);
        }

        var props = {
            service: source.service,
            source: source,
            fit: this.video.get('ui_fit_video'),
            onStateChange: function(state){
                channel.trigger(state, {
                    duration:source.duration
                });
            },
            onVolumeChange: function(value) {
                channel.trigger('volume_change', value);
            },
            onProgressChange: function(value){
                channel.trigger("play_progress", value);
            },
            onBufferChange: function(value) {
                channel.trigger("buffer_progress", value);
            },
            onDurationChange: function(value) {
                channel.trigger("duration_change", value);
            }
        };


        return ReactDom.render(<Component {...props} />, document.getElementById("vp_engine_wrapper"));

    },



});