var config = require('../config'),
    ajax = require('../util/ajax'),
    Model = require('./_model'),
    Markers = require('./markers'),
    api_uploader = require('../util/api_uploader'),
    s3_uploader = require('../util/s3_uploader');

var VideoRevision = Model.extend({

    children: {
        markers: Markers
    },

    urlRoot: function() {
        return config.urls.videoRevisionURL;
    },

    /*
     * Parse out extra info
     */
    set: function(json, arg1, arg2) {

        if (json && json.source) {
            this.source = new Model(json.source);
            json.source = null;
            json.duration = this.source.get('duration');
        }

        // custom thumbnail
        if (json && json.custom_thumbnail) {
            this.custom_thumbnail = new Model(json.custom_thumbnail);
            json.custom_thumbnail = null;
        }

        Model.prototype.set.call(this, json, arg1, arg2);

    },

    /*
     *   Prepare jpgs
     */
    transcodeJPGSequence: function() {
        var url = this.url() + config.urls.videoRevisionJPGSequence;
        return ajax.put({
            url: url
        });
    },

    /* 
     * Manage Custom Icon
     */
    uploadIcon: function(file) {
        var url = this.url() + "icon/";
        var _this = this;
        return api_uploader.uploadFile(url, file).then(function() {
            _this.save();
        });
    },

    deleteIcon: function() {
        var url = this.url() + "icon/";
        return api_uploader.deleteFile(url);
    },


    /*
     * Custom thumbnail
     */
    uploadThumbnail: function(file) {
        return s3_uploader.uploadFile(
            file,
            config.urls.uploadImageTicketURL + 'custom_thumbnail/' + this.get('id') + '/',
            config.urls.uploadImageCompleteURL
        );
    },

    deleteThumbnail: function() {
        return ajax.post({
            url: config.urls.deleteCustomThumbsURL.replace('{id}', this.get('id'))
        });
    },


    /* 
     * Manage Thumbnail (new, not in use yet)
     */
    uploadThumbnailNew: function(file) {
        var url = this.url() + "thumbnail/";
        return api_uploader.uploadFile(url, file);
    },

    deleteThumbnailNew: function() {
        var url = this.url() + "thumbnail/";
        return api_uploader.deleteFile(url);
    }


});


module.exports = VideoRevision;
