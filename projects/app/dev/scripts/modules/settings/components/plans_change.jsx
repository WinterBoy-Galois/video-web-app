var $ = require('jquery'),
	React = require('react'),
	
	// strings
	s = require('strings')('settings.plans_change'),

	BackboneMixin = require('mixins/backbone'),

	// components
	AppPage = require('components/app_page'),
	PageSection = require('components/pageSection'),
	Forms = require('components/forms'),
	Button = require('components/button'),
	LoadingIndicator = require('components/loadingIndicator'),
	Icon = require('components/icon'),

	CardForm = require('./components/card_form'),
	AddressForm = require('./components/address_form'),

	subscribeOp = require('app/operations/subscribeUser');

function rIntervalItem(item) {
	
	var key = item.get('payment_interval'),
		selected = this.state.interval==key;

	var onClick =this.onIntervalClick.bind(this,key),
		saving = key == 'year' ? 'Save 10%!':'-';

	return <div 
		key={key} 
		onClick={onClick} 
		className={'vp_payment_interval ' + (selected? 'vp_selected':'')}>
		<div>
		{item.get('name')}
			<h3>{item.priceFormatted()}</h3>
			{saving}
			<Button 
				onClick={onClick}
				color='blue'
				title={selected ? 'Selected' : 'Select'}
				icon= {selected ? 'checkmark' : false}
				disabled={selected}
				/>
		</div>
	</div>;
};

function r() {
	return (
		<AppPage 
			className='vp_plan_change'
			title={s('title')}
			>
		
		<PageSection title={s('title_interval')} background={false}>
			{this.props.plans.map(rIntervalItem.bind(this))}
		</PageSection>

		<a className = 'vp_choose_plan' href='#settings/plans'>Choose different plan</a>

		<PageSection title={s('title_card')}>
			<CardForm 
				ref='card_form'
				card={this.props.card}
				/>
		</PageSection>

		<PageSection title={s('title_address')}>
			<AddressForm 
				ref='address_form'
				address={this.props.address}
				/>
		</PageSection>
		
		<Button 
			title={s('btn_title')}
			icon='checkmark'
			onClick={this.onPurchaseClick}
			/>
		<LoadingIndicator 
			visible={this.state.loading}
			expanded />
		</AppPage>
		);
}



var PlansChange = React.createClass({

	mixins: [BackboneMixin],

	render: r,

	getInitialState: function(){
		return {
			loading:false,
			interval:'month'
		};
	},

	componentDidMount: function(){
		this.setState({loading:true});
		var _this = this;
		$.when( this.props.address.fetch(), this.props.plans.filterByGroup(this.props.planGroup)).always(function( ) {
			_this.setState({loading:false});
		});
	},

	onPurchaseClick: function(){

		var	vars = {
				creditCard: this.refs.card_form.getValues(),
				paymentDetails: this.refs.address_form.getValues(),
				plan: this.props.plans.findWhere({payment_interval:this.state.interval}).get('id')
			},
			_this = this;

		_this.setState({loading:true});
		subscribeOp(vars).always(function(){
			_this.setState({loading:false});
		});
	},

	onIntervalClick: function(interval){
		this.setState({interval:interval});
	},

	backboneProps: ['plans', 'address'],

	propTypes: {
	    address: BackboneMixin.PropTypes.Model.isRequired,
	    plans:BackboneMixin.PropTypes.Collection.isRequired,
	},
	
});

module.exports = PlansChange;