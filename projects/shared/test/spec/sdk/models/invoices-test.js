var env = require('../env'),
    Collection = require('sdk/models/invoices');

describe('SDK: Models: Invoices', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

});