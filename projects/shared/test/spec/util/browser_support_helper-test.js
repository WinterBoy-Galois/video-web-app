define([
    'shared/util/browser_support_helpers'
], function(bsh) {

    return describe('Util: Browser Support', function() {

        it('should have certain values in default test environment', function() {
            expect(bsh.browserSupported).to.equal(true);
            expect(bsh.mobile).to.equal(false);
            expect(bsh.iPad).to.equal(false);
            expect(bsh.iPhone).to.equal(false);
        });

    });
});
