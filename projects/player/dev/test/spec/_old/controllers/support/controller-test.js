var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/support/controller');

require('behaviors');


module.exports = describe('Controllers: Support: Controller', function() {

    var layout,
        c;

    beforeEach(function() {
        layout = EF.rootRegion();
        c = new Controller();
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    it('should be showable', function() {
        expect(c).to.exist;
        expect(c.rootView).to.exist;
    });

    describe('Events', function() {

    });

    describe('Commands', function() {

    });


});