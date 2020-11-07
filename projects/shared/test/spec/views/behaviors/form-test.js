define([
    'jquery',
    'backbone',
    'marionette',
    'behaviors'
], function($, Backbone, Marionette) {

    describe('Form Behavior', function() {

        var View = Marionette.ItemView.extend({
            behaviors: {
                Form: {}
            }
        });

        var view;

        afterEach(function() {
            view && view.destroy && view.destroy();
        });


        it('exists', function() {
            expect(new View()).to.exist;
        });

        it('render maxlength indicator for input groups', function() {
            view = new (View.extend({
                template: '<div><div class="vp_input_group"><input type="text" maxlength="20"></div></div>'
            }))();
            view.render();

            var indicator = view.$el.find('.vp_maxlength_indicator');
            expect(indicator.length).to.equal(1);
            expect(indicator.text()).to.equal("20");

            view.$el.find('input').val("fufu").trigger('change');
            expect(indicator.text()).to.equal("16");
        });

        //skipped cause cannot trigger focus properly...
        it.skip('sets focus class on input groups', function() {
            view = new (View.extend({
                template: '<div><div class="vp_input_group"><input type="text"></div></div>'
            }))();
            view.render();

            var $inputGroup = view.$el.find('.vp_input_group'),
                $input = $inputGroup.find('input');

            expect($inputGroup.hasClass('vp_focus')).to.be.false;

            $input.focus();
            expect($inputGroup.hasClass('vp_focus')).to.be.true;

            $input.blur();
            expect($inputGroup.hasClass('vp_focus')).to.be.false;
        });

        it('sets submit behavior on input groups with button', function() {
            view = new (View.extend({
                template: '<div><div class="vp_input_group">' +
                            '<input type="text">' +
                            '<a href="" class="submit-button">button</a>' +
                            '</div></div>',
                behaviors: {
                    Form: {
                        inputGroupSubmit: ".submit-button",
                    }
                }
            }))();
            view.render();

            var $inputGroup = view.$el.find('.vp_input_group'),
                $input = $inputGroup.find('input'),
                $btn = $inputGroup.find('.submit-button');

            var listener = sinon.stub();
            view.on('submit', listener);

            $input.val('fufu');
            $btn.click();

            expect(listener).to.be.calledWith('fufu');

            $input.val('fofo');
            $input.trigger('change');

            expect(listener).to.be.calledWith('fofo');
        });

        it('resets invalid state on input focus and input keydown', function() {
            view = new (View.extend({
                template: '<div><div class="vp_form_group">' +
                            '<input type="text">' +
                            '</div></div>'
            }))();
            view.render();

            var $formGroup = view.$el.find('.vp_form_group'),
                $input = $formGroup.find('input');

            $formGroup.addClass('.vp_invalid');
            $input.trigger('focus');

            expect($formGroup.hasClass('vp_invalid')).to.be.false;

            $formGroup.addClass('.vp_invalid');
            $input.trigger('keyup');

            expect($formGroup.hasClass('vp_invalid')).to.be.false;
        });

    });
});
