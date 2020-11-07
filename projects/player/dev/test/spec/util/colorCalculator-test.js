var tinycolor = require('tinycolor'),
	colorCalculator = require('util/colorCalculator');

describe('Util: Color Calculator', function() {

	// helper to validate colors
	function expectValidColor(color) {
		expect(tinycolor(color).isValid()).to.be.true;
	}

    it('should calculate light colors', function() {
    	var result = colorCalculator('#ffffff', '#000000');
        expect(result).to.exist;
        expectValidColor(result.playbar.outlineColor);
    });

    it('should calculate dark colors', function() {
    	var result = colorCalculator('#ffffff', '#000000');
        expect(result).to.exist;
        expectValidColor(result.marker.backgroundColor);
    });

    it('should accept color strings', function() {
    	var result = colorCalculator('blue', 'red');
        expect(result).to.exist;
        expectValidColor(result.loadingIndicator.backgroundColor);
    });

});