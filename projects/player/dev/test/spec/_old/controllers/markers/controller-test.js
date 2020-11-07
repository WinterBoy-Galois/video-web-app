var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/markers/controller');

require('behaviors');


module.exports = describe('Controllers: Marker: Controller', function() {

    var layout, player, c;

    beforeEach(function() {
        layout = EF.rootRegion();
        player = EF.simplePlayerApi();
        c = new Controller(player);
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
        EF.playerApiReset();
    });

    describe('Views', function() {

        it('should contain a bunch of markers, one more than in model because of the add marker', function() {
            var count = player.video.markers.length;
            var markerElements = c.rootView.$(".vp_marker").length;
            expect(markerElements).to.not.equal(0);
            expect(markerElements).to.equal(count + 2);
        });

    });

    describe('Events', function() {

        it('should emit background click events', function() {
            c.rootView.$el.trigger('click');
            expect(player.api.command).to.have.been.calledWith("toggle_play");
        });

        it('should emit marker click events', function() {
            c.rootView.$(".vp_markers_collection_wrapper .vp_marker:first").trigger('click');
            var id = player.video.markers.first().get("id");
            expect(player.api.command).to.have.been.calledWith("show_marker_content", id);
        });

    });

    describe('Info Arrow', function() {
        it('has an infoArrow view', function() {
            expect(c.views.infoArrowView).to.exist;
            expect(c.showInfoArrow).to.be.true;
        });
    });
});