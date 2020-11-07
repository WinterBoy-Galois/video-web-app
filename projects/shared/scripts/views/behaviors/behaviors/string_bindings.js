var Marionette = require('marionette');

require('stickit');


var behavior = Marionette.Behavior.extend({

    onRender: function() {
        this.view.stickit(this.options.strings, this.view.stringBindings);
    },

    onDestroy: function() {
        this.view.unstickit(this.options.strings, this.view.stringBindings);
    }

});

module.exports = behavior;