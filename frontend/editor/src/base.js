'use strict';

// entry point
// todo errors

require('./css/style.css');
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';

let diagram = draw.classDiagram();
let model = clone(mock_model);

build(model);

diagram.on('redraw', diagram.redrawConnections);

diagram.on('rebuild', function (e) {
	model = e.detail.new_model;
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

function addElement(blueprint) {
	model.elements.push(blueprint);
	rebuild();
}

function removeElement(id) {
	let index;

	for (let i = 0; i < model.elements.length; i++) {
		if (element.id === id) {
			index = i;
			break;
		}
	}

	model.elements.splice(index, 1);
	rebuild();
}

function addConnection(blueprint) {
	model.connections.push(blueprint);
	rebuild();
}

function removeConnection(id) {
	let index;

	for (let i = 0; i < model.connections.length; i++) {
		if (element.id === id) {
			index = i;
			break;
		}
	}

	model.connections.splice(index, 1);
	rebuild();
}

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
		})

		child.on('dragend', function () {
			diagram.fire('rebuild', {
				new_model: moveController(this, model)
			});
		});
	});
}

function build(model) {
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build(model);
}
