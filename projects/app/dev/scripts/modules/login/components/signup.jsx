var React = require('react'),
	Marionette = require('marionette'),
	
	// strings
	s = require('strings')('login.signup'),

	EnvMixin = require('mixins/environment'),

	// components
	AppPage = require('components/app_page'),
	Forms = require('components/forms'),
	Button = require('components/button'),

	// operations
	signupOp = require('app/operations/signup');


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
			title={ this.props.embedded ? '': s('title')}
			size='small'
			compAboveSheet = { this.props.embedded ? '' : s('txt_top')}
			>
			<Forms.Form
				submitButtonTitle = {s('btn_submit')}
				onSubmit = {this.onSubmit}
				ref = 'form'
				>
                <div style={{display:'table'}}>
                    <div style={{width:'190px', display: 'table-cell', paddingRight:'40px'}}>
                        <Forms.Input 
                            label={s('lbl_first')}
                            id='first_name'
                            error={this.state.error_first_name}
                        />
                    </div>
                    <div style={{width:'150px', display: 'table-cell'}}>
                        <Forms.Input 
                            label={s('lbl_last')}
                            id='last_name'
                            error={this.state.error_last_name}
                        />
                    </div>
                </div>
				<Forms.Input 
					label={s('lbl_email')}
					name='email'
				/>
				<Forms.Input 
					label={s('lbl_password')}
					type='password'
					name='password'
				/>
				<Forms.Input 
					label={s('lbl_password_confirm')}
					type='password'
					name='password_confirm'
				/>
				<Forms.Input 
					label={s('lbl_birthdate')}
					type='dateselect'
					name='birthdate'
                    maxYear={maxYear}
				/>
                <div style={{display:'table'}}>
                    <div style={{width:'140px', display: 'table-cell', paddingRight:'30px'}}>
                        <Forms.Input 
                            label={s('lbl_gender')}
                            type='select'
                            id='gender'
                            options={genders}
                        />
                    </div>
                    <div style={{width:'170px', display: 'table-cell'}}>
                        <Forms.Input 
                            label={s('lbl_occupation')}
                            id='occupation'
                            error={this.state.error_occupation}
                        />
                    </div>
                </div>
                <div style={{width:'150px'}}>
				<Forms.Input 
					label={s('lbl_industry')}
					type='select'
					id='industry'
                    onChange={this.onIndustryChange}
                    options={industries}
				/>
                </div>
                <div id='other_div' style={{display:'none'}}>
                    <Forms.Input 
                        label={s('lbl_industry') + " (Other)"}
                        id='industry_other'
                        error={this.state.error_industry_other}
                    />
                </div>
				<Forms.Input 
					label={s('lbl_mobile')}
					type='phone'
					name='phone'
                    defaultValue=""
				/>
				<Forms.Input 
					label={s('lbl_tos')}
					type='checkbox'
					name='tos'
				/>
				<Forms.Input 
					label={s('lbl_newsletter')}
					type='checkbox'
					name='newsletter'
				/>
			</Forms.Form>
		</AppPage>
		);
}


module.exports = React.createClass({

	mixins: [EnvMixin],

	render: r,

	getDefaultProps: function(){
		return {
			embedded: false,
		};
	},

    onIndustryChange: function(data) {
        if(document.getElementById("industry").value == "999") {
            document.getElementById("other_div").style.display = 'inline';
        } else {
            document.getElementById("other_div").style.display = 'none';
        }
    },

    //used for patching nested form fields, forms should be improved in future instead 
    getInitialState: function() {
        return {
            error_first_name: null,
            error_last_name: null,
            error_industry_other: null,
            error_occupation: null
        }
    },

	onSubmit: function(values) {
		var nextRoute = this.getQueryVariable('next') || 'dashboard',
			form = this.refs.form;

        // deeply nested refs due design
        values['first_name'] = document.getElementById("first_name").value;
        values['last_name'] = document.getElementById("last_name").value;
        values['gender'] = document.getElementById("gender").value;
        values['occupation'] = document.getElementById("occupation").value;
        values['industry'] = document.getElementById("industry").value;
        values['industry_other'] = document.getElementById("industry_other").value;

		form.setState({errors: false});

		if ( !values.tos ) {
			form.setState({
				errors: {
					tos:"Please select our terms and conditions"
				}
			});
			return;
		}

		form.setState({loading:true});
        var that=this;
		signupOp(values)
			.then(function(){
				Marionette.App.route(nextRoute);
			})
			.fail(function(vals){
				form.setState({errors:vals});
                if ('first_name' in vals) {
                    that.setState({error_first_name: vals.first_name[0]});
                } else {
                    that.setState({error_first_name: null});
                }
                if ('last_name' in vals) {
                    that.setState({error_last_name: vals.last_name[0]});
                } else {
                    that.setState({error_last_name: null});
                }
                if ('industry_other' in vals) {
                    that.setState({error_industry_other: vals.industry_other[0]});
                } else {
                    that.setState({error_industry_other: null});
                }
                if ('occupation' in vals) {
                    that.setState({error_occupation: vals.occupation[0]});
                } else {
                    that.setState({error_occupation: null});
                }
			})
			.always(function(){
   				form.setState({loading:false});
   			});
	}
	
});
