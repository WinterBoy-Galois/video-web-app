var env = require('../env'),
    Model = require('sdk/models/user');

describe('SDK: Models: User', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

    it("can be fetched", function(done) {

        env.server.fakeResponse(function() {
            var u = new Model();
            u.fetch().then(function() {

                // some assertions
                expect(u).to.exist;
                expect(u.get('username')).to.equal('huesforalice');
                expect(u.plan.get('feature_vimeo')).to.be.true;
                expect(u.isLoggedIn()).to.be.true;

                done();
            });
        }, 'GET', /.*user\/me\//, require('./json/user-get'), 201);

    });

});