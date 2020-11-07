var _ = require('underscore'),
    $ = require('jquery'),
    Mustache = require('mustache'),
    Marionette = require('marionette'),
    sdk = require('sdk'),
    template = require('./view.html'),
    template_tool = require('!raw!./tool.html');


var view = Marionette.ItemView.extend({

    template: template,

    events: {
        "click .tool": function(e) {
            var id = $(e.currentTarget).attr("data-id");
            this.trigger("tool_clicked", id);
        }
    },

    ui: {

    },

    onRender: function() {

    },

    setTools: function(team, tools) {

        var _this = this;
        this.$el.html("");

        // convert into templatable code
        var data = _.map(tools, function(value, key) {
            var disabled = value.feature && !team.canUseFeature(value.feature);
            var hidden = value.feature && !team.canUseFeature(value.feature) && value.hideIfDisabled;
            if (hidden) {
                return false;
            }
            return {
                id: key,
                title: value.title,
                disabled: disabled
            };
        });
        data = _.compact(data);

        // render
        _.each(data, function(item) {
            var tool = Mustache.to_html(template_tool, item);
            _this.$el.append(tool);
        });

        this.delegateEvents();
    },

    setSelectedTool: function(id) {
        this.$el.find(".tool").removeClass("selected");
        this.$el.find(".tool." + id).addClass("selected");
    }

});

module.exports = view;