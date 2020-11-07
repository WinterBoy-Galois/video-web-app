var MF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/other/style/controller');


module.exports = describe('Controllers: Style: Controller', function() {


    beforeEach(function() {

    });

    afterEach(function() {

    });

    it('should be instantiable', function() {
        var config = {
            playerState: MF.playerState(),
            video: MF.simpleVideo()
        };
        c = new Controller(config);
        expect(c).to.exist;
        c.destroy();
    });

    describe("integration tests", function() {

        it('should be able to color components', function() {

        });

    });


});