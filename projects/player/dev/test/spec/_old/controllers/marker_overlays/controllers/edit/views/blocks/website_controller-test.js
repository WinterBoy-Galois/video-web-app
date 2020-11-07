var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/marker_overlays/controllers/edit/blocks/website/controller');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Edit: Website: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            content: new Backbone.Model({
                url: "http://videopath.com"
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

    it("should have url prepopulated", function() {
        expect(c.rootView.$("input").val()).to.equal("http://videopath.com");
        // expect(c.rootView.$("iframe").attr("src")).to.equal("http://videopath.com");
    });

});