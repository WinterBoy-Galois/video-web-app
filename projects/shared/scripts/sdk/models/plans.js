var config = require('../config'),
    Collection = require('./_collection'),
    Model = require('./plan');

var Plans = Collection.extend({
    model:Model,
    url: function() {
        var postFix = this.groupFilter ? '?group=' + this.groupFilter : '';
        return config.urls.planURL + postFix;
    },

    filterByGroup: function(group) {
        this.groupFilter = group;
        var _this = this;
        return this.fetch().done(function() {
            _this.sort();
            _this.groupFilter = false;
        });
    },

    comparator: function(item) {
        switch (item.get('payment_interval')){
            case 'year':
                return 1;
                break;
            case 'month':
                return 2;
                break;
            default:
                return 10;
        }

    },

});

module.exports = Plans;