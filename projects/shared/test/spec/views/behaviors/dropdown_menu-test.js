define([
    'jquery',
    'backbone',
    'marionette',
    './dropdown_menu_template.html',
    'behaviors'
], function($, Backbone, Marionette, template) {

    describe('DropdownMenu Behavior', function() {

        var View = Marionette.ItemView.extend({
            template: template,
            behaviors: {
                DropdownMenu: {}
            }
        });

        var view;

        beforeEach(function() {
            view = new View().render();
        });

        afterEach(function() {
            view && view.destroy && view.destroy();
        });

        it('exists', function() {
            expect(view).to.exist;
        });

        it('send menu_click event with data attribute of clicked item', function() {
            var trigger = sinon.spy(view, 'trigger');

            view.$el.find('.test_item1 a').click();
            expect(trigger).to.be.calledWith('menu_click', 'item1');

            view.$el.find('.test_item2 a').click();
            expect(trigger).to.be.calledWith('menu_click', 'item2');
        });

    });

});

