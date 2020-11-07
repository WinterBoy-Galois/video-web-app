define([
    'backbone',
    'marionette',
    'radio',
    'behaviors'
], function(Backbone, Marionette, Radio) {

    describe('ProgressBar Behavior', function() {

        var view, model;

        beforeEach(function() {
            var vclass = Marionette.ItemView.extend({
                template: '<div> <div class="vp_progress"></div> </div>',
                behaviors: {
                    ProgressBar: {}
                }
            });
            view = new vclass();
            model = new Backbone.Model();
            view.model = model;
        });

        afterEach(function() {
            view.destroy();
        });

        it('renders a progressbar', function() {
            view.render();
            expect(view.$('.vp_progress_bar').length).to.equal(1);
        });

        it('changes progressbar width with total process progression', function() {
            view.render();
            var bar = view.$('.vp_progress_bar'),
                wrapper = view.$('.vp_progress');

            wrapper.width(100);

            expect(bar.width()).to.be.falsy;

            model.set({
                progress: {
                    current: 1,
                    total: 10
                }
            });

            expect(bar.width()).to.be.above(0);

            model.set({
                progress: {
                    current: 10,
                    total: 10
                }
            });

            expect(bar.width()).to.equal(wrapper.width());

            model.set({
                progress: {
                    current: 11,
                    total: 10
                }
            });

            expect(bar.width()).to.equal(wrapper.width());
        });

        it('treates current values that are bigger than total', function() {
            view.render();

            var wrapper = view.$('.vp_progress');

            expect(wrapper.hasClass('vp_progress_exceeded')).to.be.false;

            model.set({
                progress: {
                    current: 11,
                    total: 10
                }
            });

            expect(wrapper.hasClass('vp_progress_exceeded')).to.be.true;

            model.set({
                progress: {
                    current: 10,
                    total: 10
                }
            });

            expect(wrapper.hasClass('vp_progress_exceeded')).to.be.false;
        });

        it('can customize progress model attribute name', function() {
            var Class = Marionette.ItemView.extend({
                template: '<div> <div class="vp_progress"></div> </div>',
                behaviors: {
                    ProgressBar: {
                        modelField: 'customProgress'
                    }
                },
            });
            view = new Class({model: model});
            view.render();

            model.set({
                customProgress: {
                    current: 2,
                    total: 4
                }
            });

            expect(view.$('.vp_progress_bar').width()).to.be.above(0);
        });

    });
});
