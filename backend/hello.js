'use strict';

let model = require('./fixtures');
let sha3 = require('crypto-js/sha3');
let gun = require('./model');

let storage = gun.get('model');

getCredentials(function (credentials) {
	storage.put({
		'fixtures': null,
		'error': null
	});

	let data = getData(credentials.login, credentials.password);
	storage.put(data);
});


function getData(login, password) {
	storage.put({
		'fixtures': null,
		'error': null
	});

	if (password.toString() === sha3('hello').toString()) {
		return {
			'fixtures': JSON.stringify(model),
			'error': null
		}
	} else {
		return {
			'fixtures': null,
			'error': 'Wrong credentials: ' + password.toString()
		}
	}
}

function getCredentials(callback) {
	gun.get('credentials').put(null);
	gun.get('credentials').on(function (data) {
		callback(data);
	});
}
