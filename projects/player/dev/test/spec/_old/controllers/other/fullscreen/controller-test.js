var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/other/fullscreen/controller');


module.exports = describe('Controllers: Fullscreen: Controller', function() {

    var c;
    beforeEach(function() {
        c = new Controller({
            playerState: EF.playerState()
        });
    });

    afterEach(function() {
        c.destroy();
    });

    it('should exist', function() {
        expect(c).to.exist;
    });

    describe('Events', function() {

    });

    describe('Commands', function() {

    });


});