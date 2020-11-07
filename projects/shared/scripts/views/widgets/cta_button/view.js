var Marionette = require('marionette'),
    tinycolor = require('tinycolor'),
    URLHelpers = require('shared/util/url_helpers'),
    UiHelpers = require('shared/util/ui_helpers');


module.exports = Marionette.ItemView.extend({

    template: false,
    className: 'vp_cta_button_widget',

    // options
    disabled: false,

    events: {
        'click': 'onClick',
        'mouseover': 'onMouseOver',
        'mouseout': 'onMouseOut'
    },

    bindings: {
        ':el': {
            observe: ['color', 'label', 'large', 'window_width'],
            update: function($el, vals) {
                var color = vals[0],
                    label = vals[1],
                    large = vals[2],
                    tColor = new tinycolor(color);

                $el.text(label);

                this.darkColor = tColor.darken(10).desaturate(10).toHexString();

                this.changeColor(color);

                if (tColor.isLight()) {
                    $el.addClass('vp_light_bg');
                } else {
                    $el.removeClass('vp_light_bg');
                }

                if (large) {
                    $el.addClass('vp_cta_large');
                }

                // scale title to fit max size
                setTimeout(this.scaleTitle.bind(this), 0);
            }
        }
    },

    behaviors: {
        Stickit: {},
        FastClick: {}
    },

    onClick: function(e) {
        e.preventDefault();
        if (this.model.get('action') && !this.getOption('disabled')) {
            e.stopImmediatePropagation();
            window.open(
                URLHelpers.processURLInput(
                    this.model.get('action')));
        }
        this.trigger("click");
    },

    onMouseOver: function() {
        this.hoverColor(this.model.get('color'));
    },

    onMouseOut: function() {
        this.changeColor(this.model.get('color'));
    },

    changeColor: function(color) {
        this.$el.css({
            'backgroundColor': color,
            'borderColor': this.darkColor
        });
    },

    hoverColor: function(color) {
        this.$el.css({
            'backgroundColor': this.darkColor,
            'borderColor': color
        });
    },

    scaleTitle: function() {
        var p = this.$el.parent(),
            maxWidth = p.width();
        UiHelpers.resizeFontToFit(this.$el, maxWidth);
    }

});