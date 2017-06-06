'use strict';

let Gun = require('gun');
// let peers = ['https://flowcharts.herokuapp.com/gun'];
let peers = ['http://localhost:8080/gun'];
let gun = Gun(peers);

export default gun;
