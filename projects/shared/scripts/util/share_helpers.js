var $ = require('jquery');


var embedTemplate = '<div><iframe width = "768" height = "432" frameborder = "0" src = "" allowfullscreen></iframe></div>',

    prefix = 'http:',

    shareData = {
        facebook: {
            name: "Facebook",
            width: 400,
            height: 400,
            service_url: "https://www.facebook.com/sharer/sharer.php?u={share_url}",
            action: share,
            prefix:true
        },

        twitter: {
            name: "Twitter",
            width: 400,
            height: 400,
            service_url: "https://twitter.com/home?status={share_url}",
            action: share,
            prefix: true
        },

        gplus: {
            name: "Google Plus",
            width: 500,
            height: 500,
            service_url: "https://plus.google.com/share?url={share_url}",
            action: share
        },

        email: {
            name: "Email",
            action: function(url) {
                sendEmail("Check out this video", url);
            },
            prefix: true
        },

        link: {
            name: "Share link",
            action: function(url, plugin) {
                window.prompt(plugin.name, url);
            },
            prefix: true
        },

        embed: {
            name: "Embed code",
            action: function(url, plugin) {
                window.prompt(plugin.name, processEmbedCode(url));
            },
            prefix: true
        }
    };


function processEmbedCode(url) {
    var embedCode = $(embedTemplate);
    embedCode.find("iframe").attr("src", url);
    return embedCode.html();
}

function share(url, plugin) {
    url = encodeURIComponent(url);
    var service_url = plugin.service_url;
    service_url = service_url.replace("{share_url}", url);
    showPopup(service_url, plugin.name, plugin.width, plugin.height);
}

function showPopup(url, title, width, height) {
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var opts = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
    window.open(url, title, opts);
}

function sendEmail(subject, body) {
    window.open("mailto:?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body));
}

function shareAction(url, type) {
    var plugin = shareData[type];

    if (plugin) {
        if (plugin.prefix) {
            plugin.action(prefix + url, plugin);
        } else {
            plugin.action(url, plugin);
        }
    }
}

//add events
module.exports = {
    shareAction: shareAction,
    sendEmail: sendEmail,
    showPopup: showPopup,
    plugins: shareData
};