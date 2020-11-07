/*
 * Get access to browser / app environment
 */
var secToMinSec = require('./sec_to_minsec_string');

module.exports = {

	utils : {
		timeago: require('./timeago'),
		trimstring: require('./trimstring'),
		format_date: require('./format_date'),
		secToMinSecString: secToMinSec.secToMinSecString,
		zeroPadding: secToMinSec.zeroPadding
	}

};
