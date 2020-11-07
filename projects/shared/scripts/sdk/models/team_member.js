var config = require('../config'),
    Model = require('./_model'),
    Videos = require('./videos');


var TeamMember = Model.extend({

    urlRoot: function() {
        return config.urls.teamMemberURL;
    },

});

module.exports = TeamMember;