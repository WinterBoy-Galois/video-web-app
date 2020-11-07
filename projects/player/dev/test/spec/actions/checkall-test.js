var _ = require('underscore'),
	actions = require('actions');

_.each(actions, function(actionCreator, name){
	describe('Action: ' + name, function() {
    	it('should be creatable and have a type', function() {
    		var action = actionCreator();
        	expect(action.type).to.exist;
    	});
	});
});
