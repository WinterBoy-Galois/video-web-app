var _ = require('underscore'),

	ACTIONS = require('const').ACTIONS,
	STATES = require('const').STATES,
	DEFAULT = require('const').DEFAULT_PLAYER_STATE,
	UIS = require('const').UIS,

	engineConfigs = require('config/engines');

var map = {};

/*
 * Events from the engine
 */
map[ACTIONS.ENGINE_STATE_CHANGE] = function(state, action) {
	var hasPlayed = action.state == STATES.PLAYING ? true : state.hasPlayed,
		isEndscreenShowing = action.state == STATES.ENDED ? true : state.isEndscreenShowing,
		errorMessage = action.state == STATES.ERROR ? action.message : state.errorMessage;

	return {
		hasPlayed: { $set: hasPlayed },
		state: { $set: action.state },
		isEndscreenShowing: { $set: isEndscreenShowing},
		errorMessage: { $set: errorMessage }
	};
};

map[ACTIONS.ENGINE_PROGESS_CHANGE] = function(state, action, fullState) {

	// find current marker
	var nearest = 100000, 
		nearestID = false, 
		progress = action.progress * state.duration;
	_.each(fullState.videoRevision.markers, function(marker, index){
		var dist = progress - marker.time;
		if ( dist > 0 && dist < 4 && dist < nearest ) {
			nearest = dist;
			nearestID = index;
		};
	});

	// if less than 1 second to play, show endscreen 
	// to avoid real player endscreen flashing
	var remainingSeconds = (1 - action.progress) * state.duration,
		isEndscreenShowing = (remainingSeconds < 1 ? true : state.isEndscreenShowing) && state.duration > 0 ;

	// when a new marker is shown, remove clickhint count
	var clickhintCount = state.clickhintCount;
	if ( nearestID != state.currentMarker ) {
		clickhintCount--;
	}

	return {
		clickhintCount: { $set: clickhintCount },
		progress: { $set: action.progress },
		currentMarker: { $set: nearestID },
		isEndscreenShowing: { $set: isEndscreenShowing},
		progressUpdateLockTime: { $set: false }
	};
};


map[ACTIONS.ENGINE_VOLUME_CHANGE] = function(state, action) {
	return {
		volume: { $set: action.volume }
	};
};

map[ACTIONS.ENGINE_BUFFER_CHANGE] = function(state, action) {
	return {
		buffer: { $set: action.buffer }
	};
};

map[ACTIONS.ENGINE_DURATION_CHANGE] = function(state, action) {
	return {
		duration: { $set: action.duration }
	};
};

/*
 * Commands to engine
 */
map[ACTIONS.PLAY] = function(state, action) {
	return {
		openedMarker: { $set: false },
		isEndscreenShowing: { $set: false },
		isPlayingSuspended: { $set: false },
	};
};

map[ACTIONS.REPLAY] = function(state, action) {
	return map[ACTIONS.PLAY]();
};

map[ACTIONS.TOGGLE_PLAY] = function(state, action, fullState) {
	switch (fullState.playerState.state) {
        case STATES.PAUSED:
        case STATES.ENDED:
        case STATES.READY:
        	return map[ACTIONS.PLAY]();
        case STATES.INITIALIZING:
        	return {
				playOnReadyRequested: { $set:true }
        	};
    }
};

map[ACTIONS.SET_PROGRESS] = function(state, action, fullState) {
	switch (fullState.playerState.state) {
        case STATES.PAUSED:
        case STATES.ENDED:
        case STATES.READY:
        	return map[ACTIONS.PLAY]();
        	break;
        case STATES.PLAYING:
        case STATES.BUFFERING:
            // directly set progress on user request for instant change
            // on ui
        	return {
        		progress: { $set: action.progress },
        	};

    }
};

/*
 * Markers
 */
map[ACTIONS.OPEN_MARKER] = function(state, action) {
	var isPlaying = state.state == STATES.PLAYING;
	return {
		clickhintCount: {$set:0}, // click hint should not be shown anymore
		openedMarker: { $set:action.id },
		isPlayingSuspended: { $set: isPlaying },
		viewedMarkers: { $merge: { [action.id]: action.id }}
	};
};

map[ACTIONS.CLOSE_MARKER] = function(state, action) {
	if ( state.openedMarker === false ) return;
	return {
		openedMarker: { $set:false },
		isPlayingSuspended: { $set: false }
	};
};

/*
 * General UI Commands
 */
map[ACTIONS.COLLAPSE_UI] = function(state, action) {
	if ( !(state.state == STATES.PLAYING || state.state == STATES.BUFFERING) ) {
		return;
	}
	return {
		areControlsCollapsed: { $set:true }
	};
};

map[ACTIONS.UNCOLLAPSE_UI] = function(state, action) {
	return {
		areControlsCollapsed: { $set:false }
	};
};

/* 
 *	React to environment changes
 */
map[ACTIONS.UPDATE_PLAYER_SIZE] = function(state, action, fullState) {
	var mobilePortrait = 
		action.height < 800 && 
		(action.width / action.height < 0.85);

	return {	
		ui: { $set : ( mobilePortrait ? UIS.MOBILE_PORTRAIT : UIS.REGULAR) }
	};
};

/*
 * Other UI Commands
 */
map[ACTIONS.SET_IS_FULLSCREEN] = function(state, action) {
	return {
		isFullscreen: { $set:action.isFullscreen }
	}; 
};

map[ACTIONS.UPDATE_VIDEO_REVISION] = function(state, action, fullState) {

	var revision = action.videoRevision;

	if (revision.encrypted) {
		return {
			state: { $set: STATES.ENCRYPTED }
		};
	} 

	var env = fullState.environment,
		engineConfig = engineConfigs[revision.source.service];

	// determine wether we have to switch to sprite playback
	var useSpritePlayback = false;
	if ( env.platformNeedsSpritePlayback && revision.source.sprite_support ) {
		useSpritePlayback = true;
		engineConfig = engineConfigs['sprites'];
	}

	if ( env.platformNeedsInlinePlayback && revision.source.sprite_support && !engineConfig.canPlaybackInline ) {
		useSpritePlayback = true;
		engineConfig = engineConfigs['sprites'];
	}

	// determine wether this engine will only start with a direct click/touch
	var allowEngineClickthroughOnStart = false;
	if ( env.isHandheld && engineConfig.needsDirectTouchToStartOnHandheld) {
		allowEngineClickthroughOnStart = true;
	}

	var allowEngineClickthroughWhilePlaying = false;
	if ( revision.source.youtube_allow_clickthrough )
		allowEngineClickthroughWhilePlaying = true;
	if ( useSpritePlayback )
		allowEngineClickthroughWhilePlaying = false;

	return {
		state: { $set: STATES.INITIALIZING },
		clickhintCount: {$set:(revision.ui_click_hint_appearences || 1)+1},
		duration: { $set : revision.source.duration },
		allowEngineClickthroughWhilePlaying: { $set : allowEngineClickthroughWhilePlaying },
		useSpritePlayback: { $set: useSpritePlayback },
		allowEngineClickthroughOnStart: { $set: allowEngineClickthroughOnStart }
	};
};

map[ACTIONS.DECRYPT_VIDEO] = function(state) {
	return {
		decryptTries: { $set: state.decryptTries + 1 },
	};
};


map[ACTIONS.RESET] = function() {
	return {$merge: DEFAULT};
};

map['default'] = function() {
	return DEFAULT;
};


module.exports = map;