var config = require('../config'),
    ajax = require('../util/ajax'),
    s3_uploader = require('../util/s3_uploader');
    Model = require('./_singleton_model');

var Profile = Model.extend({
    initialize: function() {
        Model.prototype.initialize.call(this);
    },

    urlRoot: function() {
        return config.urls.profileURL;
    },

    uploadAvatar: function(file) {
        return s3_uploader.uploadFile(
            file,
            config.urls.uploadImageTicketURL + 'profile_avatar/' + this.get('ref') + '/',
            config.urls.uploadImageCompleteURL
        );
    },


});


module.exports = Profile;
