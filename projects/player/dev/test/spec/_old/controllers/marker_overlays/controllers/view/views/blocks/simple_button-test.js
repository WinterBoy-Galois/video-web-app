var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    View = require('_old/controllers/marker_overlays/controllers/view/views/blocks/simple_button');

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

    it('should render a CTAButtonWidget', function() {
        expect(view.ctaButton).to.be.instanceOf(CTAButtonWidget);
    });
});