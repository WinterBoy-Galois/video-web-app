var env = require('../env'),
    Model = require('sdk/models/analytics_data');

describe('SDK: Models: AnalyticsData', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

});