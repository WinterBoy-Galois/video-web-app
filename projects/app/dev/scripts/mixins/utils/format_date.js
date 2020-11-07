var moment = require('moment');

module.exports = function(date){
	return moment(date).format("MMM Do YYYY");
};