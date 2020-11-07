var config = require('config'),
    Radio = require('radio'),
    EF = require('helpers/environment_factory'),
    Analytics = require('_old/player/analytics');


module.exports = describe('Player: Analytics', function() {

    var state, video,
        serviceMock = {
            trackEvent: sinon.stub(),
            setVideoKey: sinon.stub(),
            trackTiming: sinon.stub(),
            trackPlaybackSecond: sinon.stub(),
            setCustomGACode: sinon.stub()
        },
        builderMock = {
            trackPage: sinon.stub(),
            trackEvent: sinon.stub()
        },
        builderChannel = Radio.channel(config.channels.builder);


    beforeEach(function() {
        state = EF.playerState();
        video = EF.simpleVideo();
        Analytics.setup(video, state, serviceMock);
    });

    afterEach(function() {
        Analytics.channel.off();

        for (var key in serviceMock) {
            serviceMock[key].reset();
        }
    });

    describe('builder and preview mode', function() {

        it('should not execute when in builder or preview mode', function() {
            state.set({
                mode: state.modes.BUILDER
            });
            Analytics.channel.trigger("player_playing");
            expect(serviceMock.trackEvent).to.not.have.been.called;

            state.set({
                mode: state.modes.PREVIEW
            });
            Analytics.channel.trigger("player_playing");
            expect(serviceMock.trackEvent).to.not.have.been.called;
        });
    });


    describe('PlayerState changes', function() {

        it('should track ready event', function() {
            state.set('state', state.states.READY);
            expect(serviceMock.trackEvent).to.have.been.called.once;
        });

        it('should track play event', function() {
            state.set('state', state.states.PLAYING);
            expect(serviceMock.trackEvent).to.have.been.calledWith("user actions", "play").once;
        });

        it('should track pause event', function() {
            state.set('state', state.states.PAUSED);
            expect(serviceMock.trackEvent).to.have.been.called.once;
        });

        it('should track ended event', function() {
            state.set('state', state.states.ENDED);
            expect(serviceMock.trackEvent).to.have.been.called.once;
        });

        it('should track player progress', function() {
            state.set({
                duration: 100,
                play_progress_seconds: 30
            });
            expect(serviceMock.trackPlaybackSecond).to.have.been.calledWith(30, 100).once;
        });

    });


    describe('Player Events', function() {

        it('should track init event', function() {
            Analytics.channel.trigger("player_init");
            expect(serviceMock.trackEvent).to.have.been.called.once;
            expect(serviceMock.setVideoKey).to.have.been.called.once;
        });

        it('should track overlay cta button clicks', function() {
            Analytics.channel.trigger("overlay_click_cta_button");
            expect(serviceMock.trackEvent).to.have.been.called.once;
        });

    });

    describe('Overlay Events', function() {

        it('should track show overlay event', function() {
            var marker = EF.simpleMarker();
            marker.set({
                id: 123,
                key: 'test_key'
            });

            state.set('open_marker', 666);
            expect(serviceMock.trackEvent).to.have.not.been.called.once;

            video.markers.add(marker);
            state.set('open_marker', 123);
            expect(serviceMock.trackEvent).to.have.been.calledWith('user actions', 'show overlay', 'test_key').once;
        });

        it('should track hide overlay event', function() {
            state.set('open_marker', 0);
            state.set('open_marker', -1);

            expect(serviceMock.trackEvent).to.have.been.called.once;
        });

    });

});