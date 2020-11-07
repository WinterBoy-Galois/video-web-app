var Model = require('./_model');

var SingletonModel = Model.extend({

    // singleton models never are new
    isNew: function() {
        return false;
    }

});

module.exports = SingletonModel;