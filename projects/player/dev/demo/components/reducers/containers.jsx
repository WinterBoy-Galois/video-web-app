var _ = require('underscore'),
	actions = require('../const').actions,
	update = require('react-addons-update');

var INIT = {
	playerState: _.mapObject(require('../config/playerStateOptions'), function(item){return item[0];}),
	environment: _.mapObject(require('../config/environmentOptions'), function(item){return item[0];})
};

function containers(state, action) {

	if (!state) state = INIT;

	switch (action.type) {

		case actions.CHANGE_ENVIRONMENT_PROP:
			var change = {};
			change[action.key] = { $set:action.value};
			return update(state, {
				environment: change
			});


		case actions.CHANGE_PLAYERSTATE_PROP:
			var change = {};
			change[action.key] = { $set:action.value };
			return update(state, {
				playerState: change
			});


		case actions.SYNC_STATE:
			return action.state.containers;
	}

	return state;


};

module.exports = containers;