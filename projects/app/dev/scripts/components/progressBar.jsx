var React = require('react');


var ProgressBar = function(props) {

	var text = props.text + ' ' + Math.floor(props.progress * 100) + ' %',
		innerStyle = {
			width: (props.progress * 100) + '%'
		};

	return (
		<div 
			className = 'vp_progressbar'>
			<div 
				className = 'vp_progressbar_inner' 
				style={innerStyle} />
			<div 
				className = {'vp_progress_text' + (props.progress > 0.5 ? ' vp_light': '')} >
				{text}
			</div>
		</div>
	);

};

ProgressBar.propTypes = {
	progress: React.PropTypes.number,
	text: React.PropTypes.string,
};

ProgressBar.defaultProps = {
	progress: 0,
	text: ''
};

module.exports = ProgressBar;


