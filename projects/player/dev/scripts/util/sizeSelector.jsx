var _ = require('underscore');

module.exports = function(selector, width, height) {
	if ( !width ) width = 0;
	if ( !height ) height = 0; 
	return _.find(selector, function(item){
		if ( 'minWidth' in item && width < item.minWidth) return false;
		if ( 'minHeight' in item && height < item.minHeight) return false;
		if ( 'maxWidth' in item && width > item.maxWidth) return false;
		if ( 'maxHeight' in item && height > item.maxHeight) return false;
		return true;
	});
};