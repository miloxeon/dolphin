'use strict';

// methods of ClassDiagram class

import {getId, getRawId} from '../tools';

export function setId(id) {
	return this.attr({
		'id': getId('ClassDiagram', id)
	});
}

export function clear() {
	this.children().forEach(function (child) {
		child.remove();
	});
	return this;
}

export function fromModel(model) {
	let self = this;
	model.elements.forEach(function (blueprint) {
		self.classDiagramNode(blueprint);
	});

	model.connections.forEach(function (blueprint) {
		self.connection(blueprint);
	})

	return this;
}

export function getNodeById(id) {
	let found;
	this.children().forEach(function (child) {
		if (child.attr('id') === getId('ClassDiagramNode', id)) {
			found = child;
		}
	})

	return found;
}
