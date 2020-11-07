var Marionette = require('marionette');


module.exports = Marionette.Behavior.extend({

    events: {
        'click .vp_history_back_button': 'onBackClick'
    },

    onBackClick: function(e) {
        e.preventDefault();
        window.history.back();
    }

});