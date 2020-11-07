/*
 * Websocket sync
 */
var _ = require('underscore'),
	websocket = require('../util/websocket');

websocket.connect();

var sync = function(store) {
	return function(next) {
		return function(action) {
			var oldState = store.getState(),
				result = next(action),
				newState = store.getState();

			if ( !_.isEqual(oldState, newState)) {
				websocket.update(newState);
			}
			
			return result;
		};
	};
};

module.exports = sync;
