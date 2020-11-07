var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    View = require('_old/controllers/marker_overlays/controllers/view/views/blocks/media');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Views: Media Block', function() {

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

    it('should not crash on bogus values', function() {
        model.set({
            service: "hogus",
            service_id: "bogus"
        });
    });

    it('should render youtube template', function() {
        model.set({
            service: "youtube",
            service_id: "123456"
        });
        expect(view.$el.html()).to.contain("123456");
        expect(view.$el.html()).to.contain("youtube");
    });

    it('should render vimeo template', function() {
        model.set({
            service: "vimeo",
            service_id: "123456"
        });
        expect(view.$el.html()).to.contain("123456");
        expect(view.$el.html()).to.contain("vimeo");
    });

    it('should render soundcloud template', function() {
        model.set({
            service: "soundcloud",
            service_id: "artist/song"
        });
        expect(view.$el.html()).to.contain("artist/song");
        expect(view.$el.html()).to.contain("soundcloud");
    });


});