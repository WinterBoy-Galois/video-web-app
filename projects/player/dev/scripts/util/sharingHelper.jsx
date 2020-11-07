var names = require('const').SHARING;

var embedTemplate = '<div><iframe width = "768" height = "432" frameborder = "0" src = "{URL}" allow="autoplay" allowfullscreen></iframe></div>',
    prefix = 'http:',
    plugins = {};

plugins[names.FACEBOOK] = {
	name: "Facebook",
    width: 400,
    height: 400,
    serviceURL: "https://www.facebook.com/sharer/sharer.php?u={URL}",
    action: showSharePopup,
    prefix: true
};

plugins[names.TWITTER] = {
	name: "Twitter",
    width: 400,
    height: 400,
    serviceURL: "https://twitter.com/home?status={URL}",
    action: showSharePopup,
    prefix: true
};

plugins[names.GPLUS] = {
	name: "Google Plus",
    width: 500,
    height: 500,
    serviceURL: "https://plus.google.com/share?url={URL}",
    action: showSharePopup
};

plugins[names.MAIL] = {
	name: "Email",
    action: function(url) {
    	var subject = encodeURIComponent('Check out this video'),
    		body = encodeURIComponent(url);
    	window.open("mailto:?subject=" + subject + "&body=" + body);
    },
    prefix: true
};

plugins[names.LINK] = {
	name: "Share link",
    action: function(url, plugin) {
        window.prompt(plugin.name, url);
    },
    prefix: true
};


plugins[names.EMBED] = {
	name: "Embed code",
    action: function(url, plugin) {
    	var code = embedTemplate.replace("{URL}", url);
        window.prompt(plugin.name, code);
    },
    prefix: true
};

/* 
 * Show popup for various sharing services
 */
function showSharePopup(url, plugin) {
    var serviceURL = plugin.serviceURL.replace("{URL}", encodeURIComponent(url)),
        width = plugin.width,
        height = plugin.height,
    	left = (screen.width / 2) - (plugin.width / 2),
    	top = (screen.height / 2) - (plugin.height / 2),
    	opts = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
    window.open(serviceURL, plugin.name, opts);
}

/*
 * Main entry point
 */
function share(url, type) {
    var plugin = plugins[type];

    if (plugin) {
        if (plugin.prefix) {
            plugin.action(prefix + url, plugin);
        } else {
            plugin.action(url, plugin);
        }
    }
}


module.exports = {
	share:share
};
