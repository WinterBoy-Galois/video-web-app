var playerjs = require("player.js"),
	CONST = require('const'),
	actions = require('actions');


var playerjsMiddleware = function(store) {

	var receiver = new window.playerjs.Receiver(),
		looping = false,
		volume = 100;

	/* 
	 * Incoming commands
	 */
	receiver.on('play', function(){
		store.dispatch(actions.play());
	});

	receiver.on('pause', function(){
		store.dispatch(actions.pause());
	});

    receiver.on('setVolume', function(value) {
    	volume = value;
    	if (value === 0) {
            store.dispatch(actions.setVolume(0));
        } else {
            store.dispatch(actions.setVolume(1));
        }
    });

    receiver.on('setCurrentTime', function(value) {
    	var duration = store.getState().playerState.duration;
    	store.dispatch(actions.setProgress(value/duration));
    });

    receiver.on('mute', function() {
    	store.dispatch(actions.setVolume(0));
    });

    receiver.on('unmute', function() {
    	store.dispatch(actions.setVolume(1));
    });

    receiver.on('setLoop', function(value) {
        looping = value;
    });


	/*
	 * Incoming requests
	 */
	receiver.on('getPaused', function(callback){
		callback(store.getState().playerState.state == CONST.STATES.PAUSED );
	});

	receiver.on('getDuration', function(callback) {
        callback(store.getState().playerState.duration);
    });

    receiver.on('getCurrentTime', function(callback) {
    	var duration = store.getState().playerState.duration,
    		progress = store.getState().playerState.progress;
        callback(duration * progress);
    });

    receiver.on('getVolume', function(callback) {
        callback(volume);
    });

    receiver.on('getMuted', function(callback) {
    	callback(store.getState().playerState.volume === 0);
    });

    receiver.on('getLoop', function(callback) {
        callback(looping);
    });

	return function(next) {
		return function(action) {

			// engine states
			if ( action.type == CONST.ACTIONS.ENGINE_STATE_CHANGE ) {
				switch (action.state) {
					case CONST.STATES.READY: 
						receiver.ready();
						break;
					case CONST.STATES.PLAYING:
						receiver.emit('play');
						break;
					case CONST.STATES.PAUSED:
						receiver.emit('pause');
						break;
					case CONST.STATES.ENDED:
						receiver.emit('ended');
						break;
					case CONST.STATES.ERROR:
						receiver.emit('error');
						break;
				}
			}

			// progress updates
			else if ( action.type == CONST.ACTIONS.ENGINE_PROGESS_CHANGE ) {
				var duration = store.getState().playerState.duration;
				var val = {
	                seconds: action.progress * duration,
	                duration: duration
	            };
	            receiver.emit("timeupdate", val);
			}

			// continue regular execution of action
			return next(action);
		};
	};
};

module.exports = playerjsMiddleware;
