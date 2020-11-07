var React = require('react');

function onClick() {
	this.refs.fileInput.click();
}

function onEnter(e) {
	e.preventDefault();
	this.setState({
		over:true,
		error: false
	});
}

function onLeave(e) {
	e.preventDefault();
	this.setState({
		over:false
	});
}

function onDrop(e) {
	if (e.dataTransfer && e.dataTransfer.files.length) {
		onFileSelected.bind(this)(e.dataTransfer.files[0]);
	}
	e.preventDefault();
	this.setState({
		over:false
	});
}

function onFileInputChange() {
	var files = this.refs.fileInput.files;
    if (files.length > 0) {
        onFileSelected.bind(this)(files[0]);
    }
}

function onFileSelected(file) {
	this.props.onFileSelected(file);
}

/*
 *	Template
 */
function r() {

	var centerText = this.state.over ? 'Drop now!' : '+',
		infoText = this.state.over ? '' : this.props.text;

	return (
		<div 
			className = {'vp_dropzone' + (this.state.over ? ' vp_over': '')} 
			>
			<input 
				type='file' 
				ref='fileInput' 
				onChange={onFileInputChange.bind(this)} />
			<div className = 'vp_plus'>{centerText}</div>
			<div className = 'vp_info'>{infoText}</div>
			<div 
				className = 'vp_mouse_capture' 
				onClick = {onClick.bind(this)} 
				onDragEnter= {onEnter.bind(this)}
				onDragOver = {onEnter.bind(this)}
				onDragLeave = {onLeave.bind(this)}
				onDrop = {onDrop.bind(this)}
				/>
		</div>
	);
}

module.exports = React.createClass({
	render:r,
	onClick:onClick,
	getInitialState: function(){
		return {
			over:false,
			error: false
		};
	},
	propTypes: {
		text: React.PropTypes.string,
	    onFileSelected: React.PropTypes.func.isRequired
	}
});



