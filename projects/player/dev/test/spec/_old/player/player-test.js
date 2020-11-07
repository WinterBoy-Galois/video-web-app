var EF = require('helpers/environment_factory'),
    Player = require('_old/player/player'),
    PlayerState = require('_old/player/models/playerstate'),
    Video = require('sdk/models/video_revision');


module.exports = describe('Player: Api: Player', function() {

    var state,
        engineChannel = EF.playerEngineChannel();

    beforeEach(function() {
        state = new PlayerState();
        Player.setup(EF.simpleVideo(), state);
    });

    afterEach(function() {
        state.destroy();
        EF.playerEngineReset();
    });

    describe("Engine States", function() {

        it('should change to be in init state', function() {
            expect(state.get("state")).to.equal(state.states.INITIALIZING);
        });

        it('should change to ready state', function() {
            engineChannel.trigger("ready", {});
            expect(state.get("state")).to.equal(state.states.READY);
        });

        it('should change to playing state', function() {
            engineChannel.trigger("playing");
            expect(state.get("state")).to.equal(state.states.PLAYING);
        });

        it('should change to paused state', function() {
            engineChannel.trigger("paused");
            expect(state.get("state")).to.equal(state.states.PAUSED);
        });

        it('should change to buffering state', function() {
            engineChannel.trigger("buffering");
            expect(state.get("state")).to.equal(state.states.BUFFERING);
        });

        it('should save play progress', function() {
            engineChannel.trigger("play_progress", 0.5);
            expect(state.get("play_progress")).to.equal(0.5);
        });

        it('should save buffer progress', function() {
            engineChannel.trigger("buffer_progress", 0.5);
            expect(state.get("buffer_progress")).to.equal(0.5);
        });

        it('should calculate progress from duration', function(done) {
            state.set({
                duration: 30
            });

            engineChannel.trigger("play_progress", 0.5);

            setTimeout(function() {
                expect(state.get("play_progress_seconds")).to.equal(15);
                done();
            }, 300);
        });

        it('should calculate progress from duration with empty video', function(done) {
            Player.setup(new Video(), state);
            state.set({
                duration: 30
            });

            engineChannel.trigger("play_progress", 0.5);

            setTimeout(function() {
                expect(state.get("play_progress_seconds")).to.equal(15);
                done();
            }, 300);
        });

        it('should save volume', function() {
            engineChannel.trigger("volume_change", 0.5);
            expect(state.get("volume")).to.equal(0.5);
        });

        describe('Engine end event', function() {

            it('should change to ended state', function() {
                engineChannel.trigger("ended");
                expect(state.get("state")).to.equal(state.states.ENDED);
            });

            it('should show endscreen at end when in play mode', function() {
                engineChannel.trigger("ended");
                expect(state.get('endscreen_showing')).to.be.true;
            });

            it('should show endscreen at end when in preview mode', function() {
                state.set({
                    mode: state.modes.PREVIEW
                });
                engineChannel.trigger("ended");
                expect(state.get('endscreen_showing')).to.be.true;
            });

            it('should not show endscreen at end when in builder mode', function() {
                state.set({
                    mode: state.modes.BUILDER
                });
                engineChannel.trigger("ended");
                expect(state.get('endscreen_showing')).to.be.falsy;
            });

        });

    });


    describe('Player actions', function() {

        describe('togglePlay', function() {

            it('should not to react when in INITIALIZING state', function() {
                Player.togglePlay();
                expect(engineChannel.command).to.not.have.been.called;
            });

            it('should play when in PAUSED state', function() {
                state.set({
                    state: state.states.PAUSED
                });
                Player.togglePlay();
                expect(engineChannel.command).to.have.been.calledWith("play");
            });

            it('should pause when in PLAYING state', function() {
                state.set({
                    state: state.states.PLAYING
                });
                Player.togglePlay();
                expect(engineChannel.command).to.have.been.calledWith("pause");
            });

        });

        describe('replay', function() {

            it('should replay after endscreen hides', function() {
                state.set('endscreen_showing', true);
                Player.replay();
                expect(engineChannel.command).to.have.been.calledWith("set_play_progress", 0);
                expect(engineChannel.command).to.have.been.calledWith("play");
                expect(state.get('endscreen_showing')).to.be.false;
            });

        });

        // marker overlays events
        describe('Marker Overlays Events', function() {

            it('should pause on overlay show', function() {
                Player.showMarkerContent(5);
                expect(engineChannel.command).to.have.been.calledWith("pause");
            });

            it('should resume play if paused before overlay was presented', function() {
                state.set({
                    state: state.states.PLAYING
                });
                Player.showMarkerContent(5);
                Player.hideMarkerContent();
                expect(engineChannel.command).to.have.been.calledWith("play");
            });

        });

        describe('Control functions', function() {

            it('should toggle volume', function() {
                Player.toggleVolume();
                expect(engineChannel.command).to.have.been.calledWith("set_volume");
            });

            it('should toggle fullscreen', function() {
                expect(state.get('is_fullscreen')).to.be.false;
                Player.toggleFullscreen();
                expect(state.get('is_fullscreen')).to.be.true;
                Player.toggleFullscreen();
                expect(state.get('is_fullscreen')).to.be.false;
            });

            it('should set play progress', function() {
                Player.setPlayProgress(5);
                expect(engineChannel.command).to.have.been.calledWith("set_play_progress", 5);
            });

        });

        describe("collapseControls", function() {

            it('should not collapse controls on time out if not playing', function() {
                Player.collapseControls();
                expect(state.get("controls_collapsed")).to.equal(false);
            });

            it('should collapse controls on time out if playing', function() {
                state.set({
                    state: state.states.PLAYING
                });
                Player.collapseControls();
                expect(state.get("controls_collapsed")).to.equal(true);
            });

        });

    });

});