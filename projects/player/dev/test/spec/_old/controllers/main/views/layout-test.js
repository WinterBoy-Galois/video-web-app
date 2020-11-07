var Env = require('helpers/environment_factory'),
    Layout = require('_old/controllers/main/views/layout');

require('behaviors');


module.exports = describe('Controllers: Player: Views: Layout', function() {

    var root;

    beforeEach(function() {
        root = Env.rootRegion();
    });

    it('should be showable and run self test', function() {
        var layout = new Layout();
        root.show(layout);
        layout.runSelfTest();
    });

    it('should have regions', function() {
        var layout = new Layout();
        root.show(layout);
        expect(layout.video_engine).to.exist;
        expect(layout.controls).to.exist;
        expect(layout.end_screen).to.exist;
        expect(layout.marker_overlays).to.exist;
        expect(layout.markers).to.exist;
    });

});