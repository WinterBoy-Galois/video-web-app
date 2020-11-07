var ACTIONS = require('const').ACTIONS,
	STATES = require('const').STATES;

var map = {};

/* 
 *	Commands to engine
 */
map[ACTIONS.PLAY] = function(state, action) {
	return {
		$push: [{ action:'play' }]
	};
};

map[ACTIONS.PAUSE] = function(state, action) {
	return {
		$push: [{ action:'pause' }]
	};
};

map[ACTIONS.REPLAY] = function(state, action) {
	return {
		$push: [
			{ action:'setProgress', value:0 },
			{ action:'play' }
		]};
};

map[ACTIONS.TOGGLE_PLAY] = function(state, action, fullState) {

	if (fullState.playerState.areControlsCollapsed) {
		return;
	}

	switch (fullState.playerState.state) {
        case STATES.PLAYING:
        case STATES.BUFFERING:
            return map[ACTIONS.PAUSE]();
        case STATES.PAUSED:
        case STATES.ENDED:
        case STATES.READY:
        	return map[ACTIONS.PLAY]();
    }
};

map[ACTIONS.SET_VOLUME] = function(state, action) {
	return {
		$push: [{ action:'setVolume', value:action.volume }]
	};
};

map[ACTIONS.TOGGLE_VOLUME] = function(state, action, fullState) {
	return {
		$push: [{ action:'setVolume', value:fullState.playerState.volume === 0 ? 1 : 0 }]
	};
};

map[ACTIONS.SET_PROGRESS] = function(state, action) {
	return {
		$push: [{ action:'setProgress', value:action.progress }]
	};
};

map[ACTIONS.OPEN_MARKER] = function(state, action) {
	return {
		$push: [{ action:'pause' }]
	};
};

map[ACTIONS.CLOSE_MARKER] = function(state, action, fullState) {
	if ( fullState.playerState.isPlayingSuspended) {
		return {
			$push: [{ action:'play' }]
		};
	}
};

map[ACTIONS.ENGINE_STATE_CHANGE] = function(state, action, fullState) {
	if ( action.state === STATES.READY && 
		!fullState.environment.isHandheld && 
		(fullState.environment.autoplayRequested || fullState.playerState.playOnReadyRequested)) {
		return map[ACTIONS.PLAY]();
	}
};

/* 
 * On handhelds pause playback when leaving the current tab
 */
map[ACTIONS.PLAYER_HIDDEN] = function(state, action, fullState) {
	if ( fullState.environment.isHandheld ) 
		return {
			$push: [{ action:'pause' }]
		};
};

map['default'] = function() {
	return [];
};


module.exports = map;