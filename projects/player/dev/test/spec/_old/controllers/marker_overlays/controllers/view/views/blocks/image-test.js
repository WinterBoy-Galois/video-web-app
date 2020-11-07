var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    View = require('_old/controllers/marker_overlays/controllers/view/views/blocks/image');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Views: Image Block', function() {

    var model, view;

    beforeEach(function() {
        model = new Backbone.Model();
        view = new View({
            model: model
        });
        var rootRegion = Env.rootRegion();
        rootRegion.show(view);
    });

    afterEach(function() {
        view.destroy();
    });

    it('should exist', function() {
        expect(view).to.exist;
        view.runSelfTest();
    });

    it('should set text in main div', function() {
        model.set({
            image_url: "http://some_url",
            image_align: "center"
        });
        expect(view.$("img").attr("src")).to.equal("http://some_url");
        expect(view.$el.css("text-align")).to.equal("center");
    });

});