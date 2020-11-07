var React = require('react'),
	Modal = require('components/modal'),
	Button = require('components/button'),

	routeOp = require('app/operations/route');

/*
 *	Template
 */
var WelcomeModal = function (props) {
	var src = "//www.youtube.com/embed/" + props.videoKey;

	function onStartVideo() {
		props.onDone();
		props.onStartVideo({
			team:props.team
		});
	}

	function onUseSample () {
		props.onDone();
		props.onUseSample({
			team:props.team
		}).then(function(result){
			routeOp({route:'video/' + result.get('id') + '/edit'});
		});
	}

	return (
		<Modal {...props} hasCloseButton theme='blue' className = 'vp_welcome' title = 'Welcome to Videopath!' text = "We're glad you're here. You can now start a new video or use our sample.">
			<div className = 'vp_button_block'>
				<Button title = 'Create new video' color = 'green' onClick = {onStartVideo}/>
				<div>-or-</div>
				<div>Use our sample<div className = 'vp_start_image' onClick = {onUseSample}></div></div>
			</div>
		</Modal>  
	);
};

module.exports = WelcomeModal;


