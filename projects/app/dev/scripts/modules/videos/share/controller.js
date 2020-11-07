var Controller = require('shared/controllers/controller'),
    View = require('./view');


module.exports = Controller.extend({

    buildRootView: function() {
        return new View(this.options);
    }

});