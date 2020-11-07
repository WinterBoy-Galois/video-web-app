var BaseView = require('./toolbar_baseview'),
    template = require('./advanced_settings.html'),
    op = require('app/operations/transcodeForIPhone');


var view = BaseView.extend({

    template: template,
    events: {
        "click .done": "onDoneClick",
        "click .iphone": "iPhoneButtonClick"
    },

    iPhoneButtonClick: function() {
        this.destroy();
        op({
            revision: this.options.revision
        });
    }

});
module.exports = view;
