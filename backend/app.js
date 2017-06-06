'use strict';

let express = require('express');
let app = express();

app.get('/', function (req, res) {
	res.send('Hello');
});

module.exports = app;
