/* 
 * Values

 	* needsDirectTouchToStartOnMobile:
 	* Indicates, that the user has to be able to directly click the engine 
 	* to start playback on mobile devices

 	* forcesFullscreenOnMobile:
 	* indicates that this engine forces fullscreen videos on mobile

 */

module.exports = { 

	brightcove: {
	},

	vimeo: {
		needsDirectTouchToStartOnHandheld: true,
        forcesFullscreenOnMobile: true
	},

	wistia: {
		needsDirectTouchToStartOnHandheld: true
	},

	youtube: {
		needsDirectTouchToStartOnHandheld: true,
		canPlaybackInline: true
	},

	movingimages: {

	},

	dummy: {

	},

	sprites: {

	},

	custom: {
		canPlaybackInline: true
	},

	native: {
		canPlaybackInline: true
	},

	videopath: {
		canPlaybackInline: true
	}


};