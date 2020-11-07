var playerjs = require("player.js"),
    Marionette = require("marionette");

playerjs = window.playerjs;


var receiver = new playerjs.Receiver();

module.exports = Marionette.Controller.extend({

    initialize: function(config) {

        var api = config.api,
            playerState = config.playerState,
            looping = false,
            volume = 100;


        /* EVENTS */
        if (playerState.get("state") == playerState.states.READY) {
            receiver.ready();
        }

        this.listenTo(playerState, "change:state", function(playerState, state) {
            if (state == playerState.states.READY) {
                receiver.ready();
            } else if (state == playerState.states.PLAYING) {
                receiver.emit('play');
            } else if (state == playerState.states.PAUSED) {
                receiver.emit('pause');
            } else if (state == playerState.states.ENDED) {
                receiver.emit('ended');
            } else if (state == playerState.states.ERROR) {
                receiver.emit('error');
            }
        });


        //timeupdate
        this.listenTo(playerState, "change:play_progress", function(playerState, playProgress) {
            var val = {
                seconds: playProgress * playerState.get("duration"),
                duration: playerState.get("duration")
            };
            receiver.emit("timeupdate", val);
        });


        /* METHODS */
        receiver.on('play', function() {
            api.command("play");
        });

        receiver.on('pause', function() {
            api.command("pause");
        });

        receiver.on('getPaused', function(callback) {
            callback(playerState.get("state") == playerState.states.PAUSED);
        });

        receiver.on('getCurrentTime', function(callback) {
            callback(playerState.get("duration") * playerState.get("play_progress"));
        });

        receiver.on('setCurrentTime', function(value) {
            api.command("play_progress", value / playerState.get("duration"));
        });

        receiver.on('getDuration', function(callback) {
            callback(playerState.get("duration"));
        });

        function mute() {
            if (playerState.get("volume") !== 0) {
                api.command("toggle_volume");
            }
        }

        function unmute() {
            if (playerState.get("volume") === 0) {
                api.command("toggle_volume");
            }
        }

        receiver.on('getVolume', function(callback) {
            callback(volume);
        });

        receiver.on('setVolume', function(value) {
            volume = value;
            if (value === 0) {
                mute();
            } else {
                unmute();
            }
        });

        receiver.on('mute', function() {
            mute();
        });

        receiver.on('unmute', function() {
            unmute();
        });

        receiver.on('getMuted', function(callback) {
            callback(playerState.get("volume") === 0);
        });


        // looping is not supported
        receiver.on('getLoop', function(callback) {
            callback(looping);
        });
        receiver.on('setLoop', function(value) {
            looping = value;
        });

    },

});