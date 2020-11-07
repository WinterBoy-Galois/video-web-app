var React = require('react');


/*
 *	Template
 */
function r() {
	return (
		<div className = {'vp_demo_section_component ' + this.props.className}>
			<h1>{this.props.title}</h1>
			<div className = 'vp_demo_section_content'>
				{this.props.children}
			</div>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



