var Block = require('./block'),
    embed_helpers = require('_old/util/service_embed_helpers'),
    template = require('./media.html');

require('stickit');


module.exports = Block.extend({

    template: template,
    className: "vp_content_block vp_content_block_media",

    bindings: {
        ".vp_media_iframe_wrapper": {
            observe: ["service", "service_id", "autoplay"],
            update: function($el, val) {
                var code = embed_helpers.createEmbedCode(val[0], val[1], val[2]);
                $el.html(code);
                $el.addClass("vp_media_" + val[0]);

                setTimeout(function() {
                    embed_helpers.executeDynamicEmbeds();
                }, 200);
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

});