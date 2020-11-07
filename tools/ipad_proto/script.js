
var $d = $(document);

$d.ready(function() {


	$d.resize(function() {
		console.log("h: " + $d.height() + " - w: " + $d.width());
	});

});

