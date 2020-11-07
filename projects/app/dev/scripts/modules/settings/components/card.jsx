var React = require('react'),
	
	// strings
	s = require('strings')('settings.card'),

	BackboneMixin = require('mixins/backbone'),

	Button = require('components/button'),

	// components
	AppPage = require('components/app_page'),
	PageSection = require('components/pageSection'),
	CardForm = require('./components/card_form'),
	CardInfo = require('./components/card_info'),

	saveCreditCardOp = require('app/operations/saveCreditCard');




function r() {
	return (
		<AppPage 
			className = 'vp_card'
			hasBackButton
			title={s('title')}
			compAboveSheet = {s('txt_top')}
			>

		<PageSection title='Current credit card'>
			<CardInfo card={this.props.card} />
		</PageSection>
		<PageSection title='Update credit card'>
			<CardForm ref='form'/>
		</PageSection>
		<Button 
			onClick={this.onSaveCard}
			icon='checkmark'
			title='Save Card' />
		</AppPage>
		);
}



module.exports = React.createClass({

	mixins: [BackboneMixin],

	render: r,

	onSaveCard: function(){
		var form = this.refs.form,
			vals = form.getValues();
		
		form.setState({loading:true});
		saveCreditCardOp(vals).always(function(){
			form.setState({loading:false});
		});
	},

	backboneProps: ['card'],

	propTypes: {
	    card: BackboneMixin.PropTypes.Model.isRequired,
	},
	
});