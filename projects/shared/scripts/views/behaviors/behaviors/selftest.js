var _ = require('underscore'),
    Marionette = require('marionette');


var viewCount = 0;

//var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var behavior = Marionette.Behavior.extend({

    initialization: function() {},

    onRender: function() {
        viewCount++;
        //console.log(viewCount);
    },

    onShow: function() {
        this.view.runSelfTest = this.runSelfTest;
    },

    runSelfTest: function() {

        var _this = this;

        // check that all dom elements referenced
        // by ui exist in dom
        if (this.ui) {
            _.each(this.ui, function(value, key) {
                if (_this.$el.find(value).length === 0) {
                    throw ("Element " + key + " for ui dict must exist in DOM");
                }
            });
        }

        // check that all regions exist in dom
        if (this.regions) {
            _.each(this.regions, function(value, key) {
                if (_this.$el.find(value).length === 0) {
                    throw ("Region " + key + " must exist in DOM");
                }
            });
        }

        // check that all binding targets
        // exist in dom
        if (this.bindings) {
            _.each(this.bindings, function(value, key) {
                if (key == ":el") {
                    return;
                }
                if (_this.$el.find(key).length === 0) {
                    throw ("Element " + key + " for binding must exist in DOM");
                }
            });
        }

        // check that all event listeners
        // have a valid target in dom
        if (this.events) {
            // does not make sense
            // _.each(this.events, function(value, key) {
            //     var match = key.match(delegateEventSplitter);
            //     var eventName = match[1],
            //         selector = match[2];
            //     if (selector !== "" && _this.$el.find(selector).length === 0) {
            //         throw ("Element " + selector + " for event must exist in DOM");
            //     }
            // });

        }

    },

    onDestroy: function() {
        this.view.runSelfTest = null;
        viewCount--;
        // console.log("viewcount " + viewCount);
    }

});

module.exports = behavior;