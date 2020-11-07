var fullscreenHelper = require('util/fullscreenHelper');


describe('Util: Color Calculator', function() {

    it('should be loadable and exist', function() {
        expect(fullscreenHelper).to.exist;
        expect(fullscreenHelper.supportsFullscreen).to.exist;
        expect(fullscreenHelper.showFullscreen).to.exist;
        expect(fullscreenHelper.hideFullscreen).to.exist;
    });

});