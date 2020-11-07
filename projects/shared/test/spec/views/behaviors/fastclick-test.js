define([
    'jquery',
    'marionette',
    'behaviors'
], function($, Marionette) {

    describe('FastClick Behavior', function() {

        var View = Marionette.ItemView.extend({
            behaviors: {
                FastClick: {}
            }
        });

        var view,
            createTestView = function() {
                view = new (View.extend({
                    template: '<div><p class="bar">asdf</p></div>',
                    events: {
                        'something .foo': 'lala',
                        'click .bar': 'fufu',
                        'click': 'gaga'
                    }
                }))();
            };

        afterEach(function() {
            view && view.destroy && view.destroy();
        });

        it('exists', function() {
            expect(new View()).to.exist;
        });

        it('adds a touchevent for each click in the view', function() {
            createTestView();
            expect(view.events['touchstart']).to.exist;
            expect(view.events['touchstart .bar']).to.exist;
            expect(view.events['touchend']).to.exist;
            expect(view.events['touchend .bar']).to.exist;
        });

        it('forewards touchend events to click', function() {
            view = new (View.extend({
                events: {
                    'click': 'gaga'
                },
                gaga: sinon.stub()
            }))();

            view.$el.trigger('touchend');
            expect(view.gaga).to.be.called;
        });

        it('adds a custom_touch class to root and click elements', function() {
            createTestView();
            view.render();
            expect(view.$el.hasClass('vp_custom_touch')).to.be.true;
            expect(view.$el.find('.bar').hasClass('vp_custom_touch')).to.be.true;
        });
    });
});
