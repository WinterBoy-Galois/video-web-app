var Marionette = require('marionette'),
    content_config = require('../../content_config'),
    model_factory = require('../../util/block_view_model_factory'),
    BlockView = require('./blocks/block');

require('./blocks/simple_button');
require('./blocks/image');
require('./blocks/media');
require('./blocks/text');


module.exports = Marionette.CollectionView.extend({

    childView: BlockView,

    childViewOptions: function(model) {
        var vmodel = model_factory.create(model);
        return {
            model: vmodel
        };
    },

    getChildView: function(item) {
        // map to blocks
        var type = item.get("type");

        var content = content_config[type];
        var blockClass = BlockView;

        if (content) {
            blockClass = content.viewBlock;
        }

        return blockClass;
    },

    childViewEventPrefix: "child"

});