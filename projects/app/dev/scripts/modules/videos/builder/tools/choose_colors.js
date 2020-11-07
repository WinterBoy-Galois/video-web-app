var _ = require('underscore'),
    sdk = require('sdk'),
    BaseView = require('./toolbar_baseview'),
    template = require('./choose_color.html');

require('spectrum');


var view = BaseView.extend({

    template: template,

    events: {
        "click": "onClick",

        "change .vp_color_main_input": "onColorMainInputChange",
        "change .vp_color_active_input": "onColorActiveInputChange",
        "dragstop.spectrum .vp_color_main": "onColorMainSelectorChange",
        "dragstop.spectrum .vp_color_active": "onColorActiveSelectorChange",
        "move.spectrum .vp_color_main": "onColorMainSelectorChange",
        "move.spectrum .vp_color_active": "onColorActiveSelectorChange",

        "click .vp_upload_icon_link": "onUploadIconClicked",
        "click .vp_icon_background": "onUploadIconClicked",
        'change .upload_field': 'onUploadFieldChanged'


    },

    ui: {
        mainColor: '.vp_color_main',
        activeColor: '.vp_color_active',
        mainColorInput: '.vp_color_main_input',
        activeColorInput: '.vp_color_active_input',
        uploadField: '.upload_field',
        iconChooser: '.vp_icon_chooser',
        iconLink: '.custom_icon_link'
    },

    behaviors: {
        Tooltips: {},
        Stickit: {},
    },

    /* bindings will only be made for the icon as the colors are more complicated */
    bindings: {
        '.vp_icon_background': {
            observe: ['ui_color_1'],
            update: function($el, val) {
                $el.css("background-color", val[0]);
            }
        },

        '.vp_icon_preview': {
            observe: ['ui_icon'],
            update: function($el, val) {
                $el.css("background-image", "url('" + val + "')");
            }
        },

        '.custom_icon_link': 'ui_icon_link_target',


    },

    onRender: function() {

        // setup spectrum
        this.setupSpectrum();

        // only show icon chooser when in plan
        if (!this.team.canUseFeature("icon")) {
            this.ui.iconChooser.remove();
        }

        this.debouncedSaveRevision = _.debounce(this.saveRevision, 300);
    },

    onUploadIconClicked: function(e) {
        e.preventDefault();
        this.ui.uploadField.click();
    },

    onUploadFieldChanged: function() {
        var file = this.ui.uploadField.prop("files")[0];
        this.revision.uploadIcon(file);
    },

    setupSpectrum: function() {

        var color1 = this.revision.get("ui_color_1"),
            color2 = this.revision.get("ui_color_2");

        this.$el.find('.vp_color_main')
            .spectrum({
                showButtons: false,
                clickoutFiresChange: true,
                preferredFormat: 'hex',
                color: color1
            });

        this.$el.find('.vp_color_active')
            .spectrum({
                showButtons: false,
                clickoutFiresChange: true,
                preferredFormat: 'hex',
                color: color2
            });

        // set colors from revision
        this.ui.mainColorInput.val(color1);
        this.ui.activeColorInput.val(color2);
    },

    onClick: function() {
        if (this.ui.mainColor.spectrum) {
            this.ui.mainColor.spectrum("hide");
            this.ui.activeColor.spectrum("hide");
        }
    },

    /* color pickers */
    onColorMainInputChange: function(e) {
        this.ui.mainColor.spectrum('set', e.target.value);
        this.saveUIColors();
    },

    onColorActiveInputChange: function(e) {
        this.ui.activeColor.spectrum('set', e.target.value);
        this.saveUIColors();
    },

    onColorMainSelectorChange: function(e, color) {
        var c = color.toHexString();
        this.ui.mainColor.val(c);
        this.ui.mainColorInput.val(c);
        this.saveUIColors();
    },

    onColorActiveSelectorChange: function(e, color) {
        var c = color.toHexString();
        this.ui.activeColor.val(c);
        this.ui.activeColorInput.val(c);
        this.saveUIColors();
    },

    saveUIColors: function() {
        var main = this.ui.mainColorInput.val(),
            active = this.ui.activeColorInput.val();
        this.revision.set({
            ui_color_1: main,
            ui_color_2: active
        });
        this.debouncedSaveRevision();
    },

    saveRevision: function() {
        this.revision.save();
    },

    onDestroy: function() {
        this.revision.set({
            ui_icon_link_target: this.ui.iconLink.val()
        });
        this.revision.save();
    },

});
module.exports = view;