'use strict';

// entry point
// todo errors

require('./css/style.css');
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection, move} from './actions';

let Gun = require('gun');
let peers = ['http://localhost:8080/gun'];
let gun = Gun(peers);

let storage = gun.get('model');

let model;
let diagram;

storage.val(function (data) {
	diagram = draw.classDiagram();
	model = JSON.parse(data.fixtures);

	build();

	diagram.on('redraw', diagram.redrawConnections);
	diagram.on('rebuild', function (event) {
		storage.get('fixtures').put(JSON.stringify(event.detail.new_model));
	});
});

storage.on(function (data) {
	model = JSON.parse(data.fixtures);
	rebuild();
});

module.exports = {
	addElement,
	removeElement,
	addConnection,
	removeConnection,
	getModel
}

function getModel () {
	return clone(model);
}

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
		})

		child.on('dragend', function () {

			diagram.fire('rebuild', {
				new_model: move(model, this)
			});
		});
	});
}

function unbindControllers(diagram) {
	diagram.children().forEach(function (child) {
		child.off();
	});
}

function build() {
	unbindControllers(diagram);
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build();
}
