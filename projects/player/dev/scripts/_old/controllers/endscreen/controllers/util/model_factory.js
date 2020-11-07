var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');

require('_old/util/timestring_helpers');


function create(video, editState) {

    var model = new Backbone.Model();

    if (video) {
        model_binder.bind({
            hide_share_buttons: "ui_disable_share_buttons",
            logo_url: "endscreen_logo"
        }, video, model);
    }

    model_binder.bind({

        title: {
            observe: ["endscreen_title", "title"],
            map: function(val, val2) {
                return val || val2;
            }
        },

        subtitle: "endscreen_subtitle",

        background_color: 'endscreen_background_color',

        display_cta: {
            observe: ['endscreen_button_title'],
            map: function(title) {
                return !!title && title !== "";
            }
        },

        endscreen_url: "endscreen_url"

    }, video, model);

    model.set('edit_mode', false);

    if (editState) {
        model_binder.bind({
            switchButton: {
                observe: "state",
                map: function(state) {
                    if (state === editState.states.EDIT) {
                        return editState.states.PREVIEW;
                    } else {
                        return editState.states.EDIT;
                    }
                }
            }
        }, editState, model);

        model.set('edit_mode', true);
    }

    return model;
}

function createCTA(video, playerState) {
    var model = new Backbone.Model();

    model_binder.bind({
        label: 'endscreen_button_title',
        color: 'endscreen_button_color',
        action: 'endscreen_button_target'
    }, video, model);

    model_binder.bind({
        "window_width": "window_width",
    }, playerState, model);

    // always large cta buttons in endscreen
    model.set('large', true);

    return model;
}

module.exports = {
    create: create,
    createCTA: createCTA
};