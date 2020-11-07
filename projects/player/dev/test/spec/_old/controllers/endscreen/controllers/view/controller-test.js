var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/endscreen/controllers/view/controller'),
    View = require('_old/controllers/endscreen/controllers/view/views/view'),
    ViewCustom = require('_old/controllers/endscreen/controllers/view/views/view_custom'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    CTAButtonWidget = require('widgets/cta_button/view');

require('behaviors');


module.exports = describe('Controllers: Endscreen: View: Controller', function() {

    var layout, player, c;

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

        it('builds a custom view if endscreen url is set and trigger its rewatch event', function() {
            player.video.set('endscreen_url', 'fufu');
            var customView = c.buildRootView();
            expect(customView).to.instanceOf(ViewCustom);

            customView.trigger('rewatch');
            expect(player.api.command).to.be.calledWith('replay');

            player.video.set('endscreen_url', null);
            expect(c.buildRootView()).to.be.instanceOf(View);
        });

        it('has views for share buttons and CTA', function() {
            expect(c.views.shareButtons).to.be.instanceOf(ShareButtonsWidget);
            expect(c.views.ctaButton).to.instanceOf(CTAButtonWidget);
        });

    });
});