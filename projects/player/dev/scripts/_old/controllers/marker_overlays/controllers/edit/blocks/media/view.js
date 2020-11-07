var Marionette = require('marionette'),
    embed_helpers = require('_old/util/service_embed_helpers'),
    template = require('./view.html'),
    $ = require('jquery');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_media",

    events: {
        'change .autoplay_media': function(e){
            var val = $(e.currentTarget).prop('checked');
            this.trigger('autoplay', val);
        }
    },  

    bindings: {
        ".vp_frame_wrapper": {
            observe: ["service", "service_id"],
            update: function($el, val) {
                var code = embed_helpers.createEmbedCode(val[0], val[1], false);
                $el.html(code);
                $el.addClass("vp_media_" + val[0]);
                setTimeout(function() {
                    embed_helpers.executeDynamicEmbeds();
                }, 200);
            }
        },

        ".vp_media_url_input": {
            observe: "original_url",
            updateView: function(val) {
                this.ui.input.val(val);
            },
            // stop updating model!
            updateModel: function() {}
        },
        ".autoplay_media": {
            observe: "autoplay",
            update: function($el, val) {
                $el.prop('checked', val);
            },
        }
    },

    ui: {
        formGroup: '.vp_form_group',
        input: '.vp_media_url_input'
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        Form: {
            inputGroupSubmit: '.vp_submit_button'
        }
    },

    toggleInvalid: function(isInvalid) {
        this.ui.formGroup.toggleClass('vp_invalid', !!isInvalid);
    },

    setUrl: function() {},

    clearFrame: function() {}

});