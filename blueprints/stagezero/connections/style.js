'use strict';

// connection line styling

// 	line_style:
// 		stroke
// 		stroke-width
// 		fill
// 		stroke-linecap
// 		stroke-dasharray


import {fillObject} from '../tools';

export function convertLineStyle(line_style) {
	var default_line_style = {
		'stroke': 'black',
		'stroke-width': '2',
		'fill': 'none',
		'stroke-linecap': 'round',
		'stroke-dasharray': 'none'
	}

	var passed_style = fillObject(line_style, default_line_style);

	return {
		line_style: passed_style
	}
}
