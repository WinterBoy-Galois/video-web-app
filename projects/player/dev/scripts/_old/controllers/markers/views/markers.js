var Marionette = require('marionette'),
    MarkerView = require('./marker');


module.exports = Marionette.CollectionView.extend({

    childView: MarkerView,

    childViewEventPrefix: "child",

    behaviors: {
        SelfTest: {},
    },

});