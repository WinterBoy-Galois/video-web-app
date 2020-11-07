var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('marionette');

require('stickit');


// template for the indicator
var template = "<div class = 'vp_loading_indicator_wrapper'><div class='loading_small'></div></div>";

var loading = false;

var eventsProxy = _.extend({}, Backbone.Events);
$(document).ajaxStart(function() {
    eventsProxy.trigger("ajax_start");
    loading = true;
});
$(document).ajaxStop(function() {
    eventsProxy.trigger("ajax_stop");
    loading = false;
});

var behavior = Marionette.Behavior.extend({

    onRender: function() {

        // bind to loading events
        var _this = this;

        this.view.listenTo(eventsProxy, "ajax_start", function() {
            _this.addIndicator();
            _this.trigger("ajax_start");
        });

        this.view.listenTo(eventsProxy, "ajax_stop", function() {
            _this.removeIndicator();
            _this.trigger("ajax_stop");
        });

        if (loading) {
            this.addIndicator();
        }

    },

    addIndicator: function() {
        if (this.indicator) {
            return;
        }
        this.indicator = $(template);
        this.view.$el.append(this.indicator);
    },

    removeIndicator: function() {
        if (!this.indicator) {
            return;
        }
        this.indicator.remove();
        this.indicator = null;
    }

});

module.exports = behavior;