'use strict';

let sha3 = require('crypto-js/sha3');
let gun = require('./gun');

let storage = gun.get('model');

let getData = require('./model').getData;

getCredentials(function (credentials) {
	let data = getData(credentials.login, credentials.password, function (data) {
		storage.put(data);
	});
});

function getCredentials(callback) {
	gun.get('credentials').put(null);
	gun.get('credentials').on(function (data) {
		callback(data);
	});
}
