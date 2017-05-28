'use strict';

import {getId, getRawId} from '../tools';
import {convertTheme} from './style';

export function setId(id) {
	return this.attr({
		'id': getId('ClassDiagram', id)
	});
}

export function applyTheme(theme) {
	if (!theme) {
		console.warn('Missing diagram theme, loading default');
	}

	this.theme = convertTheme(theme);

	this.children().forEach(function (child) {
		child.refreshTheme();
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
