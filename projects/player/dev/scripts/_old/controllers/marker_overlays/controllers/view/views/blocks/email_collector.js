var _ = require('underscore'),
    Block = require('./block'),
    template = require('./email_collector.html'),
    integrationsUtil = require('_old/util/integrations_util');

require('stickit');

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


module.exports = Block.extend({

    template: template,
    className: "vp_content_block vp_content_block_email_collector",

    ui: {
        'email': '.vp_email_input'
    },

    bindings: {
        ".text":"text",
        ":el": {
            observe: "image_align",
            update: function($el, val) {
                if (!!val) {
                    $el.css("text-align", val);
                }
            }
        },
        ".vp_message": {
            observe:'message',
            update: function($el, val) {

                setTimeout(function(){
                    !val ? $el.fadeOut(100) : $el.fadeIn(100);
                },50);
                
                $el.fadeOut();
                $el.text(val || '');
            }
        }
    },

    events: {
        "click .vp_submit_button": function(e){
            e.preventDefault();
            var email = this.ui.email.val();

            if ( !validateEmail(email) ) {
                this.setMessage('Please enter a valid e-mail address.', 1000);
                return;
            }

            var attrs = this.model.attributes;
            integrationsUtil.subscribeUser(
                attrs.video_key,
                attrs.service,
                attrs.service_id,
                email
            );
            this.setMessage('Thanks for submitting you e-mail address!');
        }
    },

    setMessage: function(message, duration) {
        this.model.set({
            message:message
        });
        var _this = this;
        if ( duration ) {
            setTimeout(function(){
                _this.model.set({message:false});
            }, duration);
        }

    },


    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

});