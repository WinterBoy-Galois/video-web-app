var _ = require('underscore'),
	React = require('react'),
	
	// strings
	s = require('strings')('settings.card_form'),

	// components
	Forms = require('components/forms');

var monthOptions = _.object(_.range(1,13), _.range(1,13)),
	yearOptions = _.object(_.range(16,40), _.range(2016,2040));

function r() {
	return (
		<div className = 'vp_card_form'>
			<Forms.Form
				ref = 'form'
				>
				<Forms.Input 
					label={s('lbl_card')}
					name='number'
					defaultValue=''
					placeholder='•••• •••• •••• ••••'
				/>
				<Forms.Input 
					label={s('lbl_month')}
					name='exp_month'
					type='select'
					options={monthOptions}
				/>
				<Forms.Input 
					label={s('lbl_year')}
					name='exp_year'
					type='select'
					options={yearOptions}
				/>
				<Forms.Input 
					label={s('lbl_cvv')}
					name='cvc'
				/>
			</Forms.Form>
			<div className='vp_stripe'>
				{s('txt_stripe')}
			</div>
		</div>
		);
}



module.exports = React.createClass({
	getValues: function() {
		return this.refs.form.getValues();
	},

	setState: function(state) {
		this.refs.form.setState(state);
	},

	render: r,
	
});