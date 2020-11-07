var config = require('../config'),
    Collection = require('./_collection'),
    Video = require('./video'),
    ajax = require('../util/ajax');

var Videos = Collection.extend({

    model: Video,

    url: function() {
        if ( this.owner ) {
            return this.owner.url() + config.urls.nestedVideoURL;
        }
        return config.urls.videoURL;
    },


    comparator: function(item) {
        return item.get("date");
    },


    /*
     * Import demo video and refresh videos
     */
    importDemo: function() {
        return this.create({
            team: this.owner ? this.owner.get('id'): '',
            demo_video: "1"
        });
    },


    /*
     * Load individual video by id
     */
    loadVideo: function(id) {
        var video = new Video({
            id: id
        });
        return video.fetch().then(function() {
            return video;
        });
    },


    /*
     * Create video from source url
     */
    createWithMediaURL: function(media_url) {
        var video = new Video({
            team: this.owner.get('id')
        });
        return video.save().then(function() {
            return video.importMedia(media_url).then(function() {
                return video;
            }).fail(function() {
                // if we could not import, destroy video again
                video.destroy();
            });
        });
    },

    /*
     * Create with file upload
     */
    createWithFile: function(file) {
        var video = new Video({
            team: this.owner.get('id')
        });
        return video.save().then(function() {
            return video.uploadVideoFile(file).then(function() {
                return video;
            }).fail(function() {
                // if we could not upload, destroy video again
                video.destroy();
            });
        });
    },


    /*
     * Create as a copy of an existing revision id
     */
    createFromRevisionID: function(revisionID) {
        var video = new Video({
            copy_source: revisionID
        });
        return video.save();
    }

});

module.exports = Videos;
