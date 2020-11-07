function fullscreenAvailable() {
    return document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled;
}

function isFullscreen() {
    return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
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

function registerChangeHandler(handler) {
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    document.addEventListener("mozfullscreenchange", handler);
    document.addEventListener("MSFullscreenChange", handler);
}

module.exports = {
    fullscreenAvailable: fullscreenAvailable,
    isFullscreen: isFullscreen,
    showFullscreen: showFullscreen,
    hideFullscreen: hideFullscreen,
    registerChangeHandler: registerChangeHandler
};