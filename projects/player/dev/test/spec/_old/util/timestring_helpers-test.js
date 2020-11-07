var ts = require('_old/util/timestring_helpers');


module.exports = describe('Util: TimestringHelpers', function() {


    it('should be able to convert time to string', function() {

        // regular
        expect(ts.secondsToString(50)).to.equal('00:50');
        expect(ts.secondsToString(75)).to.equal('01:15');

        // including ms
        expect(ts.secondsToString(75, true)).to.equal('01:15.00');
        expect(ts.secondsToString(75.5, true)).to.equal('01:15.50');

        // defaults to 00:00
        expect(ts.secondsToString("hallo", true)).to.equal('00:00.00');
        expect(ts.secondsToString("hallo", false)).to.equal('00:00');

    });

    it('should be able to convert string to time', function() {
        expect(ts.stringToSeconds("3:00")).to.equal(3 * 60);
        expect(ts.stringToSeconds("16")).to.equal(16);
    });

});