var _ = require('underscore'),
	actions = require('../const').actions,
	update = require('react-addons-update');

var INIT = {
	path:['components'],
	urlVars: {}
};

/*
 * Path reducer
 */
function path(state, action) {
	if ( !state ) state = INIT;

	switch (action.type) {

		case actions.CHANGE_PATH:
			return update(state, {
				path: {$set:action.path},
				urlVars: {$set:(action.queryVars || {})}
			});

		case actions.CHANGE_CONTAINER_PROP:
			var change = {};
			change[action.key] = { $set:action.value};
			return update(state, {
				urlVars: change
			});

		case actions.SYNC_STATE:
			return update(state, {
				path: {$set:action.state.app.path},
				urlVars: {$set:action.state.app.urlVars}
			});
			return action.state.path;
	}

	return state;
};

module.exports = path;