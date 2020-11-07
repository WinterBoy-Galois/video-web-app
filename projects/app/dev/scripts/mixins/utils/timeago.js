var moment = require('moment');

module.exports = function(date){
	return moment.utc(date).fromNow();
};
