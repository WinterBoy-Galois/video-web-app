require('ga');

var active = true,
    debug = false;
//linker = "";

if (active) {
    window.ga('create', 'UA-46402960-3', 'auto', {
        //'allowLinker': true
    });
    window.ga('create', 'UA-46402960-5', 'auto', {
        'name': 'merged'
            //'allowLinker': true
    });

    window.ga('set', 'page', '/');
    window.ga('merged.set', 'page', '/');

    // not every load should trigger a new session!
    /*
    window.ga('send', 'pageview', {
        'sessionControl': 'start'
    });
    window.ga('merged.send', 'pageview', {
        'sessionControl': 'start'
    });*/

    /*
    window.ga(function(tracker) {
        linker = new window.gaplugins.Linker(tracker);
    });*/

}


function clean(string) {
    string = string || "";
    try  {
        string.string.toLowerCase();
    } catch (_) {}
    return string;
}

function trackPage(page) {
    page = clean(page);
    page = '/app/' + page;
    if (active) {
        window.ga('set', 'page', page);
        window.ga('send', 'pageview');

        window.ga('merged.set', 'page', page);
        window.ga('merged.send', 'pageview');
    }
    if (debug) {
        console.log("Track Page: " + page);
    }
}

function trackEvent(cat, name, label) {
    cat = clean(cat);
    name = clean(name);
    label = clean(label);
    if (active) {
        label = label || "";
        window.ga('send', 'event', cat, name, label);
        window.ga('merged.send', 'event', cat, name, label);
    }
    if (debug) {
        console.log("Track Event: " + cat + " : " + name + " : " + label);
    }

}

function trackTiming(cat, identifier, time) {
    cat = clean(cat);
    identifier = clean(identifier);
    identifier = identifier.toLowerCase();
    if (active) {
        time = time || new Date().getTime() - window.performance.timing.domComplete;
        window.ga('send', 'timing', cat, identifier, time);
        window.ga('merged.send', 'timing', cat, identifier, time);
    }

}

function decorateUrl(url) {
    return url;
    // return linker.decorate(url);
}


module.exports = {
    trackTiming: trackTiming,
    trackPage: trackPage,
    trackEvent: trackEvent,
    decorateUrl: decorateUrl
};