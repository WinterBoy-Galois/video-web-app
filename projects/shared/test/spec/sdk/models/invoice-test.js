var env = require('../env'),
    Model = require('sdk/models/invoice');

describe('SDK: Models: Invoice', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

});