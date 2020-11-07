var _ = require('underscore'),
	React = require('react'),	
	websocket = require('../../util/websocket'),

	Menu = require('../../components/menu'),
	pages = {
		components: require('../components_page'),
		containers: require('../containers_page')
	};

function get_query(){
    var url = location.search;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        if (qs[i][0])
        	result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

/*
 *	Template
 */
function r() {
	var page = this.props.path[0];
	var Page = pages[page];

	function onPageChange(path) {
		this.props.onPageChange([path]);
	};

	return (
		<div className = 'vp_demo_page'>
			<Menu 
				values={_.keys(pages)}
				current={page}
				onChange={onPageChange.bind(this)}
				title = 'page'/>
			<Page />
		</div>
	);
}

/*
 *	Class
 */
var App = React.createClass({

	updatePath: function() {
		if (!window.location.hash.substr(1)) return;
		var folders = window.location.hash.substr(1).split('/');
		var queryVars = get_query();
		if ( folders )
			this.props.onPageChange(folders, queryVars);
	},

	updateState: function(state) {
		this.props.onStateUpdate(state);
	},

	componentWillMount: function(){
		// window.onhashchange = this.updatePath;
	},

	componentDidMount: function() {
		setTimeout(this.updatePath, 10);
		websocket.subscribe(this.updateState);
	},

	render: r,
});


module.exports = App;