var env = require('../env'),
    Collection = require('sdk/models/analytics_datas');

describe('SDK: Models: AnalyticsDatas', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

});