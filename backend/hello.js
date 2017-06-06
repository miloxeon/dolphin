'use strict';

let model = require('./fixtures');
var port = process.env.PORT || 8080;
var express = require('express');
var Gun = require('gun');

var app = express();
app.use(Gun.serve);
// app.use(express.static(__dirname));
app.get('/', function (req, res) {
	res.send('Hello');
});

var server = app.listen(port);
let gun = Gun({web: server});
console.log('Server started on port ' + port + ' with /gun');

var storage = gun.get('model');

storage.put({
	'fixtures': JSON.stringify(model)
});
