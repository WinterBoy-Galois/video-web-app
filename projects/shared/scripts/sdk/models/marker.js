var config = require('../config'),
    Model = require('./_model'),
    Contents = require('./marker_contents');

var Marker = Model.extend({

    defaults: {
        time: 0
    },

    children: {
        contents: Contents
    },

    initialize: function() {
        Model.prototype.initialize.call(this);
    },

    urlRoot: function() {
        return config.urls.markerSingleURL;
    },


});

module.exports = Marker;