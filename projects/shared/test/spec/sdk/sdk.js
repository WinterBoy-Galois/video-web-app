var sdk = require('sdk');

describe('SDK: Main', function() {

    it("exists", function() {
        expect(sdk).to.exist;
    });

    it("can change endpoints", function() {
        sdk.setEndpoint("http://api.videopath.com");
        sdk.setStripePublicKey('123456');
    });

    it("has basic collections and models in place", function() {
        expect(sdk.videos).to.exist;
        expect(sdk.invoices).to.exist;
        expect(sdk.plans).to.exist;
        expect(sdk.users).to.exist;
        expect(sdk.currentUser).to.exist;
    });

});