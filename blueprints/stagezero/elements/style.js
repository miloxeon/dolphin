'use strict';

// convert CSS-like style to SVG-like:

// this:
// 	{
// 		padding
// 		border_color
// 		border_width
// 		border_radius
//	
// 		color
// 		font_family
// 		font_size
// 		line_height
// 		font_style
// 		font_weight
// 		text_align
//
// 		background_color
// 	}
//
//	to this:
//	{
//		rect_style: {
//			fill
//			stroke
//			stroke-width
//			rx
//			ry
//		},
//		text_style: {
//			leading
//			family
//			size
//			style
//			weight
//			fill
//			anchor
//		},
//		additional_style: {
//			horizontal_text_offset,
//			vertical_text_offset
//		}
//	}

import {fillObject} from '../tools';

export function convertElementStyle(element_style) {
	var default_element_style = {
		padding: [15, 10],

		border_color: 'black',
		border_width: 2,
		border_radius: 4,
		
		color: 'black',
		font_family: 'Arial',
		font_size: 14,
		line_height: 1.25,
		font_style: 'normal',
		font_weight: 'normal',
		text_align: 'left',

		background_color: 'white'
	};

	var passed_style = fillObject(element_style, default_element_style);

	var rect_style = {
		'fill': passed_style.background_color,
		'stroke': passed_style.border_color,
		'stroke-width': passed_style.border_width,
		'rx': passed_style.border_radius,
		'ry': passed_style.border_radius
	}

	var text_style = {
		'leading': passed_style.line_height,
		'family': passed_style.font_family,
		'size': passed_style.font_size,
		'style': passed_style.font_style,
		'weight': passed_style.font_weight,
		'fill': passed_style.color,
		'anchor': (function () {
			var text_align = passed_style.text_align;
			if (text_align == 'left') {
				return 'start';
			} else if (text_align == 'center') {
				return 'middle';
			} else if (text_align == 'right') {
				return 'end';
			} else {
				// error
			}
		})()
	}

	var additional_style = {
		text_offset: {
			x: passed_style.padding[1],
			y: passed_style.padding[0]
		}
	}

	return {
		rect_style: rect_style,
		text_style: text_style,
		additional_style: additional_style
	}
}
