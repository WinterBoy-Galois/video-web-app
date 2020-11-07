var strings = {},
	React = require('react');


/*
 * General
 */
strings.txt_title = 'Integrations';
strings.txt_description = <span>Manage your third party integrations. <a target = '_blank' href =''>Learn more about integrations</a>.</span>;
strings.btn_add = 'Add new integration';


/*
 * Modals
 */
strings.success_modal = {
	title: "Success",
	text: "Your integration was successfully configured.",
	confirmButton: "OK",
	theme: 'green'
};

strings.error_modal = {
	title: "Error",
	text: "Your integration could not be added. Please try again.",
	confirmButton: "OK",
	theme: 'orange'
};


module.exports = strings;