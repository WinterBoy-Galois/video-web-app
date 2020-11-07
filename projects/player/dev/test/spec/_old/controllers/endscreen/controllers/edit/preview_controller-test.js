var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/endscreen/controllers/edit/preview_controller');

require('behaviors');


module.exports = describe('Controllers: Endscreen: Edit: PreviewController', function() {

    var layout, c, player;

    beforeEach(function() {
        layout = EF.rootRegion();
        player = EF.simplePlayerApi();
        c = new Controller(player);
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
        EF.playerApiReset();
    });

    describe('Views', function() {
        it('has an edit view', function() {
            expect(c.views.editView.$el).to.exist;
        });
    });

    describe('Events', function() {
        it('closes endscreen on done click', function() {
            c.rootView.trigger('done_button_clicked');
            expect(player.api.command).to.be.calledWith('hide_endscreen');
        });

        it('toggles preview on preview button click', function() {
            c.editState.set('state', c.editState.states.EDIT);

            c.rootView.trigger('preview_button_clicked');

            expect(c.editState.get('state')).to.equal(c.editState.states.PREVIEW);
            expect(c.rootView.previewRegion.currentView).to.exist;

            c.rootView.trigger('preview_button_clicked');

            expect(c.editState.get('state')).to.equal(c.editState.states.EDIT);
            expect(c.rootView.previewRegion.currentView).not.to.exist;
        });

        it('can open Preview', function() {
            c.openPreview();

            expect(c.editState.get('state')).to.equal(c.editState.states.PREVIEW);
            expect(c.rootView.previewRegion.currentView).to.exist;
        });

        it('can hide Preview', function() {
            c.hidePreview();

            expect(c.editState.get('state')).to.equal(c.editState.states.EDIT);
            expect(c.rootView.previewRegion.currentView).not.to.exist;
        });
    });
});