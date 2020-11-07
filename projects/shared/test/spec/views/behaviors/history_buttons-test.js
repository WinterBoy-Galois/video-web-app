define([
    'jquery',
    'backbone',
    'marionette',
    'behaviors'
], function($, Backbone, Marionette) {

    describe('HistoryButtons Behavior', function() {

        var View = Marionette.ItemView.extend({
            behaviors: {
                HistoryButtons: {}
            }
        });

        var view;

        afterEach(function() {
            view && view.destroy && view.destroy();
        });

        it('exists', function() {
            expect(new View()).to.exist;
        });

        it('gets back in history on back button click', function() {
            view = new (View.extend({
                template: '<div><a class="vp_history_back_button"></a></div>'
            }))();
            view.render();

            var back = sinon.stub(window.history, 'back');

            view.$el.find('.vp_history_back_button').click();
            expect(back).to.called;
        });

    });

});

