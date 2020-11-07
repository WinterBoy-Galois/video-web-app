var _ = require('underscore'),
    BaseView = require('_deprecated/views/baseitemview');


var events = {
    "click .done": "onDoneClick",
};

var view = BaseView.extend({

    initialize: function() {
        this.revision = this.options.revision;
        this.model = this.revision;
        this.team = this.options.team;
        this.events = _.extend(events, this.events);
    },

    onDoneClick: function() {
        this.destroy();
    },

    preventBubble: function(e) {
        e.stopImmediatePropagation();
    }

});
module.exports = view;