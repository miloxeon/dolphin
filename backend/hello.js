'use strict';

var http = require('http');

// Create a new server instance.
var server = http.createServer();

// Our GUN setup from the last example.
var Gun = require('gun');
var gun = Gun({web: server});

// Start the server on port 8080.
server.listen(8080, function () {
  console.log('Server listening on http://localhost:8080/gun')
})

// Read `greetings`, saving it to a variable.
var greetings = gun.get('greetings');

// Update the value on `greetings`.
greetings.put({
	hello: 'world',
})

// Print the value!
greetings.on(function (update) {
	console.log('Update:', update)
})

