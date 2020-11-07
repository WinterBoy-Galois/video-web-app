/*
 * Manage fullscreen state
 */

function supportsFullscreen() {
    return document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled;
}

function isFullscreen() {
    var val = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

    return val !== undefined;
}

function showFullscreen(element) {
    var docElm = element || document.documentElement;
    var requestFullscreen = docElm.requestFullscreen || docElm.mozRequestFullScreen || docElm.webkitRequestFullScreen;
    if (requestFullscreen) {
        requestFullscreen.call(docElm);
    }
}

function hideFullscreen() {
    var cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen ||  document.cancelFullScreen || document.exitFullScreen;
    if (cancelFullScreen) {
        cancelFullScreen.call(document);
    }
}

function addChangeHandler(handler) {
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    document.addEventListener("mozfullscreenchange", handler);
    document.addEventListener("MSFullscreenChange", handler);
}

function removeChangeHandler(handler) {
    document.removeEventListener("fullscreenchange", handler);
    document.removeEventListener("webkitfullscreenchange", handler);
    document.removeEventListener("mozfullscreenchange", handler);
    document.removeEventListener("MSFullscreenChange", handler);
}

function toggleFullscreen(element) {
    if (isFullscreen()) {
        hideFullscreen();
    } else {
        showFullscreen(element);
    }
}

module.exports = {
    supportsFullscreen: supportsFullscreen,
    isFullscreen: isFullscreen,
    showFullscreen: showFullscreen,
    hideFullscreen: hideFullscreen,
    toggleFullscreen: toggleFullscreen,
    addChangeHandler: addChangeHandler,
    removeChangeHandler: removeChangeHandler
};