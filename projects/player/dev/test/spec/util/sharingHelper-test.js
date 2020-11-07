var sharingHelper = require('util/sharingHelper');

describe('Util: Color Calculator', function() {

   	it('should be loadable and exist', function() {
        expect(sharingHelper).to.exist;
        expect(sharingHelper.share).to.exist;
    });

});