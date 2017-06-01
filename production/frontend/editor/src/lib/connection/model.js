'use strict';

export let default_blueprint = {
	id: 1,
	type: 'association-bidi',
	from: {
		id: 1,
		role: '',
		indicator: ''
	},
	to: {
		id: 2,
		role: '',
		indicator: ''
	},
	text: ''
};

export let allowed_types = [
	'association',
	'association-bidi',
	'inheritance',
	'implementation',
	'dependency',
	'aggregation',
	'composition'
];
