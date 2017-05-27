'use strict';

export function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

export function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}

export function xor(arr) {
	var all_false = Array(arr.length).fill('0').join('');
	var all_true = Array(arr.length).fill('1').join('');
	var arr_str = arr.map(function (elem) {
		return elem ? '1' : '0';
	}).join('');

	return (arr_str !== all_false && arr_str !== all_true);
}

export function isComplexObject(object) {
	var obj_str = [];
	for (let name in object) {
		if (isObject(object[name])) {
			obj_str.push(true);
		} else {
			obj_str.push(false);
		}
	}
	return xor(obj_str);
}

export function isObject(variable) {
	return (variable !== null) && (typeof variable === 'object');
}

export function isNested(object) {
	for (let name in object) {
		if (!isObject(object[name])) {
			return false;
		}
	}
	return true;
}

export function convertObject(object, converter) {
	let new_object = {};

	if (!isComplexObject(object)) {

		if (isNested(object)) {
			for (let name in object) {
				new_object[name] = convertObject(object[name], converter);
			}
		} else {
			new_object = converter(object);
		}

		return new_object;

		
	} else {
		console.log(object);
		throw new TypeError("Couldn't convert a complex object");
	}
}
