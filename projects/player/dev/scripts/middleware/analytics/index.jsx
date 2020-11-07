
var _ = require('underscore'),
	
	ACTIONS = require('const').ACTIONS,
	STATES = require('const').STATES,

	adapters = [
		require('./adapters/googleAnalytics'),
		require('./adapters/unruly'),
	];


/*
 * map actions
 */
function mapAction(action, stateBefore, stateAfter) {

	var revision = stateBefore.videoRevision || stateBefore.videoRevision;

	var result = [];

	switch (action.type) {

		case ACTIONS.UPDATE_VIDEO_REVISION:
			result.push(['init', action.videoRevision]);
			break;

		case ACTIONS.ENGINE_STATE_CHANGE:
			switch(action.state) {
				case STATES.READY:
					result.push(['ready']);
					break;
				case STATES.PLAYING:
					result.push(['play']);
					break;
				case STATES.PAUSED: 
					result.push(['pause']);
					break;
				case STATES.ENDED:
					result.push(['ended']);
					break;
			}
			break;

		case ACTIONS.SET_PROGRESS:
		case ACTIONS.ENGINE_PROGESS_CHANGE:

			var duration = stateAfter.playerState.duration,

				quartile = 0.25,

				progress1 = stateBefore.playerState.progress,
				progress2 = stateAfter.playerState.progress,

				seconds1 = Math.floor(progress1 * duration),
				seconds2 = Math.floor(progress2 * duration),

				quartile1 = Math.ceil(progress1 / 0.25),
				quartile2 = Math.ceil(progress2 / 0.25);


			if (quartile1 != quartile2 ) {
				result.push(['quartile', quartile2-1]);
			}

			// seconds update
			if ( seconds1 != seconds2 ) {
				result.push(['time', seconds2]);
			}

			// always push progress
			if ( progress1 != progress2 ) {
				result.push(['progress', progress2]);
			}
			break;

		case ACTIONS.OPEN_MARKER:
			var key = revision.markers[action.id].key;
			result.push(['openMarker', key]);
			break;

		case ACTIONS.CLOSE_MARKER:
			result.push(['closeMarker']);
			break;

		case ACTIONS.SHARE_VIDEO:
			result.push(['shareVideo', action.service]);
			break;

		case ACTIONS.SHARE_MARKER:
			result.push(['shareMarker', action.service]);
			break;

		case ACTIONS.SET_IS_FULLSCREEN: 
			result.push(['toggleFullscreen', stateAfter.playerState.isFullscreen]);
			break;

		case ACTIONS.ENGINE_VOLUME_CHANGE:
			result.push(['toggleVolume', action.volume]);
			break;

		case ACTIONS.REPLAY:
			result.push(['replay']);
			break;

		case ACTIONS.CTA_CLICK: 
			result.push(['clickCTA',action.url]);
			break;

		case ACTIONS.ENDSCREEN_CTA_CLICK: 
			result.push(['clickEndscreenCTA']);
			break;

		case ACTIONS.ICON_CLICK: 
			result.push(['clickIcon']);
			break;

		case ACTIONS.SUBSCRIBE_EMAIL: 
			result.push(['subscribeEmail']);
			break;

	}
	return result;
};


var analytics = function(store) {

	function invoke(event) {
		var eventName = event[0],
			args = [adapters, eventName].concat(event.slice(1));
		_.invoke.apply(false, args);
	};

	return function(next) {
		return function(action) {

			var stateBefore = store.getState(),
				result = next(action),
				stateAfter = store.getState();

			var events = mapAction(action, stateBefore, stateAfter);
			_.each(events, function(ev){
				invoke(ev);
			});

			return result;
		};
	};
};

/*
 * Export for testing purposes
 */
analytics._setAdapters = function(_adapters){
	adapters = _adapters;
};

module.exports = analytics;
