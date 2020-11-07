var Marionette = require('marionette'),
    template = require('./view.html'),
    ViewHelpers = require('../../util/view_helpers'),
    TinyColor = require('tinycolor');

require('spectrum');


module.exports = Marionette.LayoutView.extend({
    template: template,
    className: "vp_endscreen_view vp_endscreen_edit",

    colorChooser: null,
    featureColor: false,

    regions: {
        "shareButtons": ".vp_share_block",
        "actionButton": ".vp_cta_button"
    },

    events: {
        'click .vp_title_block': 'onTitleBlockClick',
        'click .vp_title_content': 'onTitleClick',
        'change .vp_title_content': 'saveTitle',
        'keydown .vp_title_content': 'onTitleKey',
        'focus .vp_title_content': 'onTitleFocus',
        'focusout .vp_title_content': 'onTitleFocusout',

        'click .vp_subtitle_block': 'onSubtitleBlockClick',
        'click .vp_subtitle_content': 'onSubtitleClick',
        'change .vp_subtitle_content': 'saveSubTitle',
        'keydown .vp_subtitle_content': 'onSubTitleKey',
        'focus .vp_subtitle_content': 'onSubtitleFocus',
        'focusout .vp_subtitle_content': 'onSubtitleFocusout',

        'click .vp_cta_block': 'editButton',
        'click .vp_cta_button_widget': 'editButton',

        'click .vp_color_button': 'toggleColorChooser',
        'change.spectrum .vp_color_chooser': 'onColorSelect',
        'dragstop.spectrum .vp_color_chooser': 'onColorSelect',
        'click': 'closeColorChooser'
    },

    ui: {
        centerArea: ".vp_center_area",
        footerBlock: ".vp_footer_block",
        titleContent: ".vp_title_content",
        subtitleContent: ".vp_subtitle_content",
    },

    bindings: {

        '.vp_title_content': 'title',

        '.vp_subtitle_content': 'subtitle',

        '.vp_title_block': {
            observe: 'editing_title',
            update: function($el, editing) {
                $el.toggleClass('vp_editing', !!editing);
            }
        },

        '.vp_subtitle_block': {
            observe: ['subtitle', 'editing_subtitle'],
            update: function($el, vals) {
                var content = vals[0],
                    editing = vals[1];

                $el.toggleClass('vp_editing', !!editing);
                $el.toggleClass("vp_add_new", !content);
            }
        },

        '.vp_custom_logo': {
            observe: "logo_url",
            update: function($el, val) {
                if (!val) val = false;
                $el.attr("src", val);
                $el.toggleClass("vp_removed", !val);
            }
        },

        ':el': {
            observe: "background_color",
            update: function($el, val) {
                if ((new TinyColor(val)).isLight()) {
                    this.$el.addClass('vp_light_bg');
                } else {
                    this.$el.removeClass('vp_light_bg');
                }
                $el.css('background-color', val);

                if (this.getOption('featureColor')) {
                    this.colorChooser.spectrum('set', val);
                }
            }
        },

        '.vp_cta_block': {
            observe: 'display_cta',
            update: function($el, val) {
                $el.toggleClass('vp_add_new', !val);
            }
        },

        '.vp_share_block': {
            observe: "hide_share_buttons",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !!val);
            }
        },
    },

    behaviors: {
        Stickit: {},
        PlayerResize: {
            onShow: true
        },
        SelfTest: {},
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

    // Event Handlers

    // Title
    onTitleBlockClick: function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.model.set('editing_title', true);
        this.focusAndEdit(this.ui.titleContent);
    },

    onTitleClick: function(e) {
        e.stopPropagation();
        this.model.set('editing_title', true);
    },

    onTitleKey: function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    },

    onTitleChange: function() {
        this.saveTitle();
    },

    onTitleFocusout: function() {
        this.saveTitle();
        this.ui.titleContent.removeAttr('contenteditable');
        setTimeout(function() {
            // may be destroyed already so check is needed
            if (this.ui.titleContent.attr)
                this.ui.titleContent.attr('contenteditable', 'true');
        }.bind(this), 0);
    },

    saveTitle: function() {
        this.trigger('change_title', this.ui.titleContent.text());
        this.model.set('editing_title', false);
        this.onPlayerResize();
    },

    // Subtitle
    onSubtitleBlockClick: function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.model.set('editing_subtitle', true);
        this.focusAndEdit(this.ui.subtitleContent);
    },

    onSubtitleClick: function(e) {
        e.stopPropagation();
        this.model.set('editing_subtitle', true);
    },

    onSubTitleKey: function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    },

    onSubtitleChange: function() {
        this.saveSubTitle();
    },

    onSubtitleFocusout: function() {
        this.saveSubTitle();
        this.ui.subtitleContent.removeAttr('contenteditable');
        setTimeout(function() {
            // may be destroyed already so check is needed
            if (this.ui.subtitleContent.attr)
                this.ui.subtitleContent.attr('contenteditable', 'true');
        }.bind(this), 0);
    },

    saveSubTitle: function() {
        this.trigger('change_subtitle', this.ui.subtitleContent.text());
        this.model.set('editing_subtitle', false);
        this.onPlayerResize();
    },

    // CTA btn
    editButton: function() {
        this.trigger('change_cta');
    },

    // Background color chooser
    toggleColorChooser: function(e) {
        this.$el.find('.vp_color_block').toggleClass('vp_active');
        e.stopImmediatePropagation();
        e.preventDefault();
    },

    closeColorChooser: function() {
        this.$el.find('.vp_color_block').removeClass('vp_active');
    },

    onColorSelect: function(e, color) {
        this.trigger('change_background_color', color.toHexString());
    },

    // helpers
    ignoreEvent: function(e) {
        e.stopImmediatePropagation();
    },

    onPlayerResize: function() {
        // 50px offset because of preview / done buttons
        ViewHelpers.setEndscreenMargins(this, 50);
    },

    focusAndEdit: function($el) {
        var el = $el.get(0);
        if (!$el.is(':focus')) {
            el.focus();

            // put cursor on last character
            // see: http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }
    }


});