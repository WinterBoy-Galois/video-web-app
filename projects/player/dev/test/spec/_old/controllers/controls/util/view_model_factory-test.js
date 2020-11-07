var MF = require('helpers/environment_factory'),
    viewModelFactory = require('_old/controllers/controls/util/view_model_factory');


module.exports = describe('Controllers: Controls: Util: View Model Factory', function() {

    var model,
        state,
        video;

    beforeEach(function() {
        state = MF.playerState();
        video = MF.simpleVideo();
        model = viewModelFactory.create(state, video);
    });

    afterEach(function() {
        model.destroy();
        state.destroy();
    });


    describe('Init', function() {

        it('should exist', function() {
            expect(model).to.exist;
        });

        it('should have default variables', function() {
            expect(model.get("show_large_loading_indicator")).to.equal(false);
            expect(model.get("show_large_play_button")).to.equal(false);
        });

    });

    describe('State Changes', function() {

        it('should show loading indicator when buffering', function() {
            state.set({
                state: state.states.BUFFERING
            });
            expect(model.get("show_large_loading_indicator")).to.equal(true);
            expect(model.get("show_large_play_button")).to.equal(false);

        });

        it('should not show loading indicator when initializing', function() {
            state.set({
                state: state.states.INITIALIZING
            });
            expect(model.get("show_large_loading_indicator")).to.equal(false);
            expect(model.get("show_large_play_button")).to.equal(false);
        });

        it('should not show play button when marker is opened', function() {
            state.set({
                open_marker: false,
                state: state.states.PAUSED
            });
            expect(model.get("show_large_loading_indicator")).to.equal(false);
            expect(model.get("show_large_play_button")).to.equal(false);
        });

    });

    describe('Progress', function() {

        it('should update seconds string', function() {
            state.set({
                play_progress_seconds: 30
            });
            expect(model.get("play_progress_string")).to.equal("00:30");
        });

        it('should update progress', function() {
            state.set({
                play_progress: 0.5
            });
            expect(model.get("play_progress")).to.equal(0.5);
        });

    });

    describe('Other', function() {

        it('should update collapsed state to false', function() {
            state.set({
                controls_collapsed: false
            });
            expect(model.get("controls_collapsed")).to.equal(false);
        });

        it('should update collapsed state to true', function() {
            state.set({
                controls_collapsed: true
            });
            expect(model.get("controls_collapsed")).to.equal(true);
        });

        xit('should only show knob when on mobile', function() {

            expect(model.get("show_knob")).to.equal(false);
            state.set({
                platform: state.platforms.MOBILE
            });
            expect(model.get("show_knob")).to.equal(true);

        });
    });


});