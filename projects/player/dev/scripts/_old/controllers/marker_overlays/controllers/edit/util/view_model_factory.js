var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function create(localModel) {
    var vmodel = new Backbone.Model();

    // bind regular attributes
    model_binder.bind({

        "toolbar_active": {
            observe: "state",
            map: function(val) {
                return val === localModel.states.EDIT;
            }
        },

        "preview_button_title": {
            observe: "state",
            map: function(val) {
                return (val === localModel.states.EDIT) ? "Preview" : "Edit";
            }
        },

    }, localModel, vmodel);

    return vmodel;
}

module.exports = {
    create: create
};