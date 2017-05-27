'use strict';

// convert CSS-like style to SVG-like

let merge = require('deepmerge');
import {class_theme} from '../theme/model';
import {xor, isComplexObject, isNested, isObject, convertObject} from '../tools';

export function convertElementStyle(passed_style) {
	let merged_style = merge(class_theme, passed_style);
	let converted_style = convertObject(merged_style, convertStyle);

	let additional_style = {
		padding: Object.assign({}, converted_style.rect_style.padding)
	}

	delete converted_style.rect_style.padding;

	let element_style = {
		rect_style: converted_style.rect_style,
		text_style: converted_style.text_style,
		additional_style: additional_style
	}

	return element_style;
}

function getValueError(name, value, accepted) {
	return new RangeError(
		'Wrong ' + 
		name.toString() + ': ' + 
		value.toString() + 
		'. Must be ' + 
		accepted.map(function (val) {
			return '`' + val.toString() + '`';
		}).join(' or ') + '.');
}

function getDefaultConverter(name, accepted) {
	return function(value) {
		let found = false;

		for (let acc in accepted) {
			if (value === accepted[acc]) {
				found = true;
			}
		}

		if (!found) {
			throw getValueError(name, value, accepted);
		} else {
			return value;
		}
	}
}

function convertStyle(style) {
	let decision_matrix = {
		'padding': {
			name: 'padding',
			converter: function (value) {
				let split_value = value.split(' ');
				return {
					w: parseInt(split_value[1]),
					h: parseInt(split_value[0])
				}
			}
		},
		'border-color': {
			name: 'stroke'
		},
		'border-width': {
			name: 'stroke-width',
			converter: parseInt
		},
		'border-radius': {
			name: ['rx', 'ry'],
			converter: parseInt
		},
		'color': {
			name: 'fill'
		},
		'font-family': {
			name: 'family'
		},
		'font-size': {
			name: 'size',
			converter: parseInt
		},
		'font-style': {
			name: 'style',
			converter: getDefaultConverter('font-style', ['normal', 'italic'])
		},
		'font-weight': {
			name: 'weight',
			converter: getDefaultConverter('font-weight', ['normal', 'bold'])
		},
		'text-align': {
			name: 'anchor',
			converter: function (value) {
				if (value === 'left') {
					return 'start';
				} else if (value === 'center') {
					return 'middle';
				} else if (value === 'right') {
					return 'end';
				} else {
					throw getValueError('text-align', value, ['left', 'center', 'right']);
				}
			}
		},
		'line-height': {
			name: 'leading',
			converter: parseFloat
		},
		'background-color': {
			name: 'fill'
		}
	};

	let converted_style = {};

	for (let parameter in style) {
		if (decision_matrix[parameter]) {

			let parameter_names = [].concat(decision_matrix[parameter].name);
			let parameter_convert_function = decision_matrix[parameter].converter || function (value) { return value; }

			parameter_names.forEach(function (parameter_name) {
				converted_style[parameter_name] = parameter_convert_function(style[parameter]);
			})

		} else {
			throw new TypeError('Wrong attribute name: ' + parameter.toString());
		}
	}

	return converted_style;
}
