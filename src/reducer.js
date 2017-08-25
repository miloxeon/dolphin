'use strict';

import {clone, getRawId} from './lib/tools';

export function reducer(state, action) {
	switch (action.type) {

		case 'ADD_ELEMENT':
			return addElement(state, action.payload);

		case 'REMOVE_ELEMENT':
			return removeElement(state, action.payload);

		case 'ADD_CONNECTION':
			return addConnection(state, action.payload);

		case 'REMOVE_CONNECTION':
			return removeConnection(state, action.payload);

		case 'MOVE':
			return move(state, action.payload);

		default:
			return state;
	}
}

function addElement(model, blueprint) {
	let new_model = clone(model);
	new_model.elements.push(blueprint);
	return new_model;
}

function removeElement(model, id) {
	let new_model = clone(model);

	let index;

	for (let i = 0; i < new_model.elements.length; i++) {
		if (element.id === id) {
			index = i;
			break;
		}
	}

	new_model.elements.splice(index, 1);
	return new_model;
}

function addConnection(model, blueprint) {
	let new_model = clone(model);

	new_model.connections.push(blueprint);
	return new_model;
}

function removeConnection(model, id) {
	let new_model = clone(model);

	let index;

	for (let i = 0; i < new_model.connections.length; i++) {
		if (element.id === id) {
			index = i;
			break;
		}
	}

	new_model.connections.splice(index, 1);
	return new_model;
}

function move(model, node) {
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
