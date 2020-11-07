var reducers = require('reducers');

describe('Reducers: Setup', function() {

    it('should build default state', function() {
        var defaultState = reducers(false, {});
        expect(defaultState.videoRevision).to.exist;
        expect(defaultState.playerState).to.exist;
        expect(defaultState.environment).to.exist;
        expect(defaultState.engineCommands).to.exist;
        expect(defaultState.theme).to.exist;
    });

});