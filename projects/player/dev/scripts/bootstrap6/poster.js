
var calculateAspect = require('util/calculateAspectMetrics');

/*
 * Config
 */
var conf = document.videopath.player.conf;

/*
 * Dom References
 */
var vppPoster = document.getElementById('vpp_bootstrap_poster');

/*
 * Fade in poster
 */
var img = document.createElement('img');
img.onload = function() {
	resizePoster();
	vppPoster.style.opacity = 1;
};
img.src = conf.thumbnail;
vppPoster.src = conf.thumbnail;

/*
 * Resizing poster
 */
function resizePoster() {
	var aspect = img.naturalWidth / img.naturalHeight,
		style = calculateAspect(window.innerWidth, window.innerHeight, aspect, false);
	vppPoster.style.left = style.left +'px';
	vppPoster.style.top = style.top +'px';;
	vppPoster.style.width = style.width +'px';;
	vppPoster.style.height = style.height +'px';;
};

window.onresize = function(event) {
    resizePoster();
};



module.exports = {

};