/*
 * Middleware for sending special metrics for testing and making assumptions about 
 * our player.
 */
var TRACKING_ID = 'UA-46402960-9',
	ACTIONS = require('const').ACTIONS,
	STATES = require('const').STATES,
	ga = window.ga,
	config = require('config'),
	update = require('react-addons-update');


// fetch and promises polyfills
require('whatwg-fetch');
require('es6-promise');

ga('create', TRACKING_ID, 'auto', 'test');
ga('test.set', 'page', '/');
ga('test.send', 'pageview', {ssessionControl:'start'});


function track (category, name, label, value) {

	try {
		ga('test.send', 'event', category, name, label, value, {transport: 'beacon'});
	} catch(_){
	}
	
};

track('test', 'loading', '', 0);

function getSeconds() {
	return Math.floor((new Date()).getTime() / 1000);
}
var _time = getSeconds();
function timeSinceLastRequest(reset) {
	var newTime = getSeconds(),
		result = newTime - _time;

	if ( reset )
		_time = newTime;
	return result;
}


/*
 * Make ID string
 */
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}



/*
 * Send server update every 5 seconds
 */
var ownAnalytics = {};
function sendDataToAPI() {
	if ( ownAnalytics.firstPlayTime === 0 ) return;

	// set full time since play start
	var sendAnalytics = update(ownAnalytics, {
		sessionTotal: { $set: ((new Date()).getTime() - ownAnalytics.firstPlayTime) / 1000 },
	});

	// update playtime if in the middle of playing
	if ( sendAnalytics.lastPlayStart !== false ) {
		var delta = ((new Date()).getTime() - sendAnalytics.lastPlayStart) / 1000;
		sendAnalytics = update(sendAnalytics, {
			playingTotal: { $set: sendAnalytics.playingTotal + delta }
		});
	}

	// update overlay open time if overlay currently open
	if ( sendAnalytics.lastOverlayOpened !== false ) {
		var delta = ((new Date()).getTime() - sendAnalytics.lastOverlayOpened) / 1000;
		sendAnalytics = update(sendAnalytics, {
			overlayOpenTotal: { $set: sendAnalytics.overlayOpenTotal + delta }
		});
	}

	fetch(config.statsEndpoint, {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json'
		},
		body: JSON.stringify(sendAnalytics)
	});		
};

setInterval(function(){		
	sendDataToAPI();
},5000);

window.onbeforeunload = function() {
	sendDataToAPI();
};

var onlyChanges = function(store) {

	ownAnalytics = {

			sessionKey: makeid(),
			videoKey: false,

			firstPlayTime: 0,
			playingTotal: 0,
			overlayOpenTotal: 0,
			progressMax: 0,
			sessionTotal: 0,

			lastPlayStart: false,
			lastOverlayOpened: false
		};

	return function(next) {
	
		return function(action) {


			/*
			 *	GA statistics
			 */

			var stateBefore = store.getState(),
				result = next(action),
				stateAfter = store.getState();

			if ( action.type == ACTIONS.ENGINE_STATE_CHANGE && action.state == STATES.READY ) {
				track('event', 'ready', '', 0);
			}

			if ( action.type == ACTIONS.ENGINE_STATE_CHANGE && action.state == STATES.PLAYING ) {
				track('event', 'play', '', 0);
			}

			if ( action.type == ACTIONS.REPLAY ) {
				track('event', 'replay', '', 0);
			}

			if ( action.type == ACTIONS.SHARE_VIDEO ) {
				track('event', 'share', action.source, 0);
			}

			if ( action.type == ACTIONS.OPEN_MARKER ) {

				var type = '',
					marker = stateAfter.videoRevision.markers[stateAfter.playerState.openedMarker];

				if ( stateAfter.playerState.progress * stateAfter.playerState.duration < marker.time ) {
					type = 'clickAhead';
				}
				if ( stateAfter.playerState.progress * stateAfter.playerState.duration >= marker.time ) {
					type = 'clickBack';
				}

				if ( stateAfter.playerState.currentMarker == stateAfter.playerState.openedMarker ) {
					type = 'clickCurrent';
				}

				track('event', 'markerClick', type, 0);
			}

			if ( stateBefore.playerState.openedMarker !== stateAfter.playerState.openedMarker ) {
				var time = timeSinceLastRequest(true);
				if ( stateBefore.playerState.openedMarker === false ) {
					track('time', 'markerClosed', '', time);
				} else if ( stateAfter.playerState.openedMarker === false ) {
					track('time', 'markerOpened', '', time);
				}
			}


			/*
			 *	Own statistics
			 */

			// remember max play time
			if ( stateAfter.playerState.progress * stateAfter.playerState.duration > ownAnalytics.progressMax ) {
				ownAnalytics = update(ownAnalytics, {
					progressMax: { $set: stateAfter.playerState.progress * stateAfter.playerState.duration}
				});
			}

			// time when video started
			if ( ownAnalytics.firstPlayTime === 0 && stateAfter.playerState.hasPlayed ) {
				ownAnalytics = update(ownAnalytics, {
					firstPlayTime: { $set: (new Date()).getTime()}
				});
			}

			// count how many seconds have been playing
			if ( ownAnalytics.lastPlayStart === false && stateAfter.playerState.state === STATES.PLAYING ) {
				ownAnalytics = update(ownAnalytics, {
					lastPlayStart: { $set: (new Date()).getTime()}
				});
			}

			if ( ownAnalytics.lastPlayStart !== false && stateAfter.playerState.state !== STATES.PLAYING ) {
				var delta = ((new Date()).getTime() - ownAnalytics.lastPlayStart) / 1000;
				ownAnalytics = update(ownAnalytics, {
					lastPlayStart: { $set: false },
					playingTotal: { $set: ownAnalytics.playingTotal + delta}
				});
			}

			// count how many seconds an overlay has been open
			// count how many seconds have been playing
			if ( ownAnalytics.lastOverlayOpened === false && stateAfter.playerState.openedMarker !== false ) {
				ownAnalytics = update(ownAnalytics, {
					lastOverlayOpened: { $set: (new Date()).getTime()}
				});
			}

			if ( ownAnalytics.lastOverlayOpened !== false && stateAfter.playerState.openedMarker === false ) {
				var delta = ((new Date()).getTime() - ownAnalytics.lastOverlayOpened) / 1000;
				ownAnalytics = update(ownAnalytics, {
					lastOverlayOpened: { $set: false },
					overlayOpenTotal: { $set: ownAnalytics.overlayOpenTotal + delta}
				});
			}

			if ( stateAfter.videoRevision && ownAnalytics.videoKey === false ) {
				ownAnalytics = update(ownAnalytics, {
					videoKey: { $set: stateAfter.videoRevision.key }
				});
			}

			return result;
		};
	};
};

module.exports = onlyChanges;
