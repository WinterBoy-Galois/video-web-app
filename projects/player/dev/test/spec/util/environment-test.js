var environment = require('util/environment');

var androidUserAgent = 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
	iPhoneUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
	iPadUserAgent = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/30.0.1599.12 Mobile/11A465 Safari/8536.25 (3B92C18B-D9DE-4CB7-A02A-22FD2AF17C8F)';

describe('Util: Environment', function() {

    it('detect android devices', function() {
    	var env = environment.detect(androidUserAgent);
    	expect(env.isHandheld).to.be.true;
    	expect(env.isAndroid).to.be.true;
    });

     it('should detect iphone devices', function() {
        var env = environment.detect(iPhoneUserAgent);
        expect(env.isHandheld).to.be.true;
    	expect(env.isAndroid).to.be.false;
    });

    it('should detect ipad devices', function() {
        var env = environment.detect(iPadUserAgent);
        expect(env.isHandheld).to.be.true;
    	expect(env.isAndroid).to.be.false;
    });

});