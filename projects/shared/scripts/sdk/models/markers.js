var config = require('../config'),
    Collection = require('./_collection'),
    Marker = require('./marker');

var Markers = Collection.extend({


    model: Marker,

    url: function() {
        this.owner.url() + config.urls.markerURL;
    },

    comparator: function(item) {
        return item.get("time");
    },

    /*
     * Create new marker
     */
    create: function(attributes, options) {
        attributes = attributes ||  {};
        // try to set the marker attribute
        if (this.owner) {
            attributes.video_revision = this.owner.get('id');
        }
        var collection = this;
        return Collection.prototype.create.call(this, attributes, options).then(function(result) {
            collection.sort();
            return result;
        });
    },

    /*
     * Helpers for finding markers
     */
    nextBeforeTime: function(time) {
        var marker, i;
        for (i = this.models.length - 1; i >= 0; i--) {
            marker = this.models[i];
            if (marker.get('time') < time) {
                return marker;
            }
        }
        return this.first();
    },

    nearestToTime: function(time, cutoff) {
        var marker, markerTime, i;
        for (i = this.models.length - 1; i >= 0; i--) {
            marker = this.models[i];
            markerTime = marker.get("time");
            if (markerTime <= time && Math.abs(markerTime - time) <= cutoff) {
                return marker;
            }
        }
    },


    /*
     * Helpers for traversing markers
     */
    next: function(id, backwards) {
        var current = this.get(id);

        if (!current) {
            return;
        }

        var index = this.indexOf(current);

        if ((backwards && index === 0) || (!backwards && index == this.size() - 1)) {
            return current;
        }

        var next = backwards ? -1 : 1;
        return this.at(index + next);
    }

});

module.exports = Markers;