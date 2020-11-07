var Backbone = require('backbone'),
    ModelFactory = require('./marker_view_model_factory');


function create(video, playerState) {

    var collection = new Backbone.Collection();

    video.markers.each(function(item) {
        collection.add(ModelFactory.create(item, video, playerState));
    });

    collection.listenTo(video.markers, "remove", function(item) {
        var mfitem = collection.get(item.get("id"));
        collection.remove(mfitem);
    });

    collection.listenTo(video.markers, "add", function(item) {
        collection.add(ModelFactory.create(item, video, playerState));
    });

    return collection;
}

module.exports = {
    create: create
};