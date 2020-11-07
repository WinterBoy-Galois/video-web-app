var BaseModel = require('backbone').Model;


//a marker
var Model = BaseModel.extend({

    states: {
        EDIT: "edit",
        PREVIEW: "preview",
        VIEW: "view"
    },

    defaults: {
        state: "view",
        hasLargeContent: false,
        hasNarrowContent: false,
        hasExclusiveContent: false,
        numberOfBlocks: 0
    },

});
module.exports = Model;