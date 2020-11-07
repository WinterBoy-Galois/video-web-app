// imports
require('./polyfills');
require('../style/style.css');

var lightbox_template = require('./templates/lightbox.html'),
    analytics = require('./analytics'),
    util = require('./util'),
    isSmallMobileDevice = (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));


/*
 *  Configuration
 */
var MIN_LIGHTBOX_WINDOW_WIDTH = 640,
    PLAYER_URL = '//player.videopath.com/{{video_id}}/index.html?autoplay=1';

var defaultConfig = {
    id: false,
    retain_aspect: 1.77,
    lightbox_margin: "3"
};


/*
 *  State
 */
var currentVideo = null,
    connectedListeners = [];

/*
 *  Initialize
 */
function init() {

    // only setup once
    if (window.videopath_lightbox) return;

    // expose 'API'
    window.videopath_lightbox = {
        initialized: true,
        showVideo: showVideo
    };

    // connect resize event
    window.addEventListener('resize', onBrowserResize, false);

    setInterval(rescan, 500);
    rescan();

}

function rescan() {
    // register click listener for videopath divs
    var videos = document.querySelectorAll(".vp_thumbnail");
    var setupVideo = function(video) {

        for (var i = 0; i < connectedListeners.length; i++) {
            if (video === connectedListeners[i]) return;
        }

        connectedListeners.push(video);
        var id = video.getAttribute("data-videopath-id");
        analytics.trackThumbnailLoad(id);
        video.addEventListener('click', function() {
                showVideoFromElement(video);
            }, false);
        };

    for (var i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}


/*
 *  Show Video
 */
function showVideo(config) {
    if (currentVideo) return;
    if (!config.id) return;

    // prepare config
    var attr;
    for (attr in defaultConfig) {
        if (!(attr in config)) {
            config[attr] = defaultConfig[attr];
        }
    }

    // save info about current video
    currentVideo = {
        config: config
    };

    // get video url
    var video_url = PLAYER_URL.replace("{{video_id}}", config.id);
    if (config.custom_url) {
        video_url = config.custom_url;
    }

    analytics.trackThumbnailClick(config.id);

    // if we're on a small device, rather jump to a new
    // tab than using the lightbox
    if (util.windowWidth() < MIN_LIGHTBOX_WINDOW_WIDTH ||isSmallMobileDevice ) {
        window.location.href = video_url;
        currentVideo = null;
    } else {
        showLightbox(video_url);
    }
}

function showVideoFromElement(element) {
    var config = {
        id: element.getAttribute("data-videopath-id"),
        retain_aspect: element.getAttribute("data-videopath-retain-aspect")
    };
    showVideo(config);
}


/*
 *  Hide Video
 */
function hideVideo() {
    if (!currentVideo) return;
    var el = currentVideo.element;
    el.className = '';
    setTimeout(function() {
        document.body.removeChild(el);
        currentVideo = null;
    }, 300);
}


/*
 *  Show the actual lightbox
 */
function showLightbox(url) {

    //build lighbox Element
    var lightboxElement = document.createElement('div'),
        template = lightbox_template.replace("{{frame_src}}", url);
    lightboxElement.id = 'vp_lightbox';
    lightboxElement.innerHTML = template;
    currentVideo.element = lightboxElement;

    // append to body
    document.body.appendChild(lightboxElement);
    onBrowserResize();

    // show animation (css animations)
    setTimeout(function() {
        lightboxElement.className = 'vp_show';
    }, 16);

    // listen to close event
    lightboxElement.addEventListener('click', function() {
        hideVideo();
    }, false);

    // focus iframe
    var iframe = lightboxElement.getElementsByTagName('iframe')[0];
    if (iframe) {
        var focus = function() {
            try {
                iframe.focus();
                iframe.contentWindow.focus();
                iframe.contentWindow.document.body.focus();
            } catch (e) {}
        };
        setTimeout(focus, 100);
        iframe.addEventListener('load', focus, false);
    }
}


function onBrowserResize() {

    // if no video, don't eval
    if (!(currentVideo && currentVideo.element)) return;

    // set window size based
    var ww = util.windowWidth(),
        wh = util.windowHeight(),
        el = currentVideo.element;

    el.style.height = wh + 'px';

    // handle aspect ratio if set
    var aspect = currentVideo.config.retain_aspect;
    if (!aspect) {
        return;
    }

    var defaultMargin = currentVideo.config.lightbox_margin / 100,
        marginVert = 0,
        marginHor = 0,
        windowAspect = (ww / wh),
        percent,
        offset;

    if (windowAspect > aspect) {
        percent = aspect / windowAspect;
        offset = Math.floor((1 - percent) * ww * 0.5);
        marginHor = offset;
    } else {
        percent = windowAspect / aspect;
        offset = Math.floor((1 - percent) * wh * 0.5);
        marginVert = offset;
    }

    marginVert += (defaultMargin * wh);
    marginHor += (defaultMargin * ww);

    marginVert = Math.floor(marginVert) + "px";
    marginHor = Math.floor(marginHor) + "px";

    var wrapper = el.querySelector('.vp_frame_wrapper');
    wrapper.style.top = wrapper.style.bottom = marginVert;
    wrapper.style.left = wrapper.style.right = marginHor;
}

/*
 *  Start
 */
util.onDocumentLoad(init);