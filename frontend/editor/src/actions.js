'use strict';

export function addElement(model, blueprint) {
	let new_model = clone(model);
	new_model.elements.push(blueprint);
	return new_model;
}

export function removeElement(model, id) {
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

export function addConnection(model, blueprint) {
	let new_model = clone(model);

	new_model.connections.push(blueprint);
	return new_model;
}

export function removeConnection(model, id) {
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
