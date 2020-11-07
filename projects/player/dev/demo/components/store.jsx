var redux = require('redux'),

	// reducers
	reducers = require('./reducers'),

	// middleware
	logger = require('./middleware/logger'),
	hash = require('./middleware/hash'),
	sync = require('./middleware/sync');


var store = redux.createStore(reducers,redux.applyMiddleware(logger, hash, sync));

module.exports = store;