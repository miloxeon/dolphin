'use strict';

export function convertStyle(style) {
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
		},
		'stroke': {
			name: 'stroke'
		},
		'stroke-opacity': {
			name: 'stroke-opacity',
			converter: parseFloat
		},
		'stroke-linecap': {
			name: 'stroke-linecap',
			converter: getDefaultConverter('stroke-linecap', ['butt', 'square', 'round'])
		},
		'stroke-linejoin': {
			name: 'stroke-linejoin',
			converter: getDefaultConverter('stroke-linecap', ['miter', 'bevel', 'round'])
		},
		'stroke-dasharray': {
			name: 'stroke-dasharray'
		},
		'fill': {
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

let monokai = {
	rect_style: {
		'background-color': '#272822',
		'border-color': 'white',
		'border-width': '1'
	},
	text_style: {
		common: {
			'color': 'white'
		},
		node: {
			name: {
				'color': '#A6E22E',
				'font-weight': 'bold'
			}
		},
		attribute: {
			scope: {
				'color': '#F92672'
			},
			type: {
				'color': '#66D9EF'
			},
			symbol: {
				'color': '#F92672'
			},
			value: {
				common: {
					'color': '#AE81FF'
				},
				string: {
					'color': '#E6DB74'
				}
			}
		},
		method: {
			scope: {
				'color': '#F92672'
			},
			type: {
				'color': '#66D9EF',
				'font-style': 'italic'
			},
			name: {
				'color': '#A6E22E',
			}
		}
	}
};
