var Radio = require('radio'),
    EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/endscreen/controllers/edit/edit_controller'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    CTAButtonWidget = require('widgets/cta_button/view');

require('behaviors');
require('jquery_ui');


describe('Controllers: Endscreen: Edit: EditController', function() {

    var layout, player, video, c;

    beforeEach(function() {
        player = EF.simplePlayerApi();
        video = player.video;
        layout = EF.rootRegion();
        c = new Controller(player);
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    describe('Views', function() {
        it('has views for share buttons and CTA', function() {
            expect(c.views.shareButtons).to.be.instanceOf(ShareButtonsWidget);
            expect(c.views.ctaButton).to.instanceOf(CTAButtonWidget);
        });

    });

    describe('Events', function() {
        it('changes title, subtitle and color of the endscreen on view-events', function() {
            c.rootView.trigger('change_title', 'new_title');
            c.rootView.trigger('change_subtitle', 'new_subtitle');

            expect(video.get('endscreen_title')).to.equal('new_title');
            expect(video.get('endscreen_subtitle')).to.equal('new_subtitle');
        });

        it('changes color if feature color is set', function() {
            video.set('endscreen_background_color', 'old_color');

            c.featureColor = true;
            c.rootView.trigger('change_background_color', 'new_color');
            expect(video.get('endscreen_background_color')).to.equal('new_color');
        });

        it('opens a modal for button editing', function() {
            var modalService = {
                    showModalController: sinon.stub()
                },
                apiChannel = {
                    request: sinon.stub()
                };

        });
    });
});