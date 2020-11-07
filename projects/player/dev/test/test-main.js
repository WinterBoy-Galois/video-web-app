// webpack requires all test in this directory and all sub directories
var context = require.context('.', true, /-test\.js(x)?$/);

// only require new tests
context.keys().forEach(function(item){
	if ( item.indexOf('_old') > -1 ) {
		//return;
	}
	context(item);
});

