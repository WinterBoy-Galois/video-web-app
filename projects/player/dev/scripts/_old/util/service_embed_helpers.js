    var _ = require('underscore'),
    lib_loader = require('_old/util/lib_loader'),
    vimeo_template = require('./embed_templates/vimeo.html'),
    youtube_template = require('./embed_templates/youtube.html'),
    soundcloud_template = require('./embed_templates/soundcloud.html'),
    instagram_template = require('./embed_templates/instagram.html'),
    videopath_template = require('./embed_templates/videopath.html'),
    pinterest_template = require('./embed_templates/pinterest.html');


var embedTemplates = {
    "vimeo": vimeo_template,
    "youtube": youtube_template,
    "soundcloud": soundcloud_template,
    "instagram": instagram_template,
    "videopath": videopath_template,
    "pinterest": pinterest_template
};

var tests = {
    "vimeo": [
        /vimeo\.com\/([0-9]*)/
    ],
    "youtube": [
        /youtube\.com[^+]*([\w-]{11})/,
        /youtu\.be[^+]*([\w-]{11})/
    ],
    "soundcloud": [
        /soundcloud\.com\/(([a-zA-Z0-9_\-\.]+(\/)?)*)/
    ],
    "instagram": [
        /instagram\.com\/p\/([a-zA-Z0-9_\-]+)/
    ],
    "videopath": [
        /player\.videopath\.com\/([a-zA-Z0-9]+)/
    ],
    "pinterest": [
        /pinterest\.com\/pin\/([0-9]+)/
    ]
};

function createEmbedCode(service, service_id, autoplay) {
    var template = embedTemplates[service];
    if (!template) {
        return "";
    }
    var embedCode = template.replace("{service_id}", service_id);
    embedCode = embedCode.replace("{autoplay}", autoplay);
    return embedCode;
}

function extractService(url) {
    var result = null;
    _.each(tests, function(tests, service) {
        _.each(tests, function(regex) {
            var match = regex.exec(url);
            if (match) {
                var group = match[1];
                if (group.length > 0) {
                    result = {
                        "service": service,
                        "service_id": match[1],
                        "original_url": url
                    };
                }
            }
        });
    });
    return result;
}

function executeDynamicEmbeds() {

    lib_loader.requireLib("instagram", function(instagram) {
        instagram.Embeds.process();
    });

    lib_loader.requireLib("pinterest", function(pinterest) {
        pinterest.f.build();
    });
}

module.exports = {
    createEmbedCode: createEmbedCode,
    extractService: extractService,
    executeDynamicEmbeds: executeDynamicEmbeds
};