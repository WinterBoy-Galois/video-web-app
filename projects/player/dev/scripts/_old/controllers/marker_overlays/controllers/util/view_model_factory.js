var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function create(marker, playerState, video) {
    var vmodel = new Backbone.Model();

    // bind regular attributes
    model_binder.bind({
        "title": "title",
    }, marker, vmodel);

    model_binder.bind({
        "window_width": "window_width",
    }, playerState, vmodel);

    if (video) {
        model_binder.bind({
            "show_share_buttons": {
                observe: "ui_disable_share_buttons",
                map: function(val) {
                    return !val;
                }
            },
        }, video, vmodel);
    }

    return vmodel;
}

module.exports = {
    create: create
};