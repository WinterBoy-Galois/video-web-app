var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function create(marker, video, playerState) {

    var model = new Backbone.Model();

    model_binder.bind({
        "title": {
            observe: "title",
            map: function(val) {
                return val || "-untitled marker-";
            }
        },
        "temp_title": "temp_title",
        "id": "id",
        

    }, marker, model);

    model_binder.bind({
        "draggable": {
            observe: "mode",
            map: function(val) {
                return val === playerState.modes.BUILDER;
            }
        },
        //"tooltip_title": {
        //    observe: "mode",
        //    map: function(val) {
        //        var title = "Click to edit, drag to move. <span style ='font-size:10px'>Marker ID: " + marker.get("key") + "</span>";
        //        return val === playerState.modes.BUILDER ? title : "";
        //    }
        //}

    }, playerState, model);

    model_binder.multiBind({
        _models: {
            'playerState': playerState,
            'marker': marker
        },
        "offset": {
            observe: ["marker.time", "playerState.duration"],
            map: function(time, duration) {
                var offset = time / duration;
                offset = offset > 1 ? 1 : offset;
                return offset * 100 + "%";
            }
        }
    }, model);


    return model;
}

module.exports = {
    create: create
};
