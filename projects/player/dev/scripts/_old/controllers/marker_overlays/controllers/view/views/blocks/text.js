var Block = require('./block');

require('stickit');


module.exports = Block.extend({

    template: '<div> </div>',
    className: "vp_content_block vp_content_block_text",

    bindings: {
        ":el": {
            observe: 'text',
            updateMethod: 'html',
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

});