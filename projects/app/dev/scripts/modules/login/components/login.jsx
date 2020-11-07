var React = require('react'),
	
	// strings
	s = require('strings')('login.login'),

	EnvMixin = require('mixins/environment'),

	// components
	AppPage = require('components/app_page'),
	Forms = require('components/forms'),

	// operations
	loginOp = require('app/operations/login');



function r() {
	return (
		<AppPage 
			title={s('title')}
			size='small'
			compAboveSheet = {s('txt_top')}
			compBelowSheet = <div><a href ='#forgot_pw'>{s('txt_forgot')}</a></div>
			>
			<Forms.Form
				submitButtonTitle = {s('btn_submit')}
				onSubmit = {this.onSubmit}
				ref = 'form'
				>
				<Forms.Input 
					label={s('lbl_email')}
					name='username'
				/>
				<Forms.Input 
					label={s('lbl_password')}
					type='password'
					name='password'
				/>
			</Forms.Form>
		</AppPage>
		);
}

module.exports = React.createClass({

	mixins: [EnvMixin],

	render: r,

	onSubmit: function(values) {
		var nextRoute = this.getQueryVariable('next') || 'dashboard',
			form = this.refs.form;
		form.setState({loading:true});
		loginOp(values, {
        	successRoute: nextRoute
   		}).always(function(){
   			form.setState({loading:false});
   		});
	}
	
});
