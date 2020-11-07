var Marionette = require('marionette'),
    Backbone = require('backbone'),
    LoadingIndicatorWidget = require('widgets/loading_indicator/view'),
    ShareButtonsWidget = require('widgets/social_buttons/view'),
    CTAButtonWidget = require('widgets/cta_button/view'),
    template = require('./interactions.html');


module.exports = Marionette.LayoutView.extend({
    template: template,

    model: new Backbone.Model({}),

    regions: {
        indicatorDark: ".sg_loading_indicator_dark",
        indicatorLight: ".sg_loading_indicator_light",

        shareButtonsDefault: ".sg_share_buttons_default",
        shareButtonsMinimalLight: ".sg_share_buttons_minimal_light",
        shareButtonsMinimalDark: ".sg_share_buttons_minimal_dark",
        shareButtonsCustom: ".sg_share_buttons_custom",

        ctaButton: ".sg_cta_button",
        ctaButtonLarge: ".sg_cta_button_large",
    },

    bindings: {
        '.vp_progress_label_current': {
            observe: 'progress',
            update: function($el, val) {
                $el.text(val.current);
            }
        },
        '.vp_progress_label_total': {
            observe: 'progress',
            update: function($el, val) {
                $el.text(val.total);
            }
        }
    },

    behaviors: {
        ProgressBar: {},
        Stickit: {}
    },

    onRender: function() {
        this.renderIndicator();
        this.renderShareButtons();
        this.renderCTAButtons();
        this.renderProgressbar();
    },

    renderIndicator: function() {
        var vm_i_d = new Backbone.Model({
                dark: true
            }),
            vm_i_l = new Backbone.Model();

        this.indicatorDark.show(new LoadingIndicatorWidget({
            model: vm_i_d
        }));
        this.indicatorLight.show(new LoadingIndicatorWidget({
            model: vm_i_l
        }));

        setInterval(function() {
            vm_i_d.set('stopped', !vm_i_d.get('stopped'));
            vm_i_l.set('stopped', !vm_i_l.get('stopped'));
        }, 3000);
    },

    renderShareButtons: function() {
        this.shareButtonsDefault.show(new ShareButtonsWidget());
        this.shareButtonsMinimalLight.show(new ShareButtonsWidget({
            minimal: true,
        }));
        this.shareButtonsMinimalDark.show(new ShareButtonsWidget({
            minimal: true
        }));
        this.shareButtonsCustom.show(new ShareButtonsWidget({
            buttons: ['email', 'embed', 'twitter']
        }));
    },

    renderCTAButtons: function() {
        this.ctaButton.show(new CTAButtonWidget({
            model: new Backbone.Model({
                color: 'red',
                label: 'Standard CTA Button',
                action: 'videopath.de'
            })
        }));
        this.ctaButtonLarge.show(new CTAButtonWidget({
            model: new Backbone.Model({
                color: 'yellow',
                label: 'Large CTA Button',
                action: 'mailto:info@videopath.de',
                large: true
            })
        }));
    },

    renderProgressbar: function() {
        var TOTAL = 12,
            MAX = 16,
            current = 0,
            model = this.model;

        setInterval(function() {
            current++;
            model.set({
                progress: {
                    total: TOTAL,
                    current: current % MAX
                }
            });
        }, 400);
    }

});