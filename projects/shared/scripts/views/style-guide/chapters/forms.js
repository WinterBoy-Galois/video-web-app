var Marionette = require('marionette'),
    template = require('./forms.html');


module.exports = Marionette.ItemView.extend({
    template: template,
    behaviors: {
        Form: {}
    }
});