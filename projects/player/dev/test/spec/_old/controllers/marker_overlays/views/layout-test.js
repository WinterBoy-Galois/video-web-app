var Env = require('helpers/environment_factory'),
    OverlayState = require('_old/controllers/marker_overlays/models/state'),
    Layout = require('_old/controllers/marker_overlays/views/layout');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Views: Layout', function() {

    var root;

    beforeEach(function() {
        root = Env.rootRegion();
    });

    it('should be showable', function() {
        var layout = new Layout({
            model: new OverlayState()
        });
        root.show(layout);
        layout.runSelfTest();
    });

});