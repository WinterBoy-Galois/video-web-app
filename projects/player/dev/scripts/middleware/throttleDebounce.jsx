/*
 * Throttle action with the '$throttle' meta attribues
 */
var _ = require('underscore');

var throttleDebounce = function(store) {
	var throttledFunctions = {},
		debouncedFunctions = {};
	return function(next) {
		return function(action) {

			// throttling
			if ( action.type && action.meta && action.meta.$throttle ) {
				if ( !(action.type in throttledFunctions) ) {
					throttledFunctions[action.type] = _.throttle(next, action.meta.$throttle);
				}
				return throttledFunctions[action.type](action);
			}
			// debouncing
			else if ( action.type && action.meta && action.meta.$debounce ) {
				if ( !(action.type in debouncedFunctions) ) {
					debouncedFunctions[action.type] = _.debounce(next, action.meta.$debounce);
				}
				return debouncedFunctions[action.type](action);
			}

			return next(action);
		};
	};
};

module.exports = throttleDebounce;
