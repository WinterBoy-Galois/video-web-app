var Marionette = require('marionette'),
    template = require('./edit_layout.html');


module.exports = Marionette.LayoutView.extend({
    template: template,
    className: "vp_endscreen_edit_layout",

    regions: {
        "editRegion": ".vp_endscreen_edit_container",
        "previewRegion": ".vp_endscreen_preview"
    },

    events: {
        'click .vp_preview_button': 'onPreviewClicked',
        'click .vp_done_button': 'onDoneClicked',
        'click': 'onClick',
        'keydown': 'onKeyDown'
    },

    bindings: {

        '.vp_preview_button': 'switchButton',

        ':el': {
            observe: "background_color",
            update: function($el, val) {
                $el.css('background-color', val);
            }
        },
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },

    // Event Handlers

    onPreviewClicked: function() {
        this.trigger('preview_button_clicked');
    },

    onDoneClicked: function() {
        this.trigger('done_button_clicked');
    },

    onClick: function(e) {
        e.stopImmediatePropagation();
    },

    onKeyDown: function(e) {
        e.stopImmediatePropagation();
    }
});