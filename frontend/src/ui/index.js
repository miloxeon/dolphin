'use strict';

let Gun = require('gun');
let editor = require('../editor');

var peers = [
  'http://localhost:8080/gun',
];

var gun = Gun(peers);
var greetings = gun.get('greetings');
greetings.put({ hello: 'world' });


module.exports = {greetings}
