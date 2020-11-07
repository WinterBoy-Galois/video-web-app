/*
 * load and external javascript file
 */

module.exports = function(args, done) {

	var url = args.url,
		waitFor = args.waitFor;

	var s = document.createElement('script');
    		s.src = args.url;
    		s.async = true;
    		document.body.appendChild(s);

    if ( waitFor ) {
    	var interval = setInterval(function(){
    		if (window[waitFor]) {
    			done(window[waitFor]);
    			clearInterval(interval);
    		}
    	},50);
    };
};