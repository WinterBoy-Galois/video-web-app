var _ = require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('shared/services/modal/template.html');


module.exports = Marionette.LayoutView.extend({
    template: template,

    className: 'vp_modal_wrapper',

    regions: {
        contentRegion: '.vp_modal_content'
    },

    events: {
        'click .vp_modal_background': 'closeModal',
        'click .vp_modal_close_button': 'closeModal'
    },

    bindings: {
        '.vp_modal_title': {
            observe: 'title',
            update: function($el, title) {
                $el.text(title);
                $el.toggleClass('vp_removed', !title);
            }
        },

        '.vp_modal_close_button': {
            observe: 'closeDisabled',
            update: function($el, val) {
                $el.toggleClass('vp_removed', !!val);
            }
        },

        '.vp_modal_icon': {
            observe: 'iconClassName',
            update: function($el, val) {
                if (val) {
                    $el.addClass(val).addClass('vp_ico');
                } else {
                    $el.remove();
                }
            }
        },

        '.vp_modal': {
            observe: ['className', 'size'],
            update: function($el, vals) {
                var className = vals[0],
                    size = vals[1];

                if (className) {
                    $el.addClass(className);
                }

                if (size && size.width) {
                    var width = (typeof size.width === "string") ?
                        size.width : size.width + 'px';
                    $el.css('width', width);
                }

                if (size && size.height) {
                    var height = (typeof size.height === "string") ?
                        size.height : size.height + 'px';
                    $el.css('heigth', height);
                }
            }
        },

        '.vp_modal_footer': {
            observe: 'buttons',
            update: function($el, btns) {
                var _this = this,
                    btnsExist = btns && btns.length;

                $el.toggleClass('vp_removed', !btnsExist);

                if (btnsExist) {
                    var $btnGroup = $el.find('.vp_btn_group').empty();

                    _.each(btns, function(btn) {
                        var $btn = $('<a href="" class="vp_btn vp_modal_button">').text(btn.title);
                        if (btn.className) {
                            $btn.addClass(btn.className);
                        }
                        $btn.on('click', function(e) {
                            e.preventDefault();
                            _this.trigger('button_action', btn.title);
                        });
                        $btnGroup.append($btn);
                    });
                }
            }
        }
    },

    behaviors: {
        Stickit: {},
        Fading: {
            removed: true
        }
    },

    closeModal: function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();

        if (!this.model.get('closeDisabled')) {
            this.trigger('close_modal');
        }
    }

});