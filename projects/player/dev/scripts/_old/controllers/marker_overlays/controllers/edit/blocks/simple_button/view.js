var $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./view.html');


function setColor($el, val) {
    var $swatches = $el.find('.vp_color_swatch'),
        $chooser = $el.find('.vp_color_chooser_block'),
        featureColor = this.getOption('featureColor');

    $swatches.toggleClass('vp_removed', !!featureColor);
    $chooser.toggleClass('vp_removed', !featureColor);

    if (featureColor) {
        this.colorChooser.spectrum('set', val);
        $chooser.find('.vp_color_button').css('background-color', val);
    } else {
        $swatches.each(function() {
            var color = $(this).data().color;
            $(this).toggleClass("selected", val === color);
        });
    }
}

module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_simple_button",

    featureColor: false,

    regions: {
        button: ".vp_button_wrapper"
    },

    events: {
        "click .vp_color_swatch": "onSwatchClick",
        "change .vp_input_url": "onUrlChange",
        "change .vp_input_title": "onTitleChange",

        'click .vp_color_button': 'toggleColorChooser',
        'change.spectrum .vp_color_chooser': 'onColorSelect',
        'dragstop.spectrum .vp_color_chooser': 'onColorSelect',
        'click': 'closeColorChooser'
    },

    bindings: {
        ":el": {
            "observe": "color",
            update: setColor
        },
        // use updateView to avoid bidirectional bindings.
        ".vp_input_title": {
            observe: "title",
            updateView: function(val) {
                this.ui.titleInput.val(val);
            }
        },
        ".vp_input_url": {
            observe: "target_url",
            updateView: function(val) {
                this.ui.urlInput.val(val);
            }
        }
    },

    ui: {
        titleInput: ".vp_input_title",
        urlInput: ".vp_input_url",
        urlForm: ".vp_input_wrapper_url"
    },

    onRender: function() {
        this.colorChooser = this.$el.find('.vp_color_chooser');

        if (this.getOption('featureColor')) {
            this.colorChooser
                .spectrum({
                    showButtons: false,
                    showInput: true,
                    clickoutFiresChange: true,
                    flat: true,
                    preferredFormat: 'hex',
                    color: this.model.get('background_color'),
                });
        } else {
            this.$el.find('.vp_color_block').remove();
        }
    },

    onDestroy: function() {
        if (this.getOption('featureColor')) {
            this.colorChooser.spectrum('destroy');
        }
    },

    onSwatchClick: function(e) {
        this.trigger("selected_color", $(e.currentTarget).data().color);
    },

    onTitleChange: function() {
        this.trigger("title_change", this.ui.titleInput.val());
    },

    onUrlChange: function() {
        this.trigger("url_change", this.ui.urlInput.val());
    },

    setURLInvalid: function() {
        this.ui.urlForm.addClass('vp_invalid');
    },

    // Background color chooser
    toggleColorChooser: function(e) {
        this.$el.find('.sp-container').toggleClass('vp_active');
        e.stopImmediatePropagation();
        e.preventDefault();
    },

    closeColorChooser: function() {
        this.$el.find('.sp-container').removeClass('vp_active');
    },

    onColorSelect: function(e, color) {
        this.trigger('selected_color', color.toHexString());
    },


    behaviors: {
        Stickit: {},
        SelfTest: {},
        Form: {}
    }


});