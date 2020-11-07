var config = require('../config'),
    Collection = require('./_collection'),
    Integration = require('./integration');

var Integrations = Collection.extend({

    model: Integration,

    url: function() {
        return this.owner.url() + config.urls.nestedIntegrationURL;
    },

    comparator: function(item) {
        return item.get("created");
    },
 
});

module.exports = Integrations;