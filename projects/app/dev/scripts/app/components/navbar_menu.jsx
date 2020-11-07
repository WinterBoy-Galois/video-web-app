var _ = require('underscore'),
numeral = require('numeral'),

React = require('react'),

sdk = require('sdk'),
config_main = require('config'),

Button = require('components/button'),
Icon = require('components/icon'),

routeOp = require('app/operations/route'),
showTutorialOp = require('app/operations/showTutorialModal');


var config = {
	
	'tutorial': {
		title: 'Watch Tutorial',
		icon: 'source',
		action: function(){
			showTutorialOp();
		}
	},

	'documentation': {
		title: 'Documentation',
		icon: 'books',
		action: function(){
			window.open('https://videopath.com/documentation/');
		}
	},


	'teams': {
		title: 'Projects',
		icon: 'videopath',
		action: function(){
			routeOp({route:'projects'});
		},
		feature: 'teams'
	},

	'settings': {
		title: 'Account',
		icon: 'video_info',
		action: function(){
			routeOp({route:'settings/account'});
		}
	},

	'billing': {
		title: 'Plans & Billing',
		icon: 'diamond',
		action: function(){
			routeOp({route:'settings/billing'});
		}
	},

	

	'signout': {
		title: 'Sign Out',
		icon: 'exit',
		action: function(){
			sdk.users.logout().done(function() {
                if(config_main.signOutURL.length > 0) {
                    window.location.href = config_main.signOutURL;
                    return null;
                } else {
                    routeOp({route:'login'});
                }
            });
		}
	}

};

function toggle() {
	this.setState({
		hidden:!this.state.hidden
	});
}

function show() {
	this.setState({
		hidden:false
	});
};

function hide() {
	this.setState({
		hidden:true
	});
};

function r() {

	function actionWrapper(action) {
		return function() {
			hide.bind(this)();
			action();
		};
	};

	var user = this.props.user,
		views = numeral(this.props.user.subscription.get('current_month_views')).format("0.[00]a");
	var _this = this;
	var entries = 
		<ul onMouseLeave={hide.bind(this)}>
			<li className = 'vp_user'><strong>{user.get('email')}</strong><br />{views} views this month</li>
			{ _.map(config, function(entry,key) {
				if (entry.feature && !user.canUseFeature(entry.feature))
					return false;
				return 	<li key={key} onClick = {actionWrapper(entry.action).bind(_this)} ><Icon type={entry.icon} /> {entry.title}</li>;
			})}
		</ul>;

	if (this.state.hidden) {
		entries = false;
	}

	return (
		<div className = 'vp_main_menu'>
			<Button icon='menu' color = 'blue' onClick = { toggle.bind(this) }/>
			{entries}
		</div>
	);
};


var NavBar = React.createClass({
	render:r,
	getInitialState: function(){
		return {
			hidden:true
		};
	}
});

module.exports = NavBar;


