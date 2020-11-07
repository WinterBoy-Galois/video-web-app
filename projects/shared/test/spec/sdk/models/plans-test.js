var env = require('../env'),
    Collection = require('sdk/models/plans');

describe('SDK: Models: Plans', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

});