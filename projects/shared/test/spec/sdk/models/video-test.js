var env = require('../env'),
    Model = require('sdk/models/video');

describe('SDK: Models: Video', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

    it("can be fetched", function(done) {
        env.server.fakeResponse(function() {
            var m = new Model();
            m.fetch().then(function() {

                // some assertions
                expect(m.get('key')).to.exist;
                expect(m.source).to.exist;
                expect(m.source.get('service')).to.equal('youtube');

                done();
            });
        }, 'GET', /.*/, require('./json/video-get'), 201);
    });

});