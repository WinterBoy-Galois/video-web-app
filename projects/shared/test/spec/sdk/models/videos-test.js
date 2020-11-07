var env = require('../env'),
    Collection = require('sdk/models/videos');

describe('SDK: Models: Videos', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

    it("can be fetched", function(done) {
        env.server.fakeResponse(function() {
            var c = new Collection();
            c.fetch().then(function() {
                expect(c.length).to.equal(9);
                done();
            });
        }, 'GET', /.*/, require('./json/videos-get'), 201);
    });

});