var Marionette = require('marionette');


var classes = {
    hidden: "vp_hidden",
    removed: "vp_removed"
};

var behavior = Marionette.Behavior.extend({

    defaults: function() {
        return {
            removed: false
        };
    },

    onRender: function() {

        // set fading states
        this.view.fadeIn = function() {
            this.$el.removeClass(classes.removed);
            var _this = this;
            setTimeout(function() {
                _this.$el.removeClass(classes.hidden);
            }, 10);
        };

        this.view.fadeOut = function(completed) {
            this.$el.addClass(classes.hidden);

            var _this = this;
            setTimeout(function() {
                _this.$el.addClass(classes.removed);
                if (completed) {
                    completed();
                }
            }, 200);
        };

        // set initial state
        if (this.options.removed) {
            this.view.$el.addClass(classes.removed).addClass(classes.hidden);
        }
    },

});

module.exports = behavior;