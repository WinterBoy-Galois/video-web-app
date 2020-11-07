var Backbone = require('backbone'),
    Env = require('helpers/environment_factory'),
    View = require('_old/controllers/support/views/view');

require('behaviors');


module.exports = describe('Controllers: Poster: View', function() {

    var root, model, view;

    beforeEach(function() {
        model = new Backbone.Model();
        root = Env.rootRegion();
        view = new View({
            model: model
        });
        root.show(view);
    });

    afterEach(function() {
        root.reset();
    });

    it('should be showable and run self test', function() {
        view.runSelfTest();
    });

    it('should react to model changes', function() {
        model.set({
            title: "title",
            subtitle: "subtitle"
        });
        expect(view.$("h1").text()).to.equal("title");
        expect(view.$("h4").text()).to.equal("subtitle");
    });

});