var env = require('../env'),
    Collection = require('sdk/models/users');

describe('SDK: Models: Users', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

});