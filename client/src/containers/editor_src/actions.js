'use strict';

import {clone, getRawId} from './lib/tools';

export function addElement(model, blueprint) {
	let new_model = clone(model);
	new_model.elements.push(blueprint);
	return new_model;
}

export function removeElement(model, id) {
	let new_model = clone(model);

	let index;
	let connections = [];

	for (let i = 0; i < new_model.elements.length; i++) {
		if (new_model.elements[i].id === id) {
			index = i;
			new_model.elements.splice(index, 1);
			break;
		}
	}

	for (let i = 0; i < new_model.connections.length; i++) {
		if (new_model.connections[i].from.id === id
			|| new_model.connections[i].to.id === id) {
			connections.push(i);
		}
	}

	connections.forEach(function (id) {
		new_model = removeConnection(new_model, id);
	});

	return new_model;
}

export function addConnection(model, blueprint) {
	let new_model = clone(model);

	new_model.connections.push(blueprint);
	return new_model;
}

export function removeConnection(model, id) {
	let new_model = clone(model);

	let index;

	for (let i = 0; i < new_model.connections.length; i++) {
		if (new_model.connections[i].id === id) {
			index = i;
			break;
		}
	}

	new_model.connections.splice(index, 1);
	return new_model;
}

export function moveElement(model, node) {
	let new_model = clone(model);
	let node_id = getRawId(node.attr('id'));
	let new_coords = {
		x: node.x(),
		y: node.y()
	}

	new_model.elements.forEach(function (elem) {
		if (elem.id === node_id) {
			elem.position = new_coords;
		}
	});

	return new_model;
}
