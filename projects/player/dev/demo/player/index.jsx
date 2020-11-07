// include stayles
// require('style/desktop_style.css'); // Old
require('css/base.scss');
require('css/demo/player.scss');


var _ = require('underscore'),
	videos = require('./videos'),
	React = require('react'),
	ReactDom = require('react-dom'),
	Player = require('mainContainers/player');


function rItem(item) {

	if ( item.id === '-') {
		return <tr><td>&nbsp;</td><td></td></tr>;
	}

	function onSelect() {
		window.location.hash = item.id;
	}

	var info = '-';

	if ( item.revision.source ) info = item.revision.source.service + ', ' + (item.revision.source.sprite_support ? 'iOS ' : ' no iOS ');

	

	return <tr key={item.id} onClick={onSelect}>
		<td>
			<span className='vpp_button'>{item.title}</span>
		</td>
		<td>
			{item.description}<br />
			<span className='vpp_info'>{info}</span>
		</td>
	</tr>;

};

/*
 *	Template
 */
function r() {

	if ( this.state.selectedVideoID !== false ) {
		var revision = _.findWhere(videos, {id:this.state.selectedVideoID}).revision;
		return <Player videoRevision = {revision} />;
	}

	return <div className = 'vpp_menu'>
		<h2>Test Videos</h2>
		<table>
			<tbody>
			{_.map(videos, rItem.bind(this))}
			</tbody>
		</table>
	</div>;
}

/*
 *	Class
 */
var App = React.createClass({

	componentWillMount:function() {
		this.updateFromHash();
		window.onhashchange = this.updateFromHash;
	},

	updateFromHash: function() {
		var hash = window.location.hash;
		hash = hash.replace('#', '');
		var v = _.findWhere(videos, {id:hash});
		this.onSelectVideo(v && hash ? hash : false);
	},

	getInitialState: function() {
		return {
			selectedVideoID:false
		};
	},
	onSelectVideo: function(id) {
		this.setState({
			selectedVideoID:id
		});
	},
	render: r,
});





ReactDom.render(
	<App />,
	document.getElementById("vpp_player_test")
);