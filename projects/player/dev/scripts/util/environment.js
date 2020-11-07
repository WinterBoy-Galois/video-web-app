/*
 * Detect stuff about environment
 */

var fullscreenHelper = require('./fullscreenHelper'),
	getQueryParameters = require('util/getQueryParameters');

/*
 * Helpers
 */
function isIE (userAgent) {
	var myNav = userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function detect(userAgent) {

	if (!userAgent) {
		userAgent = navigator.userAgent;
	}

	var isIPhone = !!userAgent.match(/iPhone|Ipod/i),
		isIPad = !!userAgent.match(/iPad/i),
		isAndroid = !!userAgent.match(/android/i),
		isWindowsPhone = !!userAgent.match(/windows phone/i);

	var isHandheld = isIPhone || isAndroid ||isIPad ||isWindowsPhone;

	var isSafari = !!userAgent.match(/Safari/i) && !userAgent.match(/Chrome/i);

	var isiOS10Plus = (isIPhone || isIPad) && !!userAgent.match(/Version\/1/i);

	/*
	 * Special case facebook browser, where the user agent string for ipad also contains the phrase iPhone
	 * Here, if 'iPad' is contained in the link, we switch to iPad only
	 */
	if ( !!userAgent.match(/FBAN/i) && !!userAgent.match(/iPad/i)) {
		isIPhone = false;
		isIPad = true;
	}

	var platformNeedsInlinePlayback = isiOS10Plus;

	var platformNeedsSpritePlayback = (isIPhone||isWindowsPhone) && !platformNeedsInlinePlayback;

	// check if autoplay should be started
	var autoplayRequested = document.location.href.indexOf('autoplay') > -1;

	// also check api obj for play requests that occured before main js was loaded
	try{
		if ( document.videopath.player.bootstrap.playRequested ) {
			autoplayRequested = true;
		}
	} catch(e){}


	/*
	 * Check if player is compatible with platform
	 */
	var platformSupported = true;

	// on IE lower than 10
	if (isIE (userAgent) && isIE (userAgent) < 10) {
		platformSupported = false;
	}

	// when no svg support
	if ( typeof SVGRect == "undefined" ) platformSupported = false;

	var result =  {

		// platforms...
		isIPhone: isIPhone,
		isIPad: isIPad,
		isAndroid: isAndroid,
		isWindowsPhone: isWindowsPhone,

		platformSupported: platformSupported,
		platformNeedsSpritePlayback: platformNeedsSpritePlayback,
		platformNeedsInlinePlayback: platformNeedsInlinePlayback, 

		isHandheld: isHandheld,

		isSafari: isSafari,

		supportsFullscreen: fullscreenHelper.supportsFullscreen(),

		// mobile browser do not encourage adding volume buttons
		supportsVolumeChanges: !isHandheld,

		// mobile browser usually have a native sharing button
		supportsNativeSharing: isHandheld,

		loadedSecurely: window && window.location.protocol == "https:",

		autoplayRequested: autoplayRequested,

		queryParameters: getQueryParameters()

	};

	return result;

};

module.exports = {
	detect:detect
};