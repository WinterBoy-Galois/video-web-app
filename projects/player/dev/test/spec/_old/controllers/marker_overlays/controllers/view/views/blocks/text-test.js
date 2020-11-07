var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    View = require('_old/controllers/marker_overlays/controllers/view/views/blocks/text');

require('behaviors');


module.exports = describe('Controllers: Marker Overlays: Views: Simple Button Block', function() {

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
            text: "<p>some text</p>"
        });
        expect(view.$el.html()).to.equal("<p>some text</p>");
    });

});