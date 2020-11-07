var Backbone = require('backbone'),
    MF = require('helpers/environment_factory'),
    CF = require('_old/controllers/markers/util/markers_view_collection_factory');


module.exports = describe('Controllers: Marker: Util: Collection Factory', function() {

    var video, dest_c;

    beforeEach(function() {
        video = MF.simpleVideo();
        dest_c = CF.create(video, MF.playerState());

    });

    afterEach(function() {

    });

    describe('Views', function() {

        it('should contain two markers', function() {
            expect(dest_c.length).to.equal(video.markers.length);
        });

        it('should be able to add a marker', function() {
            video.markers.add(new Backbone.Model({
                id: 3
            }));
            expect(dest_c.length).to.equal(video.markers.length);
        });

        it('should be able to remove a marker', function() {
            video.markers.remove(video.markers.first());
            expect(dest_c.length).to.equal(video.markers.length);
        });

    });

});