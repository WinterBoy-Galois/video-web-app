var Marionette = require('marionette');

require('stickit');


var behavior = Marionette.Behavior.extend({

    onRender: function() {
        this.view.stickit();
    },

    onDestroy: function() {
        this.view.unstickit();
    }

});

module.exports = behavior;