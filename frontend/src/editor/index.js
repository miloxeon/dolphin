'use strict';

// entry point
// todo errors

require('./css/style.css');
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection, move} from './actions';
import gun from './model'; 
import {checkAuth, getLogin, getPassword, auth} from './auth';

let storage = gun.get('model');
let diagram = draw.classDiagram();

function start() {
	if (checkAuth()) {
		load();
	} else {
		auth(getLogin(), getPassword(), load);
	}
}

function load() {
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
	getModel,
	start
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
