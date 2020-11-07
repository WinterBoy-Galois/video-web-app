var config = require('config');


module.exports = describe('Config: Config', function() {

    it('should have a bunch of settings', function() {

        expect(config).to.exist;
        expect(config.queryParams).to.exist;

        expect(config.channels).to.exist;

        expect(config.revisionURL).to.exist;

        expect(config.jpgEndpoint).to.exist;
        expect(config.shareBaseURL).to.exist;
    });

});