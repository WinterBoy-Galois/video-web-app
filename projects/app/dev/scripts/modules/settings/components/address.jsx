var React = require('react'),
	
	// strings
	s = require('strings')('settings.address'),

	BackboneMixin = require('mixins/backbone'),

	// components
	AppPage = require('components/app_page'),
	PageSection = require('components/pageSection'),

	Forms = require('components/forms'),
	Button = require('components/button'),

	AddressForm = require('./components/address_form'),

	savePaymentDetailsOp = require('app/operations/savePaymentDetails');



function r() {
	return (
		<AppPage 
			hasBackButton
			className = 'vp_address'
			title={s('title')}
			compAboveSheet = {s('txt_top')}
			>
			<PageSection>
				<AddressForm 
					ref = 'form' 
					address={this.props.address}/>
			</PageSection>
			<Button 
				onClick={this.onSaveAddress}
				icon='checkmark'
				title='Save Address' />
		</AppPage>
		);
}



module.exports = React.createClass({


	render: r,

	componentDidMount: function(){
		var form = this.refs.form;
		form.setState({loading:true});
		this.props.address.fetch().always(function(){
			form.setState({loading:false});
		});
	},

	onSaveAddress: function(){
		var form = this.refs.form,
			vals = form.getValues();
		
		form.setState({loading:true});
		savePaymentDetailsOp(vals).always(function(){
			form.setState({loading:false});
		});
	},

	mixins: [BackboneMixin],

	backboneProps: ['address'],

	propTypes: {
	    address: BackboneMixin.PropTypes.Model.isRequired,
	},
	
});