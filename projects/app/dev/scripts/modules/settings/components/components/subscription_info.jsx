var React = require('react'),
	
	// strings
	s = require('strings')('settings.subscription_info'),

	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils');



function r() {		

	if (!this.props.subscription) {
		return <div></div>;
	}

	var plan = this.props.subscription.plan,
		pendingsubscription = this.props.subscription.get('pending_subscription'),
		name = plan.get('name'),
		price = plan.priceFormatted(),
		end = this.utils.format_date(this.props.subscription.get('current_period_end'));

	var current, next;

	var priceInfo = '';
	if ( price > 0 ) {
		priceInfo = <span> for <strong>{price}</strong></span>;
	}

	
	current = <p>
		You are currently subscribed to the <strong>Videopath {name}</strong> plan{priceInfo}.
	</p>;

	if ( pendingsubscription ) {
		next = <p>
			Your subscription will switch to the <strong>Videopath {pendingsubscription.name}</strong> plan on <strong>{end}</strong>.
		</p>;
	}

	else if (!plan.isFreePlan()) {
		next = <p>
			Your subscription will renew on <strong>{end}</strong>.
		</p>;
	}

	return (
		<div>
			{current}
			{next}
		</div>
	);
}


module.exports = React.createClass({
	render: r,

	mixins: [BackboneMixin, UtilsMixin],

	backboneProps: ['subscription'],

	propTypes: {
	    subscription: BackboneMixin.PropTypes.Model.isRequired,
	},
	
});