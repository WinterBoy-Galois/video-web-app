var calculateAspectMetrics = require('util/calculateAspectMetrics');

describe('Util: Calculate Aspect Metrics', function() {

    it('should not crash on random values', function() {
    	var result = calculateAspectMetrics('sd','2dd', 1, false);
        expect(result.left).to.equal(0);
        expect(result.top).to.equal(0);
        expect(result.width).to.equal(0);
        expect(result.height).to.equal(0);
    });

    it('should calculate right values in "fit" mode landscape', function() {
    	var result = calculateAspectMetrics(600,400, 1.66667, true);
        expect(result.left).to.equal(0);
        expect(result.top).to.equal(20);
        expect(result.width).to.equal(600);
        expect(result.height).to.equal(359);
    });

    it('should calculate right values in "fit" mode portrait', function() {
    	var result = calculateAspectMetrics(400,600, 1.66667, true);
        expect(result.left).to.equal(0);
        expect(result.top).to.equal(180);
        expect(result.width).to.equal(400);
        expect(result.height).to.equal(239);
    });

    it('should calculate right values in "non fit" mode landscape', function() {
    	var result = calculateAspectMetrics(600,400, 1.66667, false);
        expect(result.left).to.equal(-33);
        expect(result.top).to.equal(0);
        expect(result.width).to.equal(666);
        expect(result.height).to.equal(400);
    });

    it('should calculate right values in "non fit" mode portrait', function() {
    	var result = calculateAspectMetrics(400,600, 1.66667, false);
        expect(result.left).to.equal(-300);
        expect(result.top).to.equal(0);
        expect(result.width).to.equal(1000);
        expect(result.height).to.equal(600);
    });

});