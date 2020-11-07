var config = require('../config'),
    s3_uploader = require('../util/s3_uploader'),
    Model = require('./_model');

var Content = Model.extend({

    defaults: {
        ordinal: 0,
        type: "none"
    },

    initialize: function() {
        Model.prototype.initialize.call(this);
        this.set({
            local_id: Math.floor((Math.random() * 1000000000) + 1)
        });
    },

    urlRoot: function() {
        return config.urls.markerContentSingleURL;
    },

    /*
     *  Upload image and attach to marker
     */
    uploadImage: function(file) {
        return s3_uploader.uploadFile(
            file,
            config.urls.uploadImageTicketURL + "marker_content/" + this.get('id') + '/',
            config.urls.uploadImageCompleteURL
        );
    }

});

module.exports = Content;