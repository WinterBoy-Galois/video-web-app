var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/controls/controller');

require('behaviors');


module.exports = describe('Controllers: Controls: Controller', function() {

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

    describe('View Events', function() {

        describe('SmallButtons', function() {

            it('should have small buttons', function() {
                expect(c.rootView.$(".vp_small_button").length).to.equal(5);
            });

            it('should emit fullscreen button clicks', function() {
                c.rootView.$(".vp_fullscreen_button").click();
                expect(player.api.command).to.have.been.calledWith("toggle_fullscreen");
            });

            it('should toggle volume', function() {
                c.rootView.$(".vp_mute_button").trigger('click');
                expect(player.api.command).to.have.been.calledWith("toggle_volume");
            });

            it('should emit play button clicks', function() {
                c.rootView.$(".vp_playbutton").trigger('click');
                expect(player.api.command).to.have.been.calledWith("toggle_play");
            });

        });

        describe('LargeButtons', function() {
            it('should have large buttons', function() {
                expect(c.rootView.$(".vp_large_play_button").length).to.equal(1);
                expect(c.rootView.$(".vp_large_loading_indicator").length).to.equal(1);
            });

            it('should emit large button clicks', function() {
                c.views.largeButtonsView.trigger('clicked');
                expect(player.api.command).to.have.been.calledWith("toggle_play");
            });

        });

        describe('Playbar', function() {

            it('should have indicators', function() {
                var modelCount = player.video.markers.length;
                var domCount = c.rootView.$(".vp_indicator").length;
                expect(modelCount).to.equal(domCount);
            });

            it('should have play bar elements', function() {
                var domCount = c.rootView.$(".vp_bar").length;
                expect(domCount).to.equal(1);
            });

            it('should emit playbar updates button clicks', function() {
                c.rootView.$(".vp_capture_mouse").trigger("mouseup");
                expect(player.api.command).to.have.been.calledWith("play_progress");
            });

            it('updates the progress bar by dragging', function() {
                expect(c.viewModel.get('play_progress_dragged')).to.not.be.defined;

                c.views.playbarView.trigger('progress_dragged', "value");
                expect(c.viewModel.get('play_progress_dragged')).to.equal("value");

                c.views.playbarView.trigger('progress_drag_ended');
                expect(c.viewModel.get('play_progress_dragged')).to.not.be.defined;
            });

        });

    });

});