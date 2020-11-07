var config = require('../config'),
    ajax = require('../util/ajax'),
    s3_uploader = require('../util/s3_uploader'),
    Model = require('./_model'),
    VideoRevision = require('./video_revision'),
    VideoRevisions = require('./video_revisions'),
    AnalyticsDatas = require('./analytics_datas');

var urls = {
    draftURL: 'revision/draft/',
    publicURL: 'public/',
    importSourceURL: 'import_source/',
    shareEmailURL: 'share-email/'
};

var Video = Model.extend({

    /*
     * Default Values
     */
    defaults: {
        length: 0,
        title: 'My Video',
        description: '',
        keywords: '',
        published: 0
    },

    children: {
        'analyticsData': AnalyticsDatas,
        'revisions': VideoRevisions
    },

    urlRoot: function() {
        return config.urls.videoURL;
    },

    initialize: function() {
        Model.prototype.initialize.call(this);
    },

    /*
     * Parse out video source info
     * Should be refactored at some point
     */
    set: function(json, arg1, arg2) {
        if (json && json.revision_info) {
            this.revision_info = new Model(json.revision_info);
        }
        if (json && json.source) {
            this.source = new Model(json.source);
        }
        Model.prototype.set.call(this, json, arg1, arg2);
    },


    /*
     * Revert
     */
    revertToRevisionID: function(revisionID) {
        this.set({
            revert_revision: revisionID
        });
        return this.save();
    },

    /*
     * Publish and unpublish videos
     */
    publish: function() {
        return ajax.put({
            url: this.url() + urls.publicURL,
        });
    },

    unpublish: function() {
        return ajax.del({
            url: this.url() + urls.publicURL,
        });
    },


    /*
     * Send share emails
     */
    sendShareEmail: function(recipients, message) {
        return ajax.post({
            url: this.url() + urls.shareEmailURL,
            data: {
                message: message,
                recipients: recipients
            }
        });
    },

    /*
     *   Duplicate this video
     */

    duplicate: function() {
        var video = new Video({
            copy_source: this.get('id')
        });
        return video.save();
    },

    /*
     * Access to revision
     */
    loadRevisionDraft: function() {
        return ajax.get({
            url: this.url() + urls.draftURL,
        }).then(function(data) {
            var rv = new VideoRevision(data);
            rv.setDirty(false, {
                nested: true
            });
            return rv;
        });
    },


    /*
     * Import media to video
     */
    importMedia: function(data) {
        return ajax.post({
            url: this.url() + urls.importSourceURL,
            data: data
        });
    },

    /*
     * Upload file
     */
    uploadVideoFile: function(file) {
        return s3_uploader.uploadFile(
            file,
            config.urls.uploadVideoTicketURL + this.get('id') + '/',
            config.urls.uploadVideoCompleteURL
        );
    },


    /*
     * General helpers
     */
    hasValidFileOrSource: function() {
        return this.source && this.source.get('status') === 'ok';
    },

    // wether video has been pubslished
    isPublished: function() {
        return this.get("current_revision");
    },

    // wether the video has a thumbnail, needs refactoring
    hasThumbnail: function() {
        return !!this.source;
    },

    // get info for file state, needs refactoring
    fileState: function() {
        return this.video_file ? this.video_file.get("status") : 0;
    }

});

module.exports = Video;