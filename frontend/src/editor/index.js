'use strict';

// entry point
// todo errors

require('./css/style.css');
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection, move} from './actions';
import gun from './model'; 
let sha3 = require('crypto-js/sha3');
let storage = gun.get('model');
let diagram = draw.classDiagram();

if (checkAuth()) {
	start();
} else {
	auth(getLogin(), getPassword(), start);
}

function checkAuth() {
	return localStorage.getItem('login') && localStorage.getItem('password');
}

function getLogin() {
	if (!localStorage.getItem('login')) {
		localStorage.setItem('login', prompt('Enter login'));
	}
	return localStorage.getItem('login');
}

function getPassword() {
	if (!localStorage.getItem('password')) {
		localStorage.setItem('password', sha3(prompt('Enter password')).toString());
	}
	return localStorage.getItem('password');
}

function auth(login, password, callback) {
	gun.get('credentials').put(null);
	gun.get('credentials').put({
		login,
		password
	});

	storage.get('error').on(function (data) {
		if(!data) {
			callback();
		} else {
			console.warn(data);
		}
	});
}

function start() {
	storage.get('fixtures').on(function (data) {
		diagram.clear();
		if (data) {
			diagram.fromModel(JSON.parse(data));
			bindControllers(diagram);
		}
	});
}

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
			diagram.redrawConnections();
		})

		child.on('dragend', function () {
			// change model on dragend
			let model = getModel();
			let new_model = move(model, this);
			changeModel(new_model);
		});
	});
}

function changeModel(new_model) {
	storage.get('fixtures').put(JSON.stringify(new_model));
}

function getModel() {
	let model;
	storage.get('fixtures').val(function (data) {
		model = JSON.parse(data);
	})
	return model;
}

module.exports = {
	addElement,
	removeElement,
	addConnection,
	removeConnection,
	getModel
}

// function unbindControllers(diagram) {
// 	diagram.children().forEach(function (child) {
// 		child.off();
// 	});
// }

// function rebuild() {
// 	diagram.clear();
// 	build();
// }
