var _ = require('underscore'),

    EditTextController = require('./edit/blocks/text/controller'),
    EditSimpleButtonController = require('./edit/blocks/simple_button/controller'),
    EditWebsiteController = require('./edit/blocks/website/controller'),
    EditMediaController = require('./edit/blocks/media/controller'),
    EditImageController = require('./edit/blocks/image/controller'),
    EditSocialController = require('./edit/blocks/social/controller'),
    EditEmailCollectorController = require('./edit/blocks/email_collector/controller'),

    //EditMapController = require('./edit/blocks/map/controller'),
    TextBlockView = require('./view/views/blocks/text'),
    MediaBlockView = require('./view/views/blocks/media'),
    ImageBlockView = require('./view/views/blocks/image'),
    SimpleButtonBlockView = require('./view/views/blocks/simple_button'),
    EmailCollectorBlockView = require('./view/views/blocks/email_collector');

require('./view/views/blocks/social');
require('./view/views/blocks/map');


// base config
var config = {

    "text": {
        id: "text",
        tooltip: "Add text",
        disabled_tooltip: "Text disabled",
        ordinal: 0,
        viewBlock: TextBlockView,
        editController: EditTextController
    },

    "media video audio": {
        id: "media",
        tooltip: "Add content from YouTube, Vimeo, Instagram, SoundCloud and Pinterest",
        disabled_tooltip: "Media disabled",
        ordinal: 1,
        viewBlock: MediaBlockView,
        editController: EditMediaController
    },

    "image": {
        id: "image",
        tooltip: "Add image",
        disabled_tooltip: "Image disabled",
        ordinal: 2,
        viewBlock: ImageBlockView,
        editController: EditImageController
    },

    "simple_button": {
        id: "simple_button",
        tooltip: "Add button",
        disabled_tooltip: "Button disabled",
        ordinal: 3,
        viewBlock: SimpleButtonBlockView,
        editController: EditSimpleButtonController
    },
    /*
    "map": {
        ordinal: 4,
        tooltip: "Add map (Twitter)",
        disabled_tooltip: "Map disabled",
        id: "map",
        viewBlock: MapBlockView,
        editController: EditMapController,
        exclusive: false
    },*/

    "website": {
        ordinal: 5,
        tooltip: "Add website (fills the whole overlay)",
        disabled_tooltip: "Website disabled",
        id: "website",
        editController: EditWebsiteController,
        exclusive: true
    },

    "social": {
        ordinal: 6,
        tooltip: "Add social streams from Twitter, Facebook or Pinterest",
        disabled_tooltip: "Social disabled",
        id: "social",
        editController: EditSocialController,
        exclusive: true
    },

    
    "email_collector": {
        ordinal: 7,
        tooltip: "Collect the email adresses of your viewers",
        disabled_tooltip: "E-Mail collector disabled",
        id: "email_collector",
        editController: EditEmailCollectorController,
        exclusive: false,
        viewBlock:EmailCollectorBlockView, 
        requiresFeature: 'email_collector'
    },


};


// flatten config
_.each(config, function(value, key) {
    var keys = key.split(" ");
    _.each(keys, function(skey) {
        config[skey] = value;
    });
});

module.exports = config;