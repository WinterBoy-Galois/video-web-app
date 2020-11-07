var env = require('../env'),
    Model = require('sdk/models/video_revision');

describe('SDK: Models: VideoRevision', function() {

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
                expect(m.get('title')).to.exist;
                expect(m.get('video')).to.exist;
                expect(m.markers.length).to.equal(4);
                expect(m.markers.first().contents.length).to.equal(1);

                done();
            });
        }, 'GET', /.*/, require('./json/video_revision-get'), 201);
    });

});