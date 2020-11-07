var modernizr = require('modernizr');

var hasTouchAction = document && document.body && (document.body.style.touchAction != null || document.body.style.msTouchAction != null);

// Chrome version - zero for other browsers
var chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

// old IE version
// from: http://stackoverflow.com/questions/7234092/detect-older-ie-versions
var ieVersion = (function() {
    var undef, v = 3,
        div = document.createElement('div');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        div.getElementsByTagName('i')[0]
    );
    return v > 4 ? v : undef;
}());

var oldIE = ieVersion && ieVersion < 9;

/* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.  */
var isWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

/* Android requires exceptions.  */
var isAndroid = navigator.userAgent.indexOf('Android') > 0 && !isWindowsPhone;

/* iOS requires exceptions.  */
var isIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !isWindowsPhone;

/* BlackBerry requires exceptions. */
var isBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

var needFastClick =
    (typeof window.ontouchstart === 'undefined' ||
        (isAndroid && chromeVersion) ||
        isBlackBerry10 ||
        hasTouchAction) ?
    false : true;

// test if this is a mobile device (phone or tablett)
var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

// test for iphone and ipad
var iPad = (/iPad/i.test(navigator.userAgent));
var iPhone = (/iPod|iPhone/i.test(navigator.userAgent));

// def if this is a phone or tablet
var phone = false;
var tablet = false;

// def phone or tablet
if (mobile) {

    if (iPad) {
        tablet = true;
    } else if (iPhone) {
        phone = true;
    }

    if (/Android/i.test(navigator.userAgent)) {
        phone = (/mobile/i.test(navigator.userAgent));
        tablet = !phone;
    }

}

var browserSupported = modernizr.svg && !oldIE;

module.exports = {

    // features
    supportsSVG: modernizr.svg,

    // device
    mobile: mobile,
    isIOS: isIOS,
    iPad: iPad,
    iPhone: iPhone,
    isAndroid: isAndroid,
    isBlackBerry10: isBlackBerry10,

    phone: phone,
    tablet: tablet,

    // general support
    browserSupported: browserSupported,
    needFastClick: needFastClick
};