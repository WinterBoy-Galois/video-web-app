var MF = require('helpers/environment_factory'),
    Builder = require('_old/player/builder'),
    Video = require('sdk/models/video_revision'),
    PlayerState = require('_old/player/models/playerstate');


module.exports = xdescribe('Player: Api: Builder', function() {

    var state,
        video,
        player = {
            state: state
        };

    beforeEach(function() {
        state = new PlayerState();
        video = MF.simpleVideo();
        player.state = state;
        Builder.setup(video, player);
    });

    afterEach(function() {
        state.destroy();
    });


    describe('addMarker', function() {

        beforeEach(function() {
            video = new Video();
            Builder.setup(video, player);
        });

        it('add a marker at a given time', function() {
            Builder.addMarker(100);
            expect(video.markers.length).to.equal(1);
            expect(video.markers.first().get('time')).to.equal(100);
        });

        it('add a marker at the current play progress', function() {
            state.set('play_progress', 0.5);
            video.set('duration', 10);
            Builder.addMarker();
            expect(video.markers.length).to.equal(1);
            expect(video.markers.first().get('time')).to.equal(5);
        });

    });

    describe('deleteMarker', function() {

        it('deletes a marker from video', function() {
            var marker = video.markers.get(10),
                length = video.markers.length;

            player.hideMarkerContent = sinon.stub();

            Builder.deleteMarker(marker);

            expect(video.markers.get(10)).to.not.exist;
            expect(video.markers.length).to.equal(length - 1);
            expect(player.hideMarkerContent).to.be.called;
        });
    });

    describe('addMarkerContent', function() {

        it('adds content to a marker', function() {
            var marker = video.markers.get(10),
                length = marker.contents.length;

            Builder.addMarkerContent(marker, "test_type", 1);

            expect(marker.contents.at(1).get('type')).to.equal('test_type');
            expect(marker.contents.length).to.equal(length + 1);
        });
    });

    describe('deleteMarkerContent', function() {

        it('deletes marker content', function() {
            var marker = video.markers.get(10),
                content = marker.contents.first(),
                id = marker.contents.get('id'),
                length = marker.contents.length;

            Builder.deleteMarkerContent(content);

            expect(marker.contents.length).to.equal(length - 1);
            expect(marker.contents.first().get('id')).to.not.equal(id);
        });
    });
});