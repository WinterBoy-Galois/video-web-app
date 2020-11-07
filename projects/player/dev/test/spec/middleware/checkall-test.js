var _ = require('underscore'),

	middlewares = {
		analytics: require('middleware/analytics'),
		crashReporter: require('middleware/crashReporter'),
		decrypt: require('middleware/decrypt'),
		onlyChanges: require('middleware/onlyChanges'),
		playerjs: require('middleware/playerjs'),
		sharingAndLinks: require('middleware/sharingAndLinks'),
		throttleDebounce: require('middleware/throttleDebounce'),
	},

	mockAction = {
		type: 'some_action'
	},

	mockStore = {
		dispatch: function(){},
		getState: function() {return {}; }
	};

_.each(middlewares, function(middleware, name){

	describe('Middleware: ' + name, function() {

    	it('should let a regular action pass', function() {
    		var spy = sinon.spy();
    		middleware(mockStore)(spy)(mockAction);
    		expect(spy.called).to.be.true;
    	});

	});
});

