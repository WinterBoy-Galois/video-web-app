var env = require('../env'),
    Collection = require('sdk/models/_collection');

var collection_get = {
    results: [{
        "val1": "1",
        "val2": 2,
        "id": 123,
    }, {
        "val1": "1",
        "val2": 2,
        "id": 124,
    }, {
        "val1": "1",
        "val2": 2,
        "id": 125,
    }]
};

describe('SDK: Models: Collection', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

    it("can be fetched", function(done) {

        var c = new Collection();
        c.url = "some_url";

        env.server.fakeResponse(function() {
            c.fetch().then(function() {
                expect(c.length).to.equal(3);
                done();
            });
        }, 'GET', false, collection_get);

    });

    it("can create a new child", function(done) {
        var c = new Collection();

        env.server.fakeResponse(function() {
            c.create({
                val: 'val'
            }).then(function(child) {
                expect(child).to.exist;
                expect(c.length).to.equal(1);
                done();
            });
        });
    });

});