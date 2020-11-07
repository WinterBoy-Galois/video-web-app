var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    Layout = require('_old/controllers/markers/views/layout');

require('behaviors');


module.exports = describe('Controllers: Markers: Views: Layout', function() {

    var root, layout, model;

    beforeEach(function() {
        root = EF.rootRegion();
        model = new Backbone.Model();
        layout = new Layout({
            model: model
        });
        root.show(layout);
    });

    afterEach(function() {
        layout.destroy();
    });

    it('should pass selftest', function() {
        layout.runSelfTest();
    });

    it('should have regions', function() {
        expect(layout.marker_collection).to.exist;
    });

});