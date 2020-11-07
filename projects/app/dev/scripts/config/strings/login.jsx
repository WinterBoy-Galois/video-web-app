var login = {},
	React = require('react');

/*
 *  Login Page
 */
login.login = {
	title: "Login",
	lbl_email: "E-Mail or Username",
	lbl_password: "Password",
	btn_submit: "Login",
	txt_forgot: "Forgot your Password?",
	txt_top: <div>Don't have an account with us? <a href='#signup'>Sign Up!</a></div>
};


/*
 * Signup Page
 */
login.signup = {
	//title: "Sign Up",
	title: "",
	txt_top: <div>Already have an account? <a href='#login'>Log In!</a></div>,
	lbl_first: "First Name",
	lbl_last: "Last Name",
	lbl_email: "E-Mail",
	lbl_password: "Password",
	lbl_password_confirm: "Password (Confirm)",
	lbl_birthdate: "Birthdate",
	lbl_gender: "Gender",
    lbl_occupation: "Occupation",
	lbl_industry: "Industry",
	lbl_mobile: "Mobile Phone",
	lbl_tos: <span>I agree to the <a target = '_blank' href ='https://videopath.com/terms/'>Terms of Service</a> and <a target = '_blank' href ='https://videopath.com/imprint/'>Privacy Policies</a></span>,
	lbl_newsletter: "Sign up for the Videopath Newsletter",
	btn_submit: "Sign Up",
};


/*
 * Forgot Password Page
 */
login.forgot_pw = {
	title: "Forgot Password?",
	lbl_email: "Your E-Mail or Username",
	txt_instructions: "We'll send you an email with instructions.",
	btn_submit: "Reset"
};

login.maintenance = {
	title: "In maintenance",
	message: <span>The Videopath App is currently under maintenance. Please try again in a few minutes, or learn more at <a href = 'http://videopath.com'>Videopath.com</a>.</span>
};


module.exports = login;
