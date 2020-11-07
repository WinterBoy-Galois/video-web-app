var s = require('strings')('modals.create_video'),
	_ = require('underscore'),

	React = require('react'),

	BackboneMixin = require('mixins/backbone'),

	LoadingIndicator = require('components/loadingIndicator'),
	Modal = require('components/modal'),
	Icon = require('components/icon'),
	Selector = require('./selector'),
	Button = require('components/button'),

	importSourceOp = require('app/operations/importSource'),
	uploadFileOp = require('app/operations/uploadFile'),
	routeOp = require('app/operations/route'),
	
	config = require('./config');


function onTabSelected(index) {
	this.setState({
		selectedTab: index
	});
}

function onURLSubmitted(url) {
	var _this = this;
	_this.setState({loading:true});
	importSourceOp({
		url:url,
		video:this.props.video,
		team:this.props.team
		})
	.always(function(){
		_this.setState({loading:false});
	})
	.then(function(){
		_this.props.onDone();
	});
}

function onUpgradeButtonClicked() {
	routeOp({route:'settings/plans'});
}

/*
 *	Template
 */
function r() {

	var title = this.props.video ? s('title_change') : s('title_create'),
		content = '',
		height = 370,
		selectedTab = this.state.selectedTab;

	// nothing selected, show selector
	if ( selectedTab == -1 ) {
		height = _.size(_.where(config, {showInList:true})) > 3 ? 370 : 270;
		height = _.size(_.where(config, {showInList:true})) > 6 ? 470 : height;
		content = (
			<div key='select'>
				<h3>Please select how you host your videos</h3>
				<Selector 
					items = {config} 
					onSelected = {onTabSelected.bind(this)} />
				<p><a href = 'mailto:sales@vidoepath.com' target = '_blank'>Contact us</a> for information about other hosting options.</p>
			</div>);
	}

	// something selected, show that content block
	else if ( selectedTab > -1 ) {

		var tabConfig = config[selectedTab];
		title = title + ': ' + tabConfig.description;

		// regular component
		var component = 
			<tabConfig.Component 
				config={tabConfig}
				onURLSubmitted={onURLSubmitted.bind(this)}
				onDone={this.props.onDone}
				video={this.props.video}
				team={this.props.team}
				/>;
		height=tabConfig.height;

		// render upgrade notification if user can't use this feature
		if (!tabConfig.userHasAccess) {
			component = 
				<div className = 'vp_upgrade'>
					<Icon type='diamond' />
					<p>The feature <strong>{tabConfig.title}</strong> is not available on your current plan.</p>
					<Button color='green' title = 'Upgrade now!' onClick={onUpgradeButtonClicked}/>
				</div>;
			height=330;
		}

		content = (
			<div key = {tabConfig.key}>
				<p>
					← <a onClick={onTabSelected.bind(this,-1)}>Choose other hosting options</a>
				</p>
				{component}
				<div className='vp_hint'>{tabConfig.hint}</div>
			</div>
		);
		
	}
	
	return (
		<Modal 
			{...this.props} 
			hasCloseButton 
			title = {title} 
			theme = 'lightblue'
			className = 'vp_create_video'>
			<div style={{height:height}} className = 'vp_inner'>
				{content}
			<LoadingIndicator 
				expanded 
				visible={this.state.loading}/>
			</div>
		</Modal>
	);

}

module.exports = React.createClass({
	render: r,
	componentWillMount: function(){

		// inject wether user has access to an item
		config = _.map(config, function(item){
			item.userHasAccess = !item.permission || this.props.team.canUseFeature(item.permission);
			item.showInList = item.userHasAccess || !item.hidden;
			return item;
		}.bind(this));

		// if user only has access to one upload method
		// go to that tab
		if (_.size(_.where(config, {userHasAccess:true})) == 1 ) {
			this.setState({
				selectedTab:0
			});
		}

	},
	getInitialState: function() {
    	return {
    		selectedTab:-1,
    		loading:false
    	};
  	},
	propTypes: {
	    video: BackboneMixin.PropTypes.Model,
	    team:BackboneMixin.PropTypes.Model,
	    user:BackboneMixin.PropTypes.Model.isRequired
	},
});
