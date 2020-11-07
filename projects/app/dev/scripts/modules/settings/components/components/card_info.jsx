var React = require('react'),
	
	// strings
	s = require('strings')('settings.card_info'),

	BackboneMixin = require('mixins/backbone');




function r() {

	var card = this.props.card;

	if (!card.get('last4')) {
		return <span>We do not have a credit card for you on file.</span>;
	}

	return (
		<span>
			Your current credit card •••• •••• •••• <strong>{card.get('last4')}</strong> expires on <strong>{card.get('exp_month')} / {card.get('exp_year')}</strong>.
		</span>
		);
}


module.exports = React.createClass({
	render: r,

	mixins: [BackboneMixin],

	backboneProps: ['card'],

	propTypes: {
	    card: BackboneMixin.PropTypes.Model.isRequired,
	},
});