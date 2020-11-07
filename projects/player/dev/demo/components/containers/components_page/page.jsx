var _ = require('underscore'),
	React = require('react'),
	Menu = require('../../components/menu');

var pages = {
	static: require('./static'),
	media: require('./media'),
	social: require('./social')
};
/*
 *	Template
 */
function r() {

	var pageName = this.props.path[1];
	if (!pages[pageName]) pageName = 'static';

	var Page = pages[pageName];

	return (
		<div>
			<Menu
				current={pageName}
				onChange={this.props.onComponentChanged}
				values={_.keys(pages)} 
				title = 'subpage'/>
			<div className = 'vp_demo_components'>
				<Page />
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

module.exports._pages = pages;

