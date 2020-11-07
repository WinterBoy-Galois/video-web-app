var _ = require('underscore'),

	React = require('react'),

	Dropzone = require('components/dropzone'),
	ProgressBar = require('components/progressBar'),

	uploadFileOp = require('app/operations/uploadFile');


function onFileSelected(file) {
	var _this = this;

	_this.setState({
		uploading:true,
		uploadProgress:0
	});

	uploadFileOp({
        file: file,
        video: _this.props.video,
        team: _this.props.team
    }, {
    	accessScope: _this.props.team
    }).always(function() {
        _this.setState({
        	uploading:false
        });
    })
    .then(function() {
    	_this.props.onDone();
    })
    .progress(function(progress) {
        _this.setState({
        	uploadProgress:progress
        });
    });
}

/*
 *	Template
 */
function r() {

	var content = (
		<Dropzone 
			text = 'Drop your video file here!'
			onFileSelected = {onFileSelected.bind(this)} />);

	if ( this.state.uploading ) {
		content = (
			<div>
				<br />
				<h3> Uploading your file</h3>
				<ProgressBar progress={this.state.uploadProgress} />
				<p>Please don't leave this screen until the upload has completed</p>
			</div>);
	};

	return (
		<div className = 'vp_upload_form'>
			{content}
		</div>
	);

}

module.exports = React.createClass({
	render: r,
	getInitialState: function(){
		return {
			uploading:false,
			uploadProgress: 0
		};
	},
});