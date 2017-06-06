'use strict';

let model = require('./fixtures');
var port = process.env.PORT || 8080;
var express = require('express');
var Gun = require('gun');

var app = express();
app.use(Gun.serve);
app.get('/', function (req, res) {
	res.send('Hello');
});

var server = app.listen(port);
let gun = Gun({web: server});
console.log('Server started on port ' + port + ' with /gun');


var storage = gun.get('model');

storage.put({
	'fixtures': null,
	'error': null
});

gun.get('auth').put(null);

var auth = gun.get('auth').on(function (data) {
	console.log(data.password)
	if (data.password == 'hello') {
		console.log('success');
		storage.put({
			'fixtures': JSON.stringify(model),
			'error': 'Welcome'
		});
	} else {
		console.log('fail');
		storage.put({
			'fixtures': null,
			'error': 'Wrong credentials: ' + data.password
		});
	}
	console.log(' ');
});


