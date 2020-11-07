var Marionette = require('marionette'),
    TinyColor = require('tinycolor'),
    template = require('./button_edit_view.html');

require('spectrum');


var view = Marionette.LayoutView.extend({
    template: template,
    className: 'vp_endscreen_button_edit',

    featureColor: false,
    colorChooser: null,

    events: {
        "change .vp_button_text": "saveLabel",
        "change .vp_button_target": "saveAction",
        "change .vp_button_color_text": "onColorInputChange",
        "click": "onClick"
    },

    regions: {
        ctaPreviewRegion: '.vp_cta_preview'
    },

    bindings: {
        '.vp_button_text': 'label',
        '.vp_button_color_text': {
            observe: 'color',
            update: function($el, val) {
                $el.val(val);
            },
            updateModel: function() {}
        },
        '.vp_button_target': {
            observe: 'action',
            update: function($el, val) {
                $el.val(val);
            },
            updateModel: function() {}
        },
    },

    behaviors: {
        Stickit: {},
        Form: {}
    },

    ui: {
        urlForm: ".vp_input_wrapper_url",
        labelInput: ".vp_button_text",
        urlInput: ".vp_button_target",
    },

    initializeLocal: function(local$) {
        if (local$ && this.getOption('featureColor')) {
            var $colorChooser = local$(this.$el).find('.vp_button_color'),
                color = this.model.get('color');

            $colorChooser
                .val(color)
                .spectrum({
                    color: color,
                    showButtons: false,
                    clickoutFiresChange: true,
                    preferredFormat: 'hex'
                })
                .on('dragstop.spectrum', this.onColorSelect.bind(this));

            this.colorChooser = $colorChooser;
        }
    },

    onRender: function() {
        this.$el.find('.vp_input_wrapper_color').toggleClass('vp_removed', !this.getOption('featureColor'));
    },

    onColorInputChange: function(e) {
        if (this.getOption('featureColor')) {
            this.colorChooser.spectrum('set', e.target.value);
            this.saveColor();
        }
    },

    onColorSelect: function(e, color) {
        if (this.getOption('featureColor')) {
            this.colorChooser.val(color.toHexString());
            this.saveColor();
        }
    },

    onClick: function() {
        if (this.getOption('featureColor')) {
            if (this.colorChooser) this.colorChooser.spectrum('hide');
        }
    },

    onDestroy: function() {
        if (this.getOption('featureColor')) {
            if (this.colorChooser) this.colorChooser.spectrum('destroy');
        }
    },

    setURLInvalid: function() {
        this.ui.urlForm.addClass('vp_invalid');
    },

    saveLabel: function() {
        this.trigger('change_label', this.ui.labelInput.val());
    },

    saveAction: function() {
        this.trigger('change_action', this.ui.urlInput.val());
    },

    saveColor: function() {
        if (this.getOption('featureColor')) {
            var color = new TinyColor(this.colorChooser.val()).toHexString();
            this.trigger('change_color', color);
        }
    },

    saveButton: function() {
        this.saveLabel();
        this.saveAction();
        this.saveColor();
    }

});

module.exports = view;