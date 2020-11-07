var $ = require('jquery'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/marker_overlays/controller');

require('behaviors');
require('jquery_ui');


describe('Controllers: Marker Overlays: Controller', function () {

    var layout,
        c,
        playerState;

    beforeEach(function () {
        layout = EF.rootRegion();
        playerState = EF.playerState();
        c = new Controller({
            video: EF.simpleVideo(),
            playerState: playerState
        });
        layout.show(c.rootView);
    });

    afterEach(function () {
        c.destroy();
    });

    it('should be showable', function () {
        expect(c).to.exist;
        expect(c.rootView).to.exist;
    });

    it('should not crash on bogus marker id', function () {
        c.showOverlay(5);
    });

    it('should show marker overlay in view mode', function (done) {
        c.showOverlay(50);

        setTimeout(function () {
            expect(c.rootView.$(".vp_content_block").length).to.equal(2);
            done();
        }, 105);
    });

    it('should show marker overlay in edit mode', function () {
        playerState.set({
            mode: playerState.modes.BUILDER
        });
        c.showOverlay(50);
        expect(c.rootView.$(".vp_content_block_edit").length).to.equal(2);
    });

    it('should show website overlay', function (done) {
        c.showOverlay(30);
        setTimeout(function () {
            expect(c.rootView.$(".vp_marker_overlay_website").length).to.equal(1);
            done();
        }, 105);
    });

});
