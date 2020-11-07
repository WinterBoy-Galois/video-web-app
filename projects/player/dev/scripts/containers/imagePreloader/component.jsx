require('css/containers/imagePreloader.scss');

var React = require('react'),
	_ = require('underscore');


function renderContent(content) {
	if ( content.type === 'image') {
		return <img key = {content.key} src = {content.image_url} />;
	}
	return false;
}

function renderMarker(marker) {
	return _.map(marker.contents, renderContent);
}

function ImagePreloader(props) {
	return <div className = 'vpp_image_preloader'>
		{_.map(props.videoRevision.markers, renderMarker)}
	</div>;
}

/*
 *	Class
 */
module.exports = ImagePreloader;



