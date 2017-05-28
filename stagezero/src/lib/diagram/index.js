'use strict';

import {getId} from '../tools';

export function setId(id) {
	return this.attr({
		'id': getId('ClassDiagram', id)
	});
}

export function applyTheme(theme) {
	this.children().forEach(function (child) {
		child.applyTheme(theme);
	});
	return this;
}

export function clear() {
	this.children().forEach(function (child) {
		child.remove();
	});
	return this;
}

export function fromModel(model) {
	let self = this;
	model.forEach(function (blueprint) {
		self.classDiagramNode(blueprint);
	});

	return this;
}
