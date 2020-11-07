var EF = require('helpers/environment_factory'),
    View = require('_old/controllers/endscreen/controllers/edit/views/edit_layout');

require('behaviors');


module.exports = describe('Controllers: Endscreen: Edit: EditLayout', function() {

    var root, model, view;

    beforeEach(function() {
        root = EF.rootRegion();
        model = EF.emptyModel();
        view = new View({
            model: model
        });
        root.show(view);
    });

    afterEach(function() {
        model.clear();
        view.destroy();
    });

    it('should be showable', function() {
        expect(view.$el).to.exist;
        view.runSelfTest();
    });

    it('forwards done and preview button clicks', function() {
        var trigger = sinon.stub(view, 'trigger');

        view.$('.vp_preview_button').click();
        expect(trigger).to.be.calledWith('preview_button_clicked');

        view.$('.vp_done_button').click();
        expect(trigger).to.be.calledWith('done_button_clicked');
    });
});