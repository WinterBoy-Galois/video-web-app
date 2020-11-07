var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function createAddMarker(playerState) {

    var model = new Backbone.Model({
        draggable: true,
        title: "Drag marker to the timeline!",
        isAddMarker: true
    });

    model_binder.bind({
        hidden: {
            observe: "mode",
            map: function(val) {
                return val !== playerState.modes.BUILDER;
            }
        }
    }, playerState, model);

    return model;
}

function createBrandedMarker(playerState, video) {

    var model = new Backbone.Model({
        draggable: false,
        isBrandedMarker: true,
        offset:'-26px',
        title: 'Powered by'
    });

    model_binder.bind({
        hidden: {
            observe: "mode",
            map: function(val) {
                return (val == playerState.modes.BUILDER) || !video.get('branded');
            }
        },

    }, playerState, model);

    return model;
}

module.exports = {
    createAddMarker: createAddMarker,
    createBrandedMarker: createBrandedMarker
};