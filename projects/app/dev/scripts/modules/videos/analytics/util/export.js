var _ = require('underscore'),
	config = require('config/analytics');

var attrs = _.pick(config.attrs, function(entry){return entry.graph;}),
	attrKeys = _.keys(attrs);

module.exports = function(data, video, grouping) {
	var content = "data:text/csv;charset=utf-8,";

	content += '"Stats of ' + video.get('title') + " grouped by " + grouping + '"\n';

	// first row
	content += "Date" + _.reduce(attrs, function(memo, item){
		return memo + "," +  item.name;
	},"");
	content += "\n";

	// first row
	content += _.reduce(data, function(memo, d){
		return memo + '"' + d.dateFormattedLong + '"' +
			_.reduce(attrKeys, function(memo, item){
				return memo + ',' + d[item];
			}, '') +
			"\n";
	},'');

	window.open(encodeURI(content));
};