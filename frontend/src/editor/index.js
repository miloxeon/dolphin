'use strict';

// entry point
// todo errors

require('./css/style.css');
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection, move} from './actions';

import gun from './model'; 

let storage = gun.get('model');
let diagram = draw.classDiagram();

let sha3 = require('crypto-js/sha3');

auth(prompt('Enter login'), prompt('Enter password'));

function auth(login, password) {
	// gun.get('auth').put({
	// 	password: null
	// });
	// storage.get('error').put(null);

	// gun.get('auth').put({
	// 	password: sha3(pass).toString()
	// });

	gun.get('credentials').put(null);
	gun.get('credentials').put({
		login,
		password: sha3(password).toString()
	});

	storage.get('error').on(function (data) {
		if(!data) {
			start();
		}
	})
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
