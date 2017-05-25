'use strict';

// data models for element

export let default_style = {
	'padding': '15 10',

	'border-color': 'black',
	'border-width': '2',
	'border-radius': '4',

	'color': 'black',
	'font-family': 'Arial',
	'font-size': '14',
	'line-height': '1.25',
	'font-style': 'normal',
	'font-weight': 'normal',
	'text-align': 'left',

	'background-color': 'white'
}

export let default_blueprint = {
	id: 0,
	position: {
		x: 0,
		y: 0
	},
	text: {
		name: 'NewClass',
		attributes: [],
		methods: []
	},
	style: default_style
}

export let default_attribute = {
	name: 'newElement',
	value: '',
	type: 'any',
	scope: 'public'
}

export let default_method = {
	name: 'newMethod',
	type: 'any',
	scope: 'public'
}
