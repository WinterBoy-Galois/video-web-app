var ACTIONS = require('const').ACTIONS,
	DEFAULT = require('const').DEFAULT_ENVIRONMENT;


var map = {};

map[ACTIONS.UPDATE_ENVIRONMENT] = function(state, action) {
	return {
		$merge: action.environment 
	};
};

map[ACTIONS.UPDATE_PLAYER_SIZE] = function(state, action) {
	return {
		playerWidth: { $set: action.width },
		playerHeight: { $set: action.height }
	};
};

map[ACTIONS.RESET] = function() {
	return {$merge: DEFAULT};
};


map['default'] = function() {
	return DEFAULT;
};

module.exports = map;