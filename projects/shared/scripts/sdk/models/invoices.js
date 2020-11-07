var config = require('../config'),
    Collection = require('./_collection'),
    Invoice = require('./invoice');

var Invoices = Collection.extend({
    model: Invoice,
    url: function() {
        return config.urls.invoiceURL;
    },
    comparator: function(item) {
        return -1 * item.get("date");
    },
});

module.exports = Invoices;