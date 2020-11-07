var Backbone = require('backbone'),
    EF = require('helpers/environment_factory'),
    View = require('_old/controllers/markers/views/marker');

require('behaviors');


module.exports = describe('Controllers: Markers: Views: Marker', function() {

    var root, model, video, view;

    beforeEach(function() {
        video = EF.simpleVideo();
        model = new Backbone.Model();
        root = EF.rootRegion();
        view = new View({
            model: model,
            video: video
        });
        root.show(view);
        sinon.stub(view, "trigger");
    });

    afterEach(function() {});

    // skipped because bug in selftest behavior!
    it('should be showable', function() {
        expect(view.$el).to.exist;
        view.runSelfTest();
    });

    describe('Update with Model', function() {

        it('should react to opened', function() {
            expect(view.$el.hasClass("vp_opened")).to.equal(false);
            model.set({
                opened: true
            });
            expect(view.$el.hasClass("vp_opened")).to.equal(true);
        });

        it('should react to collapsed', function() {
            expect(view.$el.hasClass("vp_collapsed")).to.equal(false);
            model.set({
                collapsed: true
            });
            expect(view.$el.hasClass("vp_collapsed")).to.equal(true);
        });

        it('should react to current', function() {
            expect(view.$el.hasClass("vp_current")).to.equal(false);
            model.set({
                current: true
            });
            expect(view.$el.hasClass("vp_current")).to.equal(true);
        });

        it('should react to title', function() {
            model.set({
                title: "Hallo"
            });
            expect(view.$(".vp_title").text()).to.equal("Hallo");
        });

        it('should have react to temp title', function() {
            model.set({
                temp_title: "Hallo2"
            });
            expect(view.$(".vp_temp_title").text()).to.equal("Hallo2");
        });

    });

    describe('Events', function() {

        it('should emit click event with marker id', function() {
            model.set({
                id: 20
            });
            view.$el.trigger('click');
            expect(view.trigger).to.have.been.calledWith("click", 20);
        });

    });

});