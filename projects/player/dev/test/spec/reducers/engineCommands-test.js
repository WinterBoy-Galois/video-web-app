var reducers = require('reducers'),
	actions = require('actions');

var defaultState = reducers(false, {});

describe('Reducers: Engine Commands', function() {

    it('Play', function() {
    	var defaultState = reducers(false, {});
        var state = reducers(defaultState,actions.play());
        expect(state.engineCommands[0].action).to.equal('play');
    });

    it('Pause', function() {
    	var defaultState = reducers(false, {});
        var state = reducers(defaultState,actions.pause());
        expect(state.engineCommands[0].action).to.equal('pause');
    });

    it('Replay', function() {
    	var defaultState = reducers(false, {});
        var state = reducers(defaultState,actions.replay());
        expect(state.engineCommands[0].action).to.equal('setProgress');
        expect(state.engineCommands[0].value).to.equal(0);
    });

});