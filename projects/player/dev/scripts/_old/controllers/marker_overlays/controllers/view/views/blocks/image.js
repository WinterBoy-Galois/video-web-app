var Block = require('./block'),
    template = require('./image.html');

require('stickit');


module.exports = Block.extend({

    template: template,
    className: "vp_content_block vp_content_block_image",

    bindings: {
        "img": {
            observe: "image_url",
            update: function($el, val) {
                $el.attr("src", val);
            }
        },
        ":el": {
            observe: "image_align",
            update: function($el, val) {
                if (!!val) {
                    $el.css("text-align", val);
                }
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

});