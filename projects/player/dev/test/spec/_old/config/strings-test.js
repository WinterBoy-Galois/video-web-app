var strings = require('config/strings');


module.exports = describe('Strings: Strings', function() {

    it('should exist', function() {
        expect(strings).to.exist;
    });

    it('should not crash when loading bogus language', function() {
        strings.loadLanguage("bogus");
    });

    it('should be able to load german', function() {
        expect(strings.get("clickMe")).to.equal("Click Me");
        strings.loadLanguage("de");
        expect(strings.get("clickMe")).to.equal("Klick mich");
    });

});