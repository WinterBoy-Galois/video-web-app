var env = require('../env'),
    Model = require('sdk/models/user_address');

describe('SDK: Models: UserAddress', function() {

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
                done();
            });
        }, 'GET', /.*/, require('./json/user_address-get'), 201);
    });

});