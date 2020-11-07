var MF = require('helpers/environment_factory'),
    VMF = require('_old/controllers/markers/util/marker_view_model_factory');


module.exports = describe('Controllers: Marker: Util: Model Factory', function() {

    var viewmodel, playerState, video, marker;

    beforeEach(function() {
        video = MF.simpleVideo();
        marker = video.markers.first();
        playerState = MF.playerState();
        viewmodel = VMF.create(marker, video, playerState);
    });

    afterEach(function() {

    });

    it('should be draggable in edit mode', function() {
        playerState.set({
            mode: playerState.modes.BUILDER
        });
        expect(viewmodel.get("draggable")).to.be.true;
        playerState.set({
            mode: playerState.modes.PLAYER
        });
        expect(viewmodel.get("draggable")).to.be.false;
    });

    it('should calculate the correct offset', function() {
        var offset = marker.get("time") / playerState.get("duration") * 100;
        expect(viewmodel.get("offset")).to.equal(offset + "%");
    });

    it('should reflect title, temp_title and id', function() {
        marker.set({
            title: "title",
            temp_title: "temp_title",
            id: 50
        });
        expect(viewmodel.get("title")).to.equal("title");
        expect(viewmodel.get("temp_title")).to.equal("temp_title");
        expect(viewmodel.get("id")).to.equal(50);

    });


});