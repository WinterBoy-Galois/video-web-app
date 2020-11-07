var EF = require('helpers/environment_factory'),
    OverlayState = require('_old/controllers/marker_overlays/models/state'),
    Controller = require('_old/controllers/marker_overlays/controllers/edit/controller');

require('behaviors');
require('jquery_ui');


module.exports = describe('Controllers: Marker Overlays: Edit: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            marker: marker,
            overlayState: new OverlayState()
        });
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    it('should be showable', function() {
        expect(c).to.exist;
        expect(c.rootView).to.exist;
    });

    it('Should have the right number of edit blocks', function() {
        var blockCount = c.rootView.$(".vp_content_block_edit").length;
        expect(blockCount).to.not.equal(0);
        expect(blockCount).to.equal(marker.contents.length);
    });


});