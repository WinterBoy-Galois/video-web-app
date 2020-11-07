var config = require('../config'),
    Collection = require('./_collection'),
    AnalyticsData = require('./analytics_data');

var AnalyticsData = Collection.extend({
    model: AnalyticsData,

    url: function() {
        var url = this.owner.url() + config.urls.analyticsDataURL;
        if (this.startFilter && this.endFilter) {
            url += "?start=" + this.startFilter + "&end=" + this.endFilter;
        }
        return url;
    },

    filterByRange: function(start, end) {
        this.startFilter = start;
        this.endFilter = end;
        var _this = this;
        return this.fetch().done(function() {
            _this.startFilter = false;
            _this.endFilter = false;
        });
    }
});

module.exports = AnalyticsData;