require('ga');


var active = true,
    debug = false,
    customCode = false,
    videoKey = "",

    playedSeconds = [],
    replayedSeconds = [],
    lastReportedSecond = -5;

if (active) {
    window.ga('create', 'UA-46402960-4', 'auto');
    window.ga('set', 'page', '/');
    window.ga('send', 'pageview', {
        'sessionControl': 'start'
    });
}

function clean(string) {
    if (!string) {
        string = "";
    }
    try {
        string = string.toLowerCase();
    } catch (_) {}
    return string;
}

function setCustomGACode(code) {

    if (active) {
        customCode = code;
        window.ga('create', code, 'auto', {
            'name': 'custom'
        });
        window.ga('custom.set', 'page', '/' + videoKey);
        window.ga('custom.send', 'pageview', {
            'sessionControl': 'start'
        });
    }

}

function trackEvent(cat, name, label) {
    cat = clean(cat);
    name = clean(name);
    label = clean(label);
    if (active) {
        label = label || "";
        window.ga('send', 'event', cat, name, label);

        if (customCode) {
            window.ga('custom.send', 'event', cat, name, label);
        }

        if (debug) {
            console.log("GA: Event: " + cat + ": " + name + ": " + label);
        }
    }
}

function setVideoKey(key) {
    videoKey = key;
    if (active) {
        window.ga('set', 'dimension1', key);
        if (debug) {
            console.log("GA: Video Key: " + key);
        }
    }
}

function trackTiming(category, identifier, time) {
    category = clean(category);
    identifier = clean(identifier);
    if (!window.performance || window.performance.timing) {
        return;
    }
    if (active) {
        time = time || new Date().getTime() - window.performance.timing.domComplete;
        window.ga('send', 'timing', category, identifier, time);
    }
}

function trackPlaybackSecond(second, duration) {
    if (!active) {
        return;
    }
    if (debug) {
        console.log("GA: Playback Second: " + second + ": " + duration);
    }
    second = Math.round(second);
    duration = Math.round(duration);
    if (playedSeconds[second]) {
        if (!replayedSeconds[second] && lastReportedSecond != second) {
            replayedSeconds[second] = true;
            updatePlaybackSecondsDimension(true, duration);
        }

    } else {
        playedSeconds[second] = true;
        updatePlaybackSecondsDimension(false, duration);
    }
    lastReportedSecond = second;
}

function updatePlaybackSecondsDimension(replays, duration) {

    var dimension = replays ? "dimension4" : "dimension3";
    var valueArray = replays ? replayedSeconds : playedSeconds;

    var result = "";
    var segmentValue = 0;
    var segmentMultiplier = 1;

    for (var i = 0; i <= duration; i++) {
        var value = valueArray[i] ? valueArray[i] : false;
        var mod = (i + 1) % 8;
        segmentValue += value ? segmentMultiplier : 0;
        segmentMultiplier = segmentMultiplier * 2;
        if (mod === 0) {
            result = result + String.fromCharCode(segmentValue);
            segmentValue = 0;
            segmentMultiplier = 1;
        }
    }
    // very nice
    if (window.btoa) {
        result = btoa(result);
        window.ga('set', dimension, result);
    }

    // invert

    /*
    result = atob(result);

    var line = "";
    for ( i = 0; i < result.length; i++ ) {
        var c = result.charCodeAt(i);
        var lineseg = "";
        for ( var count = 128;  count >= 1;  count = count / 2 ) {

            if ( c >= count ) {
                c -= count;
                lineseg = "|" + lineseg;
            } else {
                lineseg = "_" + lineseg;
            }
        }
        line += lineseg;

    }
    */
}

module.exports = {
    trackEvent: trackEvent,
    setVideoKey: setVideoKey,
    trackTiming: trackTiming,
    trackPlaybackSecond: trackPlaybackSecond,
    setCustomGACode: setCustomGACode
};