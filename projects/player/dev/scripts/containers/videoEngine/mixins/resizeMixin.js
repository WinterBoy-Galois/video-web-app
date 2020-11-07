module.exports = {

	componentDidMount: function() {
		window.addEventListener('resize', this.onWindowResize);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this.onWindowResize);
	}
};