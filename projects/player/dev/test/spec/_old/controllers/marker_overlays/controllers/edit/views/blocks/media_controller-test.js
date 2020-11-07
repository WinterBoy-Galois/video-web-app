var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/marker_overlays/controllers/edit/blocks/media/controller');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Edit: Media: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            content: new Backbone.Model({
                original_url: "videopath.com",
                service: "youtube",
                service_id: "123456789"
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

    it("should prepopulate values", function() {
        expect(c.rootView.$(".vp_media_url_input").val()).to.equal("videopath.com");
    });

});