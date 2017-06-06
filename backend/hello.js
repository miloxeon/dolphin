'use strict';

let model = require('./fixtures');

var http = require('http');
var server = http.createServer();

var Gun = require('gun');
var server = require('http').createServer(function(req, res){
	if(Gun.serve(req, res)){ return } // filters gun requests!
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end('hello');
});

var gun = Gun({web: server});

let port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server listening on ' + port);
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

