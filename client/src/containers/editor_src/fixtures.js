'use strict';

// mock elements and connections

let element_blueprints = [
	{
		id: 1,
		position: {
			x: 300,
			y: 100
		},
		text: {
			name: 'Person',
			type: 'interface',
			attributes: [
				{
					name: 'name',
					type: 'string',
					value: 'Alex',
					scope: 'public'
				}, {
					name: 'age',
					type: 'int',
					value: '100'
				}, {
					name: 'wife',
					scope: 'protected',
					type: 'any'
				}
			],
			methods: [
				{
					name: 'helloWorld',
					type: 'int'
				}, {
					name: 'foo',
					type: 'string',
					args: [
						{
							name: 'name',
							type: 'string',
							value: 'Alex'
						}, {
							name: 'age',
							type: 'int',
							value: '100'
						}, {
							name: 'wife',
							type: 'any'
						}
					]
				}
			]
		}
	}, {
		id: 2,
		position: {
			x: 600,
			y: 300
		},
		text: {
			name: 'Creature',
			attributes: [
				{
					name: 'name',
					type: 'string'
				}
			]
		}
	}
];

let connection_blueprints = [
	{
		id: 1,
		type: 'inheritance',
		from: {
			id: 1,
			role: 'foo',
			indicator: '2'
		},
		to: {
			id: 2,
			role: 'bar',
			indicator: '1..*'
		},
		text: 'inherits'
	}
];

module.exports = {
	elements: element_blueprints,
	connections: connection_blueprints
}
