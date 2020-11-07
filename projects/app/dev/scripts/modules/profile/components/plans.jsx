var _ = require('underscore'),
	React = require('react'),
	plansConfig = require('config/plans'),
	
	// strings
	s = require('strings')('settings.plans'),

	BackboneMixin = require('mixins/backbone'),

	// components
	AppPage = require('components/app_page'),
	PageSection = require('components/pageSection'),
	Forms = require('components/forms'),
	Button = require('components/button'),

	PlanBlock = require('./components/plan_block'),

	SubscriptionInfo = require('./components/subscription_info');


function rPlans(config) {
	return <PlanBlock 
		key={config.title} 
		config={config} />;
};

function r() {

	var plans = this.props.plans,
		currentPlan = this.props.subscription.plan;

	// prepare dynamic plan info
	var _plansConfig = _.map(plansConfig,function(plan){

		var vars = {
			price:'-'
			},
			remotePlanInfo = plans.findWhere({
				payment_interval: 'month',
				group:plan.id
			});

		// set price
		if (!plan.subscribable) {
			vars.price = 'Contact us';
			vars.button = 'contact_us';
		} else if (remotePlanInfo) {
			vars.price = remotePlanInfo.priceFormatted();
		};


		// set button
		if ( currentPlan.isIndividualPlan()) {
			vars.button = 'contact_us';
		} 

		else if ( currentPlan.get('group') == plan.id ) {
			vars.button='current';
		} 

		else if (remotePlanInfo && plan.subscribable && remotePlanInfo.isFreePlan()) {
			vars.button='downgrade';
		}

		else if ( plan.subscribable ){
			vars.button='subscribe';
		}

		else {
			vars.button = 'contact_us';
		}

		return _.extend(plan, vars);

	});

	// prepare expanded
	var moreLink = this.state.expanded ? 'Less features ▲' : 'More features ▼',
		blocksClass = this.state.expanded ? 'vp_plan_blocks vp_expanded': 'vp_plan_blocks';

	return (
		<AppPage 
			hasBackButton
			title={s('title')}
			compAboveSheet = {s('txt_top')}
			size='large'
			className = 'vp_plans'
			hasLoadingIndicator
			>
			<p className='vp_plan_info'>
				<strong>All plans include</strong><br />
				Videopath video builder access<br />
				Embeddable HTML5 player<br />
				Compatible with top content management systems<br />
			</p>
			<div className = {blocksClass}>
				{_.map(_plansConfig,rPlans)}
			</div>
			<div className = 'vp_clearfix'></div>
			<div className = 'vp_more_link' onClick={this.onMoreClick}>{moreLink}</div>
			<br /><br />
				{s('txt_custom')}
			<br />
		</AppPage>
		);
}



module.exports = React.createClass({

	mixins: [BackboneMixin],

	onMoreClick: function() {
		this.setState({
			expanded:!this.state.expanded
		});
	},

	render: r,

	backboneProps: ['plans', 'subscription'],

	componentDidMount: function(){
		this.props.subscription.fetch();
		this.props.plans.fetch();
	},

	getInitialState: function(){
		return {expanded:false};
	},

	propTypes: {
	    plans: BackboneMixin.PropTypes.Collection.isRequired,
	    subscription: BackboneMixin.PropTypes.Model.isRequired,
	},
	
});
