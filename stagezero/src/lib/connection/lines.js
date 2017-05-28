'use strict';

// Get pathes for line drawing

export function arcTo(from, to) {
	var x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	var bias = {
		x: from.x,
		y: to.y
	}

	return cubic(from, to, bias, bias);
}

export function cubicTo(from, to) {
	var x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	var bias_1 = {
		x: x_between_from_and_to,
		y: from.y
	}

	var bias_2 = {
		x: x_between_from_and_to,
		y: to.y
	}

	return cubic(from, to, bias_1, bias_2);
}

function cubic(from, to, bias_1, bias_2) {
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
