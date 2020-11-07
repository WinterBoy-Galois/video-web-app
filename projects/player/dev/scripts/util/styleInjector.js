

var inject = function(styles) {

	var head = document.head || document.getElementsByTagName('head')[0],
        styleElement = undefined;

    function add(s) {
        try {
        	styleElement = document.createElement('style');
        	styleElement.type = 'text/css';
        	if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = s;
            } else {
                styleElement.appendChild(document.createTextNode(s));
            }
            head.appendChild(styleElement);
        } catch (_) { styleElement=undefined;}
    };

    function remove() {
    	if ( styleElement ) {
    		head.removeChild(styleElement);
    		styleElement = undefined;
    	}
    };

    function replace(s) {
    	remove();
    	add(s);
    };

    add(styles);

    return {
    	remove: remove,
    	replace: replace
    };

};



module.exports = {
	inject:inject
};