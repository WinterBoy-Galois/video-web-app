var service = require('_old/services/analytics_service');


module.exports = describe('Services: AnalyticsService', function() {

    it('should exist', function() {
        expect(service).to.exist;
    });

    it('should not crash when executing functions', function() {
        service.trackEvent("Category", "Name", "Label");
        service.setVideoKey("Some Key");
        service.trackTiming("Category", "Identifier");
        service.trackPlaybackSecond(2, 30);
        service.setCustomGACode(1234);
    });

    describe('Connection to Analytics Service', function() {

        beforeEach(function() {
            sinon.spy(window, "ga");
        });

        it('should forward events to ga', function() {
            service.trackEvent("some cat", "some action", "some label");
            expect(window.ga).to.have.been.calledWith("send", "event", "some cat", "some action", "some label");
        });

        it('should forward setting key to ga', function() {
            service.setVideoKey("aabbcc");
            expect(window.ga).to.have.been.calledWith("set", "dimension1", "aabbcc");
        });

        it('should forward playback events to ga', function() {
            service.trackPlaybackSecond(10, 50);
            expect(window.ga).to.have.been.calledWith("set", "dimension3");
            service.trackPlaybackSecond(11, 50);
            expect(window.ga).to.have.been.calledWith("set", "dimension3");
            service.trackPlaybackSecond(10, 50);
            expect(window.ga).to.have.been.calledWith("set", "dimension4");
        });

        afterEach(function() {
            window.ga.restore();
        });
    });

});