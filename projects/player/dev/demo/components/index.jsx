// include stayles
require('css/base.scss');
require('css/demo/page.scss');
require('css/demo/components.scss');
require('css/demo/containers.scss');

var React = require('react'),
	ReactDom= require('react-dom'),
	ReactRedux = require('react-redux'),
	App = require('./containers/app'),

	store = require('./store');



ReactDom.render(
	<ReactRedux.Provider store={store}>
		<App />
	</ReactRedux.Provider>,
	document.getElementById("vp_style")
);