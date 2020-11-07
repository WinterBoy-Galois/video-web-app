function windowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

function windowHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function onDocumentLoad(callback) {
    document.addEventListener('DOMContentLoaded', callback);
    // IE 8
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            callback();
        }
    };

    if (document.readyState == "complete") {
        callback();
    }
}

module.exports = {
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    onDocumentLoad: onDocumentLoad
};