'use strict';

// methods of ClassDiagram class
// todo errors

import {getId, getRawId} from '../tools';

let name = 'ClassDiagram';

export default {
	setId,
	clear,
	fromModel,
	getNodeById,
	getType,
	redrawConnections
}

function getType() {
	return name;
}

function setId(id) {
	return this.attr({
		'id': getId(name, id)
	});
}

function clear() {
	this.children().forEach(function (child) {
		child.off();
		child.remove();
	});
	return this;
}

function fromModel(model) {
	let self = this;

	model.elements.forEach(function (blueprint) {
		self.classDiagramNode(blueprint);
	});

	model.connections.forEach(function (blueprint) {
		self.connection(blueprint);
	})

	return this;
}

function getNodeById(id) {
	let found;
	this.children().forEach(function (child) {
		if (child.attr('id') === getId('ClassDiagramNode', id)) {
			found = child;
		}
	})

	return found;
}

function redrawConnections() {
	this.children().forEach(function (child) {
		if (child.getType() === 'Connection') {
			child.redraw();
		}
	});
	return this;
}
