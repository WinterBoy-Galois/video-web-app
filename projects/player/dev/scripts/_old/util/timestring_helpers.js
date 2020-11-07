function secondsToString(seconds, addmillis) {
    if (isNaN(seconds)) {
        return "00:00" + (addmillis ? ".00" : "");
    }

    var millis;
    if (addmillis) {
        millis = (seconds - Math.floor(seconds)) + "";
        millis = millis.substring(2, 1 + 2);
        if (millis.length < 1) {
            millis = "0";
        }
        millis += "0";
    }

    // mins
    var minutes = Math.floor(seconds / 60) + '';
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }

    // seconds
    seconds = Math.floor(seconds % 60) + '';
    if (seconds.length < 2) {
        seconds = "0" + seconds;
    }


    return minutes + ":" + seconds + (addmillis ? ("." + millis) : "");
}

function stringToSeconds(string) {
    var segments = string.split(":", 3);
    var i;
    for (i = 0; i < segments.length; i++) {
        segments[i] = parseFloat(segments[i]);
        if (isNaN(segments[i])) {
            return -1;
        }
    }
    if (segments.length === 1) {
        return segments[0];
    } else {
        return segments[0] * 60 + segments[1];
    }
}

module.exports = {
    secondsToString: secondsToString,
    stringToSeconds: stringToSeconds
};