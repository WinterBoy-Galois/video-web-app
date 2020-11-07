var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/main');


module.exports = describe('Controllers: Player: Controller', function() {

    var layout, c, player, engine;

    beforeEach(function() {
        layout = EF.rootRegion();
        player = EF.simplePlayerApi();
        engine = {
            rootView: EF.simpleView()
        };
        c = new Controller({
            player: player,
            engine: engine
        });
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    it('should be showable', function() {
        expect(c).to.exist;
    });

    it('should contain controllers', function() {
        expect(c.controllers.fullscreenController).to.exist;
        expect(c.controllers.styleController).to.exist;
        expect(c.controllers.apiController).to.exist;
        expect(c.controllers.controlsController).to.exist;
        expect(c.controllers.markerOverlaysController).to.exist;
        expect(c.controllers.endscreenController).to.exist;
        //expect(c.controllers.posterController).to.exist;
        expect(c.controllers.markersController).to.exist;
        expect(c.controllers.supportController).to.exist;
    });

    it('should have general properties', function() {
        expect(c.player).to.equal(player);
        expect(c.engine).to.equal(engine);
    });

    describe('setupControlsCollapsing', function(done) {
        // TODO: skipped because of build server, check and reenable
        it.skip('should uncollapse controls on interaction event', function() {
            c.rootView.trigger('interact', 23);

            // interactions are throttled
            setTimeout(function() {
                expect(player.api.command).to.be.calledWith('show_controls');
                done();
            }, 70);
        });
    });

});