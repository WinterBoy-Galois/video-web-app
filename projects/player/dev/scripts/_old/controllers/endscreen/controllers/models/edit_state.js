var BaseModel = require('backbone').Model;

//a marker
var Model = BaseModel.extend({

    states: {
        EDIT: "Edit",
        PREVIEW: "Preview"
    },

    defaults: {
        state: "Edit"
    },

});
module.exports = Model;