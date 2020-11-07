var names = require('const').ACTIONS,
	actions = {};


/*
 * Engine actions
 */
actions.engineVolumeChange = function(volume) {
	return {
	    type: names.ENGINE_VOLUME_CHANGE,
	    volume: volume
	};
};

actions.engineStateChange = function(state, message) {
	return {
	    type: names.ENGINE_STATE_CHANGE,
	    state: state,
	    message: message
	};
};


actions.engineProgressChange = function(progress) {
	return {
	    type: names.ENGINE_PROGESS_CHANGE,
	    progress: progress,
	    meta: {
	    	$onlyChanges:true
	    }
	};
};


actions.engineBufferChange = function(buffer) {
	return {
	    type: names.ENGINE_BUFFER_CHANGE,
	    buffer: buffer,
	    meta: {
	    	$onlyChanges:true
	    }
	};
};

actions.engineDurationChange = function(duration) {
	return {
	    type: names.ENGINE_DURATION_CHANGE,
	    duration: duration,
	};
};

/*
 * Commands targeted at engine
 */
actions.play = function() {
	return { type: names.PLAY };
};

actions.pause = function() {
	return { type: names.PAUSE };
};

actions.togglePlay = function() {
	return { type: names.TOGGLE_PLAY };
};

actions.setVolume = function(volume) {
	return {
	    type: names.SET_VOLUME,
	    volume: volume
	};
};

actions.toggleVolume = function() {
	return {
	    type: names.TOGGLE_VOLUME
	};
};

actions.setProgress = function(progress) {
	return {
	    type: names.SET_PROGRESS,
	    progress: progress
	};
};

actions.replay = function() {
	return {
	    type: names.REPLAY
	};
};

/*
 * Markers
 */
actions.openMarker = function(id) {
	return {
		type: names.OPEN_MARKER,
		id: id
	};
};

actions.closeMarker = function() {
	return {
		type: names.CLOSE_MARKER
	};
};

/*
 * Content block / endscreen actions
 */
actions.endscreenCTAClick = function() {
	return {
		type: names.ENDSCREEN_CTA_CLICK,
	};
};

actions.ctaClick = function(url, key) {
	return {
		type: names.CTA_CLICK,
		url: url,
		key: key
	};
};

actions.iconClick = function() {
	return {
		type: names.ICON_CLICK,
	};
};

actions.subscribeEmail = function(email, service, serviceID) {
	return {
		type: names.SUBSCRIBE_EMAIL,
		email:email, 
		service:service,
		serviceID:serviceID
	};
};

/*
 * General UI
 */
actions.uncollapseUI = function() {
	return {
		type: names.UNCOLLAPSE_UI,
		meta: {
	    	$throttle:250
	    }
	};
};

actions.collapseUI = function () {
	return {
		type: names.COLLAPSE_UI,
		meta: {
	    	$debounce:3000
	    }
	};
};

/*
 * Other UI Commands
 */
actions.shareVideo = function(service, source) {
	return {
		type: names.SHARE_VIDEO,
		source: source, // controls, endscreen, marker..
		service: service
	};
};

actions.shareMarker = function(marker, service) {
	return {
		type: names.SHARE_MARKER,
		service: service
	};
};

actions.setIsFullscreen = function(isFullscreen) {
	return {
		type: names.SET_IS_FULLSCREEN,
		isFullscreen: isFullscreen
	};
};

/* 
 * Other
 */
actions.updateVideoRevision = function(revision) {
	return {
	    type: names.UPDATE_VIDEO_REVISION,
	    videoRevision: revision
	};
};

actions.updateEnvironment = function(environment) {
	return {
	    type: names.UPDATE_ENVIRONMENT,
	    environment: environment
	};
};

actions.updatePlayerSize = function(width, height) {
	return {
		type: names.UPDATE_PLAYER_SIZE,
		width:width,
		height:height,
		meta: {
	    	$onlyChanges:true
	    }
	};
};

actions.destroy = function() {
	return {
		type: names.DESTROY
	};
};

actions.decryptVideo = function(password) {
	return {
		type: names.DECRYPT_VIDEO,
		password: password
	};
};

actions.reset = function() {
	return {
		type: names.RESET
	};
};

actions.playerHidden = function() {
	return {
		type: names.PLAYER_HIDDEN
	};
};



module.exports = actions;