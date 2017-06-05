'use strict';

let Gun = require('gun');
let editor = require('../editor');

var peers = [
  'http://localhost:8080/gun',
];

var gun = Gun(peers);
var storage = gun.get('model');

storage.val(function (data) {
	editor.init(JSON.parse(data.fixtures))
})


module.exports = {storage}
