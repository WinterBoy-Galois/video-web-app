var React = require('react'),
	Modal = require('components/modal'),
	Button = require('components/button'),

	routeOp = require('app/operations/route');

/*
 *	Template
 */
var AskImportModal = function (props) {
	var project_id = props.project_id;

	function onStartVideo() {
		props.onDone();
        setTimeout(function() {
    		routeOp({route:'project/' + props.project_id + '/videos/new'});
        }, 100);
	}

	function onSkip() {
		props.onDone();
        setTimeout(function() {
    		routeOp({route:'project/' + props.project_id + '/videos/blank'});
        }, 100);
	}

	return (
		<Modal {...props} onFail = {onSkip} hasCloseButton theme='blue' className = 'vp_welcome' title = 'Create a video now?' text = "Your project has been create successfully! You can now start adding a video.">
			<div className = 'vp_button_block'>
				<Button title = '&nbsp;&nbsp;&nbsp;SKIP&nbsp;&nbsp;&nbsp;' color = 'gray' onClick = {onSkip}/>
				<Button title = 'CONTINUE' color = 'green' onClick = {onStartVideo}/>
			</div>
		</Modal>  
	);
};

module.exports = AskImportModal;


