var redux = require('redux'),

	// reducers
	reducers = require('reducers');
	

var middleWares = redux.applyMiddleware.apply(undefined, [
	require('middleware/crashReporter'),
	require('middleware/throttleDebounce'),
	require('middleware/onlyChanges'),
	require('middleware/playerjs'),
	require('middleware/analytics'),
	require('middleware/sharingAndLinks'),
	require('middleware/decrypt'),
	require('middleware/integrations'),
	require('middleware/analyticsTests')
	]);


function create() {
	return redux.createStore(reducers,middleWares);
};

module.exports = {
	create:create
};