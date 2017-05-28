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
