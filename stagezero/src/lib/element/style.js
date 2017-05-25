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

let merge = require('deepmerge');
import {default_style} from './model';

export function convertElementStyle(style) {
	var passed_style = merge(default_style, style);

	var rect_style = {
		'fill': passed_style['background-color'],
		'stroke': passed_style['border-color'],
		'stroke-width': passed_style['border-width'],
		'rx': passed_style['border-radius'],
		'ry': passed_style['border-radius']
	}

	var text_style = {
		'leading': parseFloat(passed_style['line-height']),
		'family': passed_style['font-family'],
		'size': parseInt(passed_style['font-size']),
		'style': passed_style['font-style'],
		'weight': passed_style['font-weight'],
		'fill': passed_style['color'],
		'anchor': (function () {
			var text_align = passed_style['text-align'];
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

	let padding = passed_style['padding'].split(' ');

	var additional_style = {
		padding: {
			w: parseInt(padding[1]),
			h: parseInt(padding[0])
		}
	}

	return {
		rect_style: rect_style,
		text_style: text_style,
		additional_style: additional_style
	}
}
