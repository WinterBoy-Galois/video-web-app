module.exports = {
	componentDidMount: function() {
		this.props.onStateChange('initializing');
		this.props.onBufferChange(0);
		this.props.onProgressChange(0);
		this.setup();
	},
};