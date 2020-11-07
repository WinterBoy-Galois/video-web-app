var env = require('../env'),
    Model = require('sdk/models/_singleton_model');

describe('SDK: Models: SingletonModel', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

    it("always puts, never posts", function(done) {
        var m = new Model();
        m.url = '/some_url';
        env.server.fakeResponse(function() {
            m.save().then(function() {
                done();
            });
        }, 'PUT');
    });

});