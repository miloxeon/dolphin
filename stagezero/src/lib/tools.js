'use strict';

export function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

export function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}
