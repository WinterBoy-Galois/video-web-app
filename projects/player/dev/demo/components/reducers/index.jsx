var redux = require('redux'),

	config = {
		app: require('./app'),
		containers: require('./containers'),
	},

	app = redux.combineReducers(config);

module.exports = app;