var EF = require('helpers/environment_factory'),
    OverlayState = require('_old/controllers/marker_overlays/models/state'),
    Controller = require('_old/controllers/marker_overlays/controllers/view/controller');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: View: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            marker: marker,
            overlayState: new OverlayState(),
            playerState: EF.playerState()
        });
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    it('should be showable', function(done) {
        expect(c).to.exist;
        expect(c.rootView).to.exist;
        // call later because of async scaleTitle call in the view
        setTimeout(done, 10);
    });

    it('should contain the right number of content blocks', function(done) {
        setTimeout(function() {
            var blockCount = c.rootView.$(".vp_content_block").length;

            expect(blockCount).to.not.equal(0);
            expect(blockCount).to.equal(marker.contents.length);
            expect(c.rootView.$(".vp_content_block").length).to.equal(4);
            expect(c.rootView.$(".vp_content_block_text").length).to.equal(1);
            expect(c.rootView.$(".vp_content_block_media").length).to.equal(1);
            expect(c.rootView.$(".vp_content_block_simple_button").length).to.equal(1);
            expect(c.rootView.$(".vp_content_block_image").length).to.equal(1);
            done();
        }, 120);

    });


});