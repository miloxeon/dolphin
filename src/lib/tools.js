'use strict';
// todo errors

// handy functions used everywhere

export function clone(object) {
	return JSON.parse(JSON.stringify(object));
}

export function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

export function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}

export function getRawId(element_id) {
	return parseInt(element_id.split('_')[1]);
}

export function getTypeById(element_type) {
	return parseInt(element_id.split('_')[0]);	
}
