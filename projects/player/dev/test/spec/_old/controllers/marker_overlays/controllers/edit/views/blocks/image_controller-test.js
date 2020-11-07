var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/marker_overlays/controllers/edit/blocks/image/controller');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Edit: Image: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            content: new Backbone.Model({

            })
        });
        layout.show(c.rootView);
        c.rootView.runSelfTest();
    });

    afterEach(function() {
        c.destroy();
    });

    it("should exist", function() {
        expect(c).to.exist;
    });

});