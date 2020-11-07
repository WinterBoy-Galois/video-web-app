var React = require('react'),
	Modal = require('components/modal');

var ShareModal = function(){
	return (
		<Modal 
			{...this.props} 
			title = 'Share your video'
			hasCloseButton 
			className = 'vp_share' 
			theme='green'>
		</Modal>
	);
};

module.exports = ShareModal;



