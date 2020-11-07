var _ = require('underscore'),
    $ = require('jquery'),
    libLoader = require('_old/util/lib_loader'),
    facebook_comments_template = require('./embed_templates/facebook_comments.html'),
    facebook_page_template = require('./embed_templates/facebook_page.html'),
    pinterest_collection_template = require('./embed_templates/pinterest_collection.html');


var detectors = {

    "facebook-page": [
        /(facebook.com\/[a-zA-Z0-9_\-\.]+)/
    ],
    "twitter": [
        /twitter.com\/([a-zA-Z0-9_\-]+)/,
        /@([a-zA-Z0-9_\-]+)/
    ],
    "pinterest-profile": [
        /pinterest.com\/([a-zA-Z0-9_\-]+)/,
    ],
    "pinterest-board": [
        /pinterest.com\/([a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-]+)/,
    ]
};


function detect(url) {

    var result = false;

    _.each(detectors, function(rs, service) {
        _.each(rs, function(r) {
            var match = r.exec(url);
            if (match) {
                result = {
                    "service": service,
                    "service_id": match[1]
                };
            }
        });
    });

    return result;
}

function embedTwitterTimeline(element, val) {

    var re = /[0-9]{10,}/,
        screenName,
        widgetID;

    // we have a widget no
    if (re.test(val)) {
        screenName = "";
        widgetID = val;
    }
    // we have a name
    else {
        screenName = val.replace("@", "");
        widgetID = "585811408010502144";
    }


    var dfd = new $.Deferred();
    libLoader.requireLib("twitter", function(twttr) {
        twttr.widgets.createTimeline(
            widgetID,
            element[0], {
                cards: "visible",
                height: "100%",
                screenName: screenName
            }).then(dfd.resolve, dfd.reject);
    });
    return dfd.promise();
}

function embedFacebookComments(element) {
    var dfd = new $.Deferred();
    // delay construction so the parent element is already rendered
    setTimeout(function() {
        var url = encodeURIComponent("http://videopath.com");
        var template = facebook_comments_template.replace("{{url}}", url).replace("{{height}}", element.height()).replace("{{width}}", element.width());
        element.html(template);
        dfd.resolve();
    }, 200);
    return dfd.promise();
}

function embedFacebookPage(element, id) {
    var dfd = new $.Deferred();

    // delay construction so the parent element is already rendered
    setTimeout(function() {
        id = encodeURIComponent(id);
        var template = facebook_page_template.
        replace("{{page}}", id).
        replace("{{height}}", element.height()).
        replace("{{width}}", element.width());

        element.html(template);
        dfd.resolve();
    }, 200);

    return dfd.promise();
}

function embedPinterest(element, id, type) {
    var dfd = new $.Deferred();
    libLoader.requireLib("pinterest", function(pinterest) {
        setTimeout(function() {

            // calculate row width
            var elWidth = element.width(),
                numImages = elWidth < 400 ? 2 : 3,
                scaleWidth = (elWidth - 30) / numImages;

            var template = pinterest_collection_template.
            replace("{{service_id}}", id).
            replace("{{type}}", type).
            replace("{{scale-width}}", scaleWidth).
            replace("{{scale-height}}", element.height() - 110);
            element.html(template);
            pinterest.f.build();
            dfd.resolve();
        }, 200);

    });
    return dfd.promise();
}

function embedPinterestProfile(element, id) {
    return embedPinterest(element, id, "embedUser");
}

function embedPinterestBoard(element, id) {
    return embedPinterest(element, id, "embedBoard");
}

module.exports = {
    embedTwitterTimeline: embedTwitterTimeline,
    embedFacebookComments: embedFacebookComments,
    embedFacebookPage: embedFacebookPage,
    embedPinterestBoard: embedPinterestBoard,
    embedPinterestProfile: embedPinterestProfile,
    detect: detect
};