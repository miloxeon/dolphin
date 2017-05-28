'use strict';

export let class_theme = {
	rect_style: {
		'padding': '11 11',
		'border-color': 'black',
		'border-width': '2',
		'border-radius': '4',
		'background-color': 'white'
	},
	text_style: {
		common: {
			// styles applied to overall text
			'color': 'black',
			'font-family': 'Verdana, sans-serif',
			'font-size': '12',
			'line-height': '1.25',
			'font-style': 'normal',
			'font-weight': 'normal',
			'text-align': 'left'
		},
		node: {
			common: {
			},
			name: {
				'font-weight': 'bold'
			},
			type: {
				// for example, <<interface>>
				'font-style': 'italic',
				'font-size': '9'
			}
		},
		attribute: {
			common: {
				// styles applied to overall attributes
			},
			scope: {
				// +, -, /, ~ and so on
				'font-family': 'Courier New, monospace',
				'color': '#B90690'
			},
			name: {

			},
			type: {
				'color': 'blue',
				'font-style': 'italic'
			},
			symbol: {
				// '=' if there is default value
			},
			value: {
				common: {
					'color': 'blue'
				},
				string: {
					'color': '#036A07'
				},
				integer: {

				}
			}
		},
		method: {
			common: {
				
			},
			scope: {
				'font-family': 'Courier New, monospace',
				'color': '#B90690'
			},
			type: {
				'color': 'blue'
			},
			name: {
				'color': '#0000A2',
			},
			passed: {
				// these styles will override everything applied to passed agruments
				// 'color': 'dimgrey'
			}
		}
	},
	line_style: {
		line: {
			'stroke': 'black',
			'stroke-opacity': '1',
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'fill': 'none'
		},
		text: {
			// text on top of the line
			'color': 'black',
			'font-family': 'Verdana, sans-serif',
			'font-size': '12',
			'line-height': '1.25',
			'font-style': 'normal',
			'font-weight': 'normal',
			'text-align': 'left'
		}
	}
};
