var React = require('react'),
	
	// strings
	s = require('strings')('login.forgot_pw'),

	// components
	AppPage = require('components/app_page'),
	Forms = require('components/forms'),

	// operations
    resetPasswordOp = require('app/operations/resetPassword');



function r() {
	return (
		<AppPage 
			title={s('title')}
			size='small'
			compAboveSheet = <div>{s('txt_instructions')}</div>
			>
			<Forms.Form
				submitButtonTitle = {s('btn_submit')}
				onSubmit = {this.onSubmit}
				ref = 'form'
				>
				<Forms.Input 
					label={s('lbl_email')}
					name='email'
				/>
			</Forms.Form>
		</AppPage>
		);
}

module.exports = React.createClass({

	render: r,

	onSubmit: function(values) {
		var form = this.refs.form;
		form.setState({loading:true});
		resetPasswordOp(values, {
        	successRoute: 'login'
   		}).always(function(){
   			form.setState({loading:false});
   		});
	}
	
});