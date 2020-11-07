var _ = require('underscore'),
    ThemeEditView = require('./tools/choose_colors'),
    VideoSettingsView = require('./tools/video_settings'),
    ThumbnailView = require('./tools/thumbnail'),
    AdvancedView = require('./tools/advanced_settings');


var defaults = {
    title: "Title",
    view: null,
    tooltip: "Tooltip",
    enabled: true,
    apiCommand: null,
    feature: null // if this tool is only available to some users, add feature here
};

var config = {
    "info": {
        title: "Video Settings",
        view: VideoSettingsView,
        tooltip: "Add general info to your player"
    },

    "thumbnail": {
        title: "Thumbnail",
        view: ThumbnailView,
        tooltip: "Select a thumbnail for your video"
    },

    "colors": {
        title: "Edit Theme",
        view: ThemeEditView,
        tooltip: "Edit the appearance of you player",
        feature: "theme",
        featureName: "Theming",
        featureDescription: "Theming includes changing the color of your player as well as adding a custom icon to the top left of your video videos."
    },

    "endscreen": {
        title: "End Screen",
        tooltip: "Configure the endscreen of your player",
        apiCommand: "edit_endscreen",
        feature: "endscreen",
        featureName: "Custom End Screen",
        featureDescription: "Custom End screen includes custom titles, call to action, and colors for unlimited videos."
    },
    
    "advanced": {
        title: "Advanced",
        view: AdvancedView,
        tooltip: "Configure advanced options of your video",
        feature: "advanced_video_settings",
        featureName: "Advanced Settings",
        featureDescription: "Configure advanced options of your video.",
        hideIfDisabled: true
    }
    
};

// fill in defaults
_.each(config, function(val) {
    _.defaults(val, defaults);
});

module.exports = config;
