var env = require('../env'),
    Model = require('sdk/models/marker_content');

describe('SDK: Models: Marker', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

});