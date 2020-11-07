require('css/components/loadingIndicator.scss');


var conf = document.videopath.player.conf;
var util = require('./util');


/*
 * Dom References
 */
var vppLoader = document.getElementById('vpp_loading_indicator'),
	vppLoaderBackground = document.getElementById('vpp_loading_indicator_background'),
	vppLoaderInnerCubes = document.getElementsByClassName('vpp_loading_indicator_inner_cube');

Array.prototype.filter.call(vppLoaderInnerCubes, function(cube){
    cube.style.backgroundColor = conf.buttonColor;
});
// vppLoaderBackground.style.backgroundColor = '#777777';

module.exports = {
	show:function() {
		vppLoader.style.opacity=1;
	}
};