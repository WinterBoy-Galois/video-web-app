var ellipsis = '…';

module.exports = function(string, maxLength){
	
	string = string || "";
    if (string.length <= maxLength) {
        return string;
    }

    // try to ellipsize on word break
    var count = maxLength;
    while (count > 3) {
        if (string.charAt(count) == " ") {
            return string.substring(0, count) + ellipsis;
        }
        count--;
    }
    return string.substring(maxLength) + ellipsis;
	
};