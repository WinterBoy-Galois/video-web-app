// imports
var _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    Mustache = require('mustache');

// set default rendering engine to mustache
Backbone.Marionette.Renderer.render = function(template, data) {
    return Mustache.to_html(template, data);
};

// add a nicer open effect 
Marionette.Region.prototype.open = function(view) {
    var _this = this;
    _this.$el.addClass("hidden");
    _this.$el.html(view.el);
    _.delay(function() {
        _this.$el.removeClass("hidden");
    }, 100);
};

// add global behaviors
Marionette.Behavior.extend({
    behaviors: {
        HistoryButtons: {}
    }
});

module.exports = {};