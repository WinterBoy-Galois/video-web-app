var env = require('../env'),
    Model = require('sdk/models/user_subscription');

describe('SDK: Models: UserSubscription', function() {

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
        }, 'GET', /.*/, require('./json/user_subscription-get'), 201);
    });

});