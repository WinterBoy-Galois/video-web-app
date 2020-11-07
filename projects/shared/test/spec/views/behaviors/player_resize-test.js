define([
    'backbone',
    'marionette',
    'radio',
    'behaviors'
], function(Backbone, Marionette, Radio) {

    describe('Fading Behavior', function() {

        var view;

        beforeEach(function() {
            var vclass = Marionette.ItemView.extend({
                template: "<div> </div>",
                behaviors: {
                    PlayerResize: {}
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

    });
});