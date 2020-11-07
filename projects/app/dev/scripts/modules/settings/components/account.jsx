var React = require('react'),
	
	// strings
	s = require('strings')('settings.account'),

	BackboneMixin = require('mixins/backbone'),
    $ = require('jquery'),

	// components
	AppPage = require('components/app_page'),
	PageSection = require('components/pageSection'),

	Forms = require('components/forms'),

	changeEmailOp = require('app/operations/changeEmailAddress'),
    changePasswordOp = require('app/operations/changePassword'),
    changeProfileOp = require('app/operations/changeProfile');

const industries = {
    1: '------',
    10: 'Aerospace',
    20: 'Agriculture',
    30: 'Computer',
    40: 'Construction',
    50: 'Education',
    60: 'Electronics',
    70: 'Energy',
    80: 'Entertainment',
    90: 'Food',
    100: 'Health care',
    110: 'Hospitality',
    120: 'Manufacturing',
    130: 'Mining',
    140: 'Music',
    150: 'News Media',
    160: 'Pharmaceutical',
    170: 'Telecommunication',
    180: 'Transport',
    190: 'Worldwide web',
    999: 'Other'
}

function r() {
    const genders = {u:'------',m:'male',f:'female'}
    const maxYear = new Date().getFullYear() - 10;
	return (
		<AppPage 
			hasBackButton
			title={s('title')}
			compAboveSheet = {s('txt_top')}
			>

			<PageSection title={s('title_profile')} >
                <Forms.Form
                    submitButtonTitle = {s('btn_submit_profile')}
                    onSubmit = {this.onSubmitProfile}
                    ref = 'profile_form'
                    >
                    <Forms.Input 
                        label={s('lbl_first')}
                        name='first_name'
                        defaultValue={this.props.profile.get('first_name')}
                    />
                    <Forms.Input 
                        label={s('lbl_last')}
                        name='last_name'
                        defaultValue={this.props.profile.get('last_name')}
                    />
                    <Forms.Input 
                        label={s('lbl_birthdate')}
                        type='dateselect'
                        name='birthdate'
                        maxYear={maxYear}
                        defaultValue={this.props.profile.get('birthdate')}
                    />
                    <Forms.Input 
                        label={s('lbl_gender')}
                        type='select'
                        name='gender'
                        options={genders}
                        defaultValue={this.props.profile.get('gender')}
                    />
                    <Forms.Input
                        label={s('lbl_occupation')}
                        name='occupation'
                        defaultValue={this.props.profile.get('occupation')}
                    />
                    <Forms.Input 
                        label={s('lbl_industry')}
                        type='select'
                        name='industry'
                        id='industry'
                        onChange={this.onIndustryChange}
                        options={industries}
                        defaultValue={this.props.profile.get('industry')}
                    />
                    <Forms.Input
                        label={s('lbl_industry') + " (Other)"}
                        name='industry_other'
                        id='industry_other'
                        defaultValue={this.props.profile.get('industry_other')}
                    />
                    <Forms.Input 
                        label={s('lbl_mobile')}
                        type='phone'
                        name='phone'
                        defaultValue={this.props.profile.get('phone')}
                    />
                </Forms.Form>
            </PageSection>

			<PageSection title={s('title_email')} >
				<Forms.Form
					submitButtonTitle = {s('btn_submit_email')}
					onSubmit = {this.onSubmitEmail}
					ref = 'email_form'
					>
					<Forms.Input 
						label={s('lbl_email')}
						name='email'
						defaultValue={this.props.user.get('email')}
					/>
					<Forms.Input 
						label={s('lbl_password')}
						type='password'
						name='password'
					/>
				</Forms.Form>
			</PageSection>


			<PageSection title={s('title_password')} >
				<Forms.Form
					submitButtonTitle = {s('btn_submit_password')}
					onSubmit = {this.onSubmitPassword}
					ref = 'password_form'
					>
					<Forms.Input 
						label={s('lbl_old_password')}
						type='password'
						name='oldPassword'
					/>
					<Forms.Input 
						label={s('lbl_new_password')}
						type='password'
						name='newPassword'
					/>
					<Forms.Input 
						label={s('lbl_new_password_repeat')}
						type='password'
						name='newPasswordRepeat'
					/>
				</Forms.Form>
			</PageSection>

		</AppPage>
		);
}



module.exports = React.createClass({
	mixins: [BackboneMixin],

    onIndustryChange: function(data) {
        if(document.getElementById('industry') == null) return;
        if(document.getElementById('industry').value == "999") {
            $('#industry_other').parent().css('display','inline');
        } else {
            $('#industry_other').parent().css('display','none');
        }
    },

    componentDidMount: function() {
        this.onIndustryChange();
    },

    onSubmitProfile: function(vals){
		var form = this.refs.profile_form;
		form.setState({errors: false});
		form.setState({loading:true});
		changeProfileOp(vals).then(function() {
        }).fail(function(vals){
            form.setState({errors:vals});
        }).always(function(){
        	form.setState({loading:false});
        });
    },

	onSubmitEmail: function(vals){
		var form = this.refs.email_form;
		form.setState({loading:true});
		changeEmailOp(vals).then(function() {
		}).always(function(){
        	form.setState({loading:false});
        });
	},

	onSubmitPassword: function(vals){
		var form = this.refs.password_form;
		form.setState({loading:true});
		changePasswordOp(vals).then(function() {
        }).always(function(){
        	form.setState({loading:false});
        });
	},

	render: r,

	backboneProps: ['user', 'profile'],

	propTypes: {
	    user: BackboneMixin.PropTypes.Model.isRequired,
	    profile: BackboneMixin.PropTypes.Model.isRequired
	},
	
});
