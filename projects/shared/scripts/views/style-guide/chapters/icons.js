var Marionette = require('marionette'),
    template = require('./icons.html');


module.exports = Marionette.ItemView.extend({
    template: template,
    tagName: "ul",
    className: "sg_icons"
});