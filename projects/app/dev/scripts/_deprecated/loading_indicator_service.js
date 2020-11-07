var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone');


var eventsProxy = _.extend({}, Backbone.Events);
eventsProxy.loading = false;
$(document).ajaxStart(function() {
    eventsProxy.loading = true;
    eventsProxy.trigger("ajax_start");
});
$(document).ajaxStop(function() {
    eventsProxy.loading = false;
    eventsProxy.trigger("ajax_stop");
});

module.exports = eventsProxy;