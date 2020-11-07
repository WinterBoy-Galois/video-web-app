var Marionette = require('marionette'),
    template = require('./view.html');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_text",

    bindings: {
        "textarea": {
            observe: "_editorID",
            update: function($el, val) {
                $el.attr("id", val);
            }
        }
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },


});