'use strict';

export function applyTheme(theme) {
	this.children().forEach(function (child) {
		child.applyTheme(theme);
	});
	return this;
}
