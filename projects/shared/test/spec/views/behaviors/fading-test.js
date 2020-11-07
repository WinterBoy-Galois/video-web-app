define([
    'backbone',
    'marionette',
    'behaviors'
], function(Backbone, Marionette) {

    describe('Fading Behavior', function() {

        var view;

        beforeEach(function() {
            var vclass = Marionette.ItemView.extend({
                template: "<div> </div>",
                behaviors: {
                    Fading: {}
                }
            });
            view = new vclass();
        });

        afterEach(function() {
            view.destroy();
        });


        it('exists', function() {
            expect(view).to.exist;
        });

        it('should fade out', function() {
            view.render();
            view.fadeOut();
            expect(view.$el.hasClass("vp_hidden")).to.equal(true)
        });

        it('should fade in', function() {
            view.render();
            view.fadeIn();
            expect(view.$el.hasClass("vp_hidden")).to.equal(false)
        });

    });
});