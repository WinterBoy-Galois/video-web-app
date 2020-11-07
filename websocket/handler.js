var _ = require('underscore'),
	connections = [];

module.exports = function (request) {
	var connection = request.accept(null, request.origin);
	connections.push(connection);

	console.log('client connected: ', request.origin);

	/*
	 *	Distribute message
	 */ 
	connection.on('message', function (message) {
	if (message.type === 'utf8') {
		  var object = JSON.parse(message.utf8Data);
		  console.log('received:', object);
		  _.each(connections, function(c){
		  	if (c!=connection)
				c.sendUTF(JSON.stringify(object));
		  });
		}
	});

	/*
	 * Close connections
	 */
	connection.on('close', function (connection) {
		connections = _.without(connections, connection);
	});


};