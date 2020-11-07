var React = require('react'),
	
	// strings
	s = require('strings')('settings.billing'),

	BackboneMixin = require('mixins/backbone'),

	// components
	AppPage = require('components/app_page'),
	Forms = require('components/forms'),
	Button = require('components/button'),
	PageSection = require('components/pageSection'),

	InvoiceList = require('./components/invoice_list'),
	SubscriptionInfo = require('./components/subscription_info'),
	CardInfo = require('./components/card_info'),

	routeOp = require('app/operations/route');



function r() {
	return (
		<AppPage 
			hasBackButton
			title={s('title')}
			compAboveSheet = {s('txt_top')}
			className = 'vp_billing'
			>
			<PageSection 
				title={s('title_plan')}
				loading={this.state.subscriptionLoading}>
				<SubscriptionInfo 
					subscription={this.props.subscription}  />
				<br />
				<Button 
					title={s('btn_plan')}
					icon='diamond'
					color='blue'
					onClick={routeOp.bind(null, {route:'settings/plans'})}
					/>
			</PageSection>

			<PageSection 
				title={s('title_card')}
				loading={this.state.creditCardLoading} >
				<p>
					<CardInfo 
						card={this.props.card}
						/>
				</p>
				<br />
				<Button 
					title={s('btn_card')}
					icon='edit'
					color='blue'
					onClick={routeOp.bind(null, {route:'settings/card'})}
					/>
			</PageSection>

			<PageSection 
				title={s('title_invoices')}
				loading={this.state.invoicesLoading}>
				<InvoiceList 
					invoices={this.props.invoices}
					/>
				<Button 
					title={s('btn_address')}
					icon='edit'
					color='blue'
					onClick={routeOp.bind(null, {route:'settings/address'})}
					/>
			</PageSection>

						
		</AppPage>
		);
}



module.exports = React.createClass({

	mixins: [BackboneMixin],

	render: r,

	getInitialState:function(){
		return {
			subscriptionLoading:false,
			creditCardLoading:false,
			invoicesLoading:false
		};
	},

	componentDidMount: function(){
		this.setState({
			subscriptionLoading:true,
			creditCardLoading:true,
			invoicesLoading:true
		});

		var _this = this;
		this.props.subscription.fetch().always(this.setState.bind(this, {subscriptionLoading:false}, null));
		this.props.card.fetch().always(this.setState.bind(this, {creditCardLoading:false}, null));
		this.props.invoices.fetch().always(this.setState.bind(this, {invoicesLoading:false}, null));
		this.props.address.fetch();
	},

	backboneProps: ['subscription', 'card', 'invoices', 'address'],

	propTypes: {
	    subscription: BackboneMixin.PropTypes.Model.isRequired,
	    card: BackboneMixin.PropTypes.Model.isRequired,
	    invoices: BackboneMixin.PropTypes.Collection.isRequired,
	    address: BackboneMixin.PropTypes.Model.isRequired
	},
	
});