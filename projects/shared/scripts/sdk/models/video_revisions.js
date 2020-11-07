var config = require('../config'),
    Collection = require('./_collection'),
    Revision = require('./video_revision');

var Revisions = Collection.extend({

    model: Revision,

    url: function() {
        return this.owner.url() + config.urls.videoRevisionNestedURL;
    },

    comparator: function(item) {

        return [item.get('revision_type') != 'draft',  item.get("created")];
    },

});

module.exports = Revisions;