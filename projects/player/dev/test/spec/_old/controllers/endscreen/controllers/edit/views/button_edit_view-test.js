var Backbone = require('backbone'),
    $ = require('jquery'),
    View = require('_old/controllers/endscreen/controllers/edit/views/button_edit_view');

require('behaviors');


describe('Controllers: Endscreen: Edit: EditButtonView', function() {

    var view, model;

    beforeEach(function() {
        model = new Backbone.Model();
        view = new View({
            model: model
        });
        view.render();
        sinon.stub(view, 'trigger');
    });

    it('should be showable', function() {
        expect(view.$el).to.exist;
    });

    it('sets color text and target of button and input', function() {
        model.set({
            'color': '#f00',
            'label': 'title',
            'action': 'target'
        });

        expect(view.$el.find('.vp_button_text').val()).to.equal('title');
        expect(view.$el.find('.vp_button_target').val()).to.equal('target');
        expect(view.$el.find('.vp_button_color_text').val()).to.equal('#f00');
    });

    it('label input triggers label change', function() {
        var textInput = view.$el.find('.vp_button_text');
        textInput.val('new label');
        textInput.trigger('change');

        expect(view.trigger).to.be.calledWith('change_label', 'new label');
    });

    it('target input triggers action change', function() {

        var textInput = view.$el.find('.vp_button_target');
        textInput.val('videopath.de');
        textInput.trigger('change');

        expect(view.trigger).to.be.calledWith('change_action', 'videopath.de');
    });

    it('color input triggers color change when featureColor is true', function() {
        var textInput = view.$el.find('.vp_button_color_text');
        textInput.val('#f90');
        textInput.trigger('change');

        expect(view.trigger).to.not.be.calledWith('change_color', '#ff9900');

        view.featureColor = true;
        view.initializeLocal($);
        textInput.trigger('change');

        expect(view.trigger).to.be.calledWith('change_color', '#ff9900');
    });

    it('colorChooser triggers color change', function() {
        view.featureColor = true;
        view.initializeLocal($);

        var textInput = view.colorChooser.spectrum('set', '#09f');
        view.saveColor();

        expect(view.trigger).to.be.calledWith('change_color', '#0099ff');
    });
});