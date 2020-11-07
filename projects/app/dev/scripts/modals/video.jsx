var React = require('react'),
	Modal = require('components/modal');

/*
 *	Template
 */
var VideoModal = function(props) {
	var src = "//www.youtube.com/embed/" + props.videoKey;
	return (
		<Modal 
			{...props} 
			hasCloseButton 
			className = 'vp_video' 
			theme='blue'>
			<iframe width="100%" height="100%" src={src} frameBorder="0" allowFullScreen>
			</iframe>
		</Modal>
	);
};

module.exports = VideoModal;



