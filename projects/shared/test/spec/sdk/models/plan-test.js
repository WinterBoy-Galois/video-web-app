var Model = require('sdk/models/plan');

describe('SDK: Models: Plan', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

    it("can be set", function() {
        var m = new Model();
        m.set(require('./json/plan-get'));
    });

});