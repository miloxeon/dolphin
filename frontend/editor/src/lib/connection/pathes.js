'use strict';

// Get pathes for line drawing

import {checkSockets, checkCoordinates} from './errors';

export function getLineFunction(sockets) {

	if (checkSockets(sockets)) throw checkSockets(sockets);

	let sockets_str = [].concat(sockets).sort((a, b) => a - b).join('');

	switch (sockets_str) {
		case '47':
		case '24':
			return arcTo;

		case '25':
		case '57':
			return arcReverseTo;

		case '27':
			return lineTo;

		default:
			return cubicTo;
	}	
}

function arcTo(from, to) {

	if (checkCoordinates(from, to)) throw checkCoordinates(from, to);

	let x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	let bias = {
		x: from.x,
		y: to.y
	}

	return cubic(from, to, bias, bias);
}

function arcReverseTo(from, to) {

	if (checkCoordinates(from, to)) throw checkCoordinates(from, to);

	let x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	let bias = {
		x: to.x,
		y: from.y
	}

	return cubic(from, to, bias, bias);	
}

function cubicTo(from, to) {

	if (checkCoordinates(from, to)) throw checkCoordinates(from, to);

	let x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	let bias_1 = {
		x: x_between_from_and_to,
		y: from.y
	}

	let bias_2 = {
		x: x_between_from_and_to,
		y: to.y
	}

	return cubic(from, to, bias_1, bias_2);
}

function lineTo(from, to) {

	if (checkCoordinates(from, to)) throw checkCoordinates(from, to);

	return 'M ' + 
		from.x.toString() + ' ' + 
		from.y.toString() + ' ' + 
		'L ' +
		to.x.toString() + ' ' + 
		to.y.toString();
}

function cubic(from, to, bias_1, bias_2) {

	if (checkCoordinates(from, to)) throw checkCoordinates(from, to);

	return 'M ' + 
		from.x.toString() + ' ' + 
		from.y.toString() + ' ' + 
		'C ' +
		bias_1.x.toString() + ' ' + 
		bias_1.y.toString() + ' ' +
		bias_2.x.toString() + ' ' + 
		bias_2.y.toString() + 
		' ' + 
		to.x.toString() + ' ' + 
		to.y.toString();
}
