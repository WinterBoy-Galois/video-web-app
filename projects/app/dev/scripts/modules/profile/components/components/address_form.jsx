var _ = require('underscore'),
	countries = require('config/countries'),
	React = require('react'),
	
	// strings
	s = require('strings')('settings.address_form'),

	BackboneMixin = require('mixins/backbone'),

	// components
	Forms = require('components/forms');

var countriesOptions = _.reduce(countries, function(memo, obj){
	memo[obj['name']] = obj['name'];
	return memo;
}, {});


function r() {

	var address = {};
	if (this.props.address) {
		address = this.props.address.attributes;
	}

	return (
		<div className = 'vp_address_form'>
			<Forms.Form
				ref = 'form'
				>
				<Forms.Input 
					label={s('lbl_name')}
					name='name'
					defaultValue={address.name}
					required
				/>
				<Forms.Input 
					label={s('lbl_vat_id')}
					name='vat_id'
					defaultValue={address.vat_id}
				/>
				<Forms.Input 
					label={s('lbl_street')}
					name='street'
					defaultValue={address.street}
					required
				/>
				<Forms.Input 
					label={s('lbl_post_code')}
					name='post_code'
					defaultValue={address.post_code}
					required
				/>
				<Forms.Input 
					label={s('lbl_city')}
					name='city'
					defaultValue={address.city}
					required
				/>
				<Forms.Input 
					label={s('lbl_country')}
					name='country'
					defaultValue={address.country || 'Germany'}
					type='select'
					options={countriesOptions}
					required
				/>

			</Forms.Form>
		</div>
		);
}



module.exports = React.createClass({

	mixins: [BackboneMixin],

	backboneProps: ['address'],

	propTypes: {
	    address: BackboneMixin.PropTypes.Model.isRequired,
	},

	getValues: function() {
		return this.refs.form.getValues();
	},

	setState: function(state) {
		this.refs.form.setState(state);
	},

	render: r,
	
});