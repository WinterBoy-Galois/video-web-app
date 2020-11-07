var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/endscreen/controller');

require('behaviors');


module.exports = describe('Controllers: Endscreen: Controller', function() {

    var layout, c, player;

    beforeEach(function() {

        // create and show controller
        layout = EF.rootRegion();
        player = EF.simplePlayerApi();
        c = new Controller(player);
        layout.show(c.rootView);

    });

    afterEach(function() {
        c.destroy();
        player.api.command.reset();
    });

    it('should show endscreen', function() {
        sinon.stub(c.rootView, 'showEndscreen');

        player.playerState.set('endscreen_showing', true);
        expect(c.rootView.showEndscreen).to.be.called;
    });

    it('should hide endscreen', function() {
        sinon.stub(c.rootView, 'hideEndscreen');

        player.playerState.set('endscreen_showing', true);
        player.playerState.set('endscreen_showing', false);
        expect(c.rootView.hideEndscreen).to.be.called;
    });

    it('forwards view background click', function() {
        c.rootView.$el.click();
        expect(player.api.command).to.have.been.calledWith("replay");
    });
});