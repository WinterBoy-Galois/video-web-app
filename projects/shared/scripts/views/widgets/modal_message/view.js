var Marionette = require('marionette'),
    template = require('shared/views/widgets/modal_message/template.html');

require('stickit');

module.exports = Marionette.ItemView.extend({
    template: template,
    className: 'vp_modal_message_content',

    bindings: {
        '.vp_modal_message_icon': {
            observe: 'icon',
            update: function($el, icon) {
                $el.toggleClass('vp_removed', !icon);
                $el.addClass(icon);
            }
        },
        '.vp_modal_message_title': 'title',
        '.vp_modal_message_text': {
            observe: 'message',
            update: function($el, msg) {
                $el.html(msg);
            }
        }
    },

    behaviors: {
        Stickit: {}
    },
});