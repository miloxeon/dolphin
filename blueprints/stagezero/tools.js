'use strict';

// set of handy pure functions

export function getHash(object_type) {
	return object_type.toString() + '_' + Math.floor(Math.random() * new Date()).toString();
}

export function fillObject(object, defaults) {
	var new_object = Object.assign({}, object || {});

	for (var param in defaults || {}) {
		if (!new_object[param]) {
			new_object[param] = defaults[param];
		}
	}

	return new_object;
}
