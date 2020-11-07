var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    Arrow = require('_old/controllers/markers/views/info_arrow');

require('behaviors');


module.exports = describe('Controllers: Markers: Views: Info Arrow', function() {

    var root, arrow, model;

    beforeEach(function() {
        root = Env.rootRegion();
        model = new Backbone.Model();
        arrow = new Arrow({
            model: model
        });
        root.show(arrow);
    });

    afterEach(function() {
        arrow.destroy();
    });

    it('should pass selftest', function() {
        arrow.runSelfTest();
    });

    xit('should update offset', function() {
        model.set({
            offset: "20"
        });
        expect(arrow.$el.css("top")).to.equal("20%");
    });

});