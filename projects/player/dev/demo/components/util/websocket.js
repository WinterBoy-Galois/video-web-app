// test websocket
var _ = require('underscore');

window.WebSocket = window.WebSocket || window.MozWebSocket;

var currentConnection = false,
	subscribers = [];

function connect() {
	var connection = new WebSocket('ws://127.0.0.1:3344');
	connection.onopen = function () {
    	currentConnection = connection;
	};
	connection.onclose = function() {
		currentConnection = false;
	};
	connection.onmessage = function(m) {
		var json = JSON.parse(m.data);
		_.each(subscribers, function(s) { s(json); });
	};
}


module.exports = {

	subscribe: function(f){
		subscribers.push(f);
	},

	unsubscribe: function(f) {
		subscribers = _.without(subscribers, f);
	},

	update: function(data){
		if ( currentConnection ) {
			currentConnection.send(JSON.stringify(data));
		}
	},

	connect: connect

};