var React = require('react'),
	settings = {};


/*
 * Pages
 */ 
settings.account = {
	title: "Your Account",
	txt_top: "Manage your account",

	title_email: "Change your email",
	title_password: "Change your password",
	title_profile: "Update your profile info",

    lbl_first: "First Name",
    lbl_last: "Last Name",
    lbl_birthdate: "Birthdate",
    lbl_gender: "Gender",
    lbl_occupation: "Occupation",
    lbl_mobile: "Phone",
    lbl_industry: "Industry",
	btn_submit_profile: "Update profile",

	lbl_email: "New e-mail address",
	lbl_password: "Your password",
	btn_submit_email: "Change email",

	lbl_old_password: "You current password",
	lbl_new_password: "Your new password",
	lbl_new_password_repeat: "Repeat your new password",
	btn_submit_password: "Change password",
};

settings.profile = {
	title: "Your Profile",
};

settings.billing = {
	title: 'Plans & Billing',
	txt_top: 'Manage your plan and your payments',

	title_plan: 'Your current plan',
	title_card: 'Your credit card',
	title_invoices: 'Your invoices',

	btn_plan:'Change plan',
	btn_card: 'Edit credit card',
	btn_address: 'Edit billing address' 
};

settings.address = {
	title: 'Address',
	txt_top: 'Update your billing address',
};

settings.card = {
	title: 'Credit card',
	txt_top: 'Add or change your credit card',
};

settings.plans = {
	title: 'Plans',
	txt_top: 'Update your subscription',

	title_plan: 'Your current plan',
	txt_custom:<span>None of the plans fit your needs? <a href='mailto:sales@videopath.com'>Contact sales</a> and talk to us!</span>
};

settings.plans_change = {
	title: 'Subscribe',	

	title_interval: 'Choose your billing cycle',
	title_card: 'Your credit card',
	title_address: 'Your Billing Address',

	btn_title: 'Purchase'

};


/*
 * Components
 */
settings.card_info = {
	
};

settings.address_form = {
	lbl_name: 'Your Name / Company Name',
	lbl_street: 'Street & Number',
	lbl_post_code: 'Post Code',
	lbl_city: 'City',
	lbl_country: 'Country',
	lbl_vat_id:'VAT ID'
};

settings.card_form = {
	lbl_card: 'Credit Card Number',
	lbl_month: 'Exp. Month',
	lbl_year: 'Exp. Year',
	lbl_cvv: 'Security Code',
	txt_stripe: <span>We use <a href ='https://stripe.com'>Stripe</a> as our payment provider. Stripe is Certified PCI Level 1.</span>
};

settings.subscription_info = {
	plan: 'You are subscribed to the Videopath {1} plan.',
	free_plan: 'You are currently subscribed to the Videopath Free plan.',
	individual_plan: 'You are currently subscribed to the plan {1}.'
};


module.exports = settings;
