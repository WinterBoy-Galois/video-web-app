var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/marker_overlays/controllers/edit/blocks/simple_button/controller');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Edit: Simple Button: Controller', function() {

    var layout,
        c,
        marker;

    beforeEach(function() {
        layout = EF.rootRegion();
        marker = EF.simpleMarker();
        c = new Controller({
            content: new Backbone.Model({
                color: "green",
                title: "mybutton",
                target_url: "videopath.com"
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

    it("should prepulate values", function() {

        // right color swatch selected
        expect(c.rootView.$(".green").hasClass("selected")).to.be.truthy;

        // title populated
        expect(c.rootView.$(".vp_input_wrapper_title input").val()).to.equal("mybutton");

        // url populated
        expect(c.rootView.$(".vp_input_wrapper_url input").val()).to.equal("videopath.com");
    });

});