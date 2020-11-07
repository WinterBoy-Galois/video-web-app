var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function create(playerState, video) {

    var model = new Backbone.Model();

    model_binder.bind({
        "editing": {
            observe: ["mode"],
            map: function(val) {
                return val === playerState.modes.BUILDER;
            }
        },
        markers_active: {
            observe: ["has_played", "mode"],
            map: function(has_played, mode) {
                return mode === playerState.modes.BUILDER || has_played;
            }
        },

    }, playerState, model);


    function updateDragHint() {
        var hasMarkers = video.markers.length > 0;
        model.set({
            show_drag_marker_hint: !hasMarkers && playerState.get("mode") === playerState.modes.BUILDER
        });
    }

    model.listenTo(video.markers, "add remove trigger", function() {
        updateDragHint();
    });
    updateDragHint();

    return model;
}

module.exports = {
    create: create
};