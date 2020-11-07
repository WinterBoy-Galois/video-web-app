var Backbone = require('backbone'),
    MF = require('_old/controllers/marker_overlays/controllers/util/block_view_model_factory');


module.exports = describe('Controllers: MarkerOverlay: Blocks: Util: View Model Factory', function() {

    var model, vmodel;

    beforeEach(function() {
        model = new Backbone.Model();
        vmodel = MF.create(model);
    });

    afterEach(function() {});


    it('should exist', function() {
        expect(vmodel).to.exist;
    });

    it('should propagate regular vars', function() {
        model.set({
            text: "some text",
            url: "another url"
        });
        expect(vmodel.get("text")).to.equal("some text");
        expect(vmodel.get("url")).to.equal("another url");
    });

    it('should propagate data dict to vars', function() {
        var dict = {
            title: "data title",
            color: "data color",
            target_url: "data target_url",
            image_align: "data image_align",
            service: "data service",
            zoom: "data zoom",
            lat: "data lat",
            lng: "data lng",
        };
        model.set({
            data: JSON.stringify(dict),
        });
        expect(vmodel.get("title")).to.equal("data title");
        expect(vmodel.get("color")).to.equal("data color");
        expect(vmodel.get("target_url")).to.equal("data target_url");

        expect(vmodel.get("service")).to.equal("data service");
        expect(vmodel.get("image_align")).to.equal("data image_align");

        expect(vmodel.get("zoom")).to.equal("data zoom");
        expect(vmodel.get("lat")).to.equal("data lat");
        expect(vmodel.get("lng")).to.equal("data lng");
    });

    it('should be able to revert object', function() {
        vmodel.set({
            title: "data title",
            color: "data color",
            target_url: "data target_url",
            image_align: "data image_align",
            service: "data service",
            zoom: "data zoom",
            lat: "data lat",
            lng: "data lng",
            text: "some text",
            image_url: "image_url",
            url: "url"
        });
        MF.revert(model, vmodel);

        // test some data dict vars
        var results = JSON.parse(model.get("data"));
        expect(results.title).to.equal("data title");
        expect(results.color).to.equal("data color");
        expect(results.target_url).to.equal("data target_url");

        // test the regular vars
        expect(model.get("image_url")).to.equal("image_url");
        expect(model.get("url")).to.equal("url");
        expect(model.get("text")).to.equal("some text");
    });


});