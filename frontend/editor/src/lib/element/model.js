'use strict';
// todo errors

// data models for element

export let default_blueprint = {
	id: 0,
	position: {
		x: 0,
		y: 0
	},
	text: {
		name: 'NewClass',
		type: 'normal',
		attributes: [],
		methods: []
	},
};

export let default_attribute = {
	name: 'newElement',
	value: '',
	type: 'any',
	scope: 'public'
};

export let default_method = {
	name: 'newMethod',
	type: 'any',
	scope: 'public',
	args: []
};

export let default_argument = {
	name: 'newArgument',
	type: 'any',
	value: ''
}
