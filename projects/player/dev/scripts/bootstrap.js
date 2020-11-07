var autoplay = window.location.href.indexOf("autoplay") >= 0,
    style = "#vp_bootstrap #vp_playbutton #vp_playbutton_icon { fill:<arrowColor>; }   #vp_bootstrap #vp_playbutton {background-color:<color>;} #vp_bootstrap #vp_playbutton:hover {background-color:<colorHover>;}",
    buildMode = window.location.href.indexOf("build") >= 0,
    previewMode = window.location.href.indexOf("preview") >= 0,
    isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
    isIPhone = (/iPhone|iPod/i.test(navigator.userAgent)),
    isIPad = (/iPad/i.test(navigator.userAgent));

var currentStyleNode;

var apiObj = {
    loaded: true
};
var conf = document.videopath.player.conf;
document.videopath = document.videopath || {};
document.videopath.player = document.videopath.player ||  {};
document.videopath.player.bootstrap = apiObj;


var videoSupportsIPhone = conf.video.source && (conf.video.source.iphone_support ||  conf.video.source.sprite_support);

// disable autoplay on mobile platforms
if (isMobileDevice) {
    autoplay = false;
}


/*
 *  Helpers
 */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var platformSupported = !(isIE() && isIE() < 10);

function addStyle(style) {

    if (!platformSupported) return;

    var head = document.head || document.getElementsByTagName('head')[0];

    if (currentStyleNode) {
        head.removeChild(currentStyleNode);
    }

    currentStyleNode = document.createElement('style');
    currentStyleNode.innerHTML = style;
    head.appendChild(currentStyleNode);
}

function addClass(el, className) {
    if (el.className.indexOf(className) < 0) {
        el.className += " " + className;
    }
}

function removeClass(el, className) {
    el.className = el.className.replace(className, "");
}

function calculateLuma(hexcode) {
    var c = hexcode.substring(1), // strip #
        rgb = parseInt(c, 16), // convert rrggbb to decimal
        r = (rgb >> 16) & 0xff, // extract red
        g = (rgb >> 8) & 0xff, // extract green
        b = (rgb >> 0) & 0xff; // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}

/*
 *	Dynamic vars
 */
var div_status = document.getElementById('vp_status'),
    div_playbutton = document.getElementById('vp_playbutton'),
    div_poster = document.getElementById('vp_poster'),
    div_bootstrap = document.getElementById('vp_bootstrap'),
    div_loader = document.getElementById('vp_loader');


/*
 * API Methods
 */
apiObj.remove = function() {
    addClass(div_bootstrap, "vp_hidden");
    setTimeout(function() {
        div_bootstrap.parentNode.removeChild(div_bootstrap);
        document.videopath.player.bootstrap = null;
    }, 200);
};

apiObj.goToLoadingMode = function(hidePoster) {
    div_status.innerHTML = "Loading Video";
    addClass(div_playbutton, "vp_hidden");
    if (hidePoster) {
        addClass(div_poster, "vp_hidden");
    }
    div_loader.className = "vp_rotating";
};

apiObj.leaveLoadingMode = function() {
    div_status.innerHTML = "";
    removeClass(div_playbutton, "vp_hidden");
    removeClass(div_poster, "vp_hidden");
    div_loader.className = "vp_hidden";
};

apiObj.mainAppStarted = function() {
    if (buildMode ||  previewMode ||  isMobileDevice) {
        apiObj.leaveLoadingMode();
    }
};

apiObj.setThumbnail = function(url) {
    // only load once
    if (!url || this.thumbnailSet) {
        return;
    }
    this.thumbnailSet = true;
    var img = document.createElement('img');
    img.onload = function() {
        if (!apiObj.play_button_tapped) {
            div_poster.style.backgroundImage = "url('" + url + "')";
            removeClass(div_poster, "vp_hidden");
        }
    };
    img.src = url;
};

apiObj.setColors = function(buttonColor, buttonColorHover, arrowColor) {

    if (!arrowColor) {
        if (conf.buttonColor && calculateLuma(buttonColor) > 125) {
            arrowColor = "#222222";
        } else {
            arrowColor = "#ffffff";
        }
    }

    s = style.replace("<color>", buttonColor).replace("<colorHover>", buttonColorHover).replace("<arrowColor>", arrowColor);
    addStyle(s);
};

if (autoplay && platformSupported) {
    div_playbutton.parentNode.removeChild(div_playbutton);
    apiObj.goToLoadingMode(true);
}


apiObj.setColors(conf.buttonColor, conf.buttonColorHover, conf.arrowColor);

/*
 * On iPhone, iPod or iPad make bootstrap transparent to touch events
 * So the underlying player can be triggered
 */
if ((isIPhone && !videoSupportsIPhone) || isIPad) {
    addClass(div_bootstrap, "vp_touch_ready");
}


/*
 *  Load background image
 */
if (!autoplay) {
    apiObj.setThumbnail(conf.thumbnail);
}


/*
 *	Check compat
 */
if (!platformSupported) {
    apiObj.goToLoadingMode(true);
    div_status.innerHTML = "Internet Explorer 9 and earlier are not supported. Please upgrade to a newer Version of your Browser!";
    addClass(div_playbutton, "vp_hidden");
} else {

    // in builder mode, display loading indicator
    if (buildMode || previewMode || isMobileDevice) {
        apiObj.goToLoadingMode(false);
    }

    // load our scripts
    var src = conf.srcURL + "desktop.js",
        s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.body.appendChild(s);

    // load youtube
    // needs refinement
    s = document.createElement('script');
    s.src = "//www.youtube.com/iframe_api";
    s.async = true;
    document.body.appendChild(s);
}

/*
 * Detect click on playbutton
 */
div_bootstrap.onmousedown = function() {

    apiObj.play_button_tapped = true;

    // if player is already loaded, command play
    if (document.videopath.player.api) {
        document.videopath.player.api.command("play");
        apiObj.goToLoadingMode(true);
    } else {
        apiObj.goToLoadingMode(true);
    }
};