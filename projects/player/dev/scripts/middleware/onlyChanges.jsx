/*
 * Only fire function if arguments have changed since last call
 */

var _ = require('underscore');

var onlyChanges = function(store) {
	var lastActions = {};
	return function(next) {
		return function(action) {
			if ( action.type && action.meta && action.meta.$onlyChanges ) {
				var lastAction = lastActions[action.type];
				if ( !_.isEqual(lastAction, action) ) {
					lastActions[action.type] = action;
					return next(action);
				}
				return;
			}
			else return next(action);
		};
	};
};

module.exports = onlyChanges;
