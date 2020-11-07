var Marionette = require('marionette'),
    template = require('./view.html'),
    ViewHelpers = require('../../util/view_helpers'),
    TinyColor = require('tinycolor');


module.exports = Marionette.LayoutView.extend({
    template: template,
    className: "vp_endscreen_view",

    regions: {
        "shareButtons": ".vp_share_block",
        "actionButton": ".vp_cta_block"
    },

    ui: {
        footerBlock: ".vp_footer_block",
        centerArea: ".vp_center_area"
    },

    bindings: {

        '.vp_title_content': 'title',

        '.vp_subtitle_content': 'subtitle',

        '.vp_subtitle_block': {
            observe: 'subtitle',
            update: function($el, val) {
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

        '.vp_share_block': {
            observe: "hide_share_buttons",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !!val);
            }
        },

        '.vp_cta_block': {
            observe: "display_cta",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        }

    },

    behaviors: {
        Stickit: {},
        PlayerResize: {
            onShow: true
        },
        SelfTest: {},
    },

    events: {
        "click .vp_cta_block": "onClick",
        "click .vp_share_block": "onClick",
        "touchend .vp_cta_block": "onTouch",
        "touchend .vp_share_block": "onTouch",
    },

    onClick: function(e) {
        e.stopImmediatePropagation();
    },

    onTouch: function(e) {
        e.stopPropagation();
    },

    onRender: function() {
        var _this = this;
        this.$("img").on("load", function() {
            _this.onPlayerResize();
        });
    },

    onPlayerResize: function() {
        // offset to move centered slightly up;
        var offset = this.model.get('edit_mode') ? 50 : 10;
        ViewHelpers.setEndscreenMargins(this, offset);
    }

});