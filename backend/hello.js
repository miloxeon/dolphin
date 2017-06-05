'use strict';

let model = require('./fixtures');

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

// var fixtures = gun.get('fixtures');
// fixtures.put({
// 	model: model
// });

// gun.get('fixtures').val(function (data) {
// 	console.log(data)
// })

var storage = gun.get('model');

// Update the value on `greetings`.
storage.put({
	'fixtures': JSON.stringify(model)
});

