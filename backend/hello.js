'use strict';

let model = require('./fixtures');

var http = require('http');
var server = http.createServer();
var Gun = require('gun');
var gun = Gun({web: server});

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

