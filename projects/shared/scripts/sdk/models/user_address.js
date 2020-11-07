var config = require('../config'),
    Model = require('./_model');

var Address = Model.extend({
    url: function() {
        return config.urls.addressURL;
    },
});

module.exports = Address;