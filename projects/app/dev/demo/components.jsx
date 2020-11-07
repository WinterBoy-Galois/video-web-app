// include stayles
require('style/style.css');

var React = require('react'),
	ReactDom= require('react-dom'),

	pages = {
		components: require('./comps'),
		strings: require('./strings'),
		simple_modals: require('./modals'),
		modals_pages: require('./app_components')
	};



/*
 *	Template
 */
function r() {

	// get sections to render
	var folders = ['components'];

	try {
		folders = window.location.hash.substr(1).split('/');
	} catch(_){}

	var name = folders[0] || 'components';

	var PageContent = pages[name];

	return (
		<div className = 'vp_demo_page'>
			<div>
				<span><a href = '#components' className = {name == 'components' ? 'vp_active':''} >Foundation Components</a> | </span>
				<span><a href = '#strings' className = {name == 'strings' ? 'vp_active':''}>Strings</a> | </span>
				<span><a href = '#simple_modals' className = {name == 'simple_modals' ? 'vp_active':''}>Simple Modals</a> | </span>
				<span><a href = '#modals_pages' className = {name == 'modals_pages' ? 'vp_active':''}>Modals & Pages</a></span>
			</div>
			<PageContent folders={folders}/>
		</div>
	);
}

/*
 *	Class
 */
var Comp = React.createClass({
	componentWillMount: function(){
		var _this = this;
		window.onhashchange = function(){
			_this.forceUpdate();
		};
	},
	render: r,
});



ReactDom.render(<Comp />, document.getElementById("vp_style"));