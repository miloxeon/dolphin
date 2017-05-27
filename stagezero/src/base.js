'use strict';

import {applyBlueprint, getSocketCoords, setRichText, drawBorder} from './lib/element';

var draw = SVG('diagram');

let element_blueprints = [
	{
		id: 1,
		position: {
			x: 200,
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
				},
				{
					name: 'age',
					type: 'int',
					value: '100'
				},
				{
					name: 'wife',
					scope: 'package',
					type: 'any'
				}
			],
			methods: [
				{
					name: 'helloWorld',
					type: 'int'
				},
				{
					name: 'foo',
					type: 'string',
					args: [
						{
							name: 'name',
							type: 'string',
							value: 'Alex'
						},
						{
							name: 'age',
							type: 'int',
							value: '100'
						},
						{
							name: 'wife',
							type: 'any'
						}
					]					
				}
			]
		}
	},
	{
		id: 2,
		position: {
			x: 400,
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
		from: 1,
		to: 2,
		text: 'inherits',
		style: {
			'stroke-dasharray': '5,5'
		}
	}
];

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		setRichText: setRichText,
		drawBorder: drawBorder,
		applyBlueprint: applyBlueprint,
		socket: getSocketCoords,
		blueprint: null,
		style: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.draggy();
		}
	}
});

SVG.Connection = SVG.invent({
	create: 'path',
	inherit: SVG.Path,
	extend: {
		connect: function (blueprint) {
			return this;
		},
		applyBlueprint: function (blueprint) {


			return this;
		},
		blueprint: null
	},
	construct: {
		connection: function (blueprint) {
			return this.put(new SVG.Connection)
				.applyBlueprint(blueprint);
		}
	}
});

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyTheme: function (theme) {

		}
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
			.applyTheme(theme)
			.addClass('class_diagram');
		}
	}
});

element_blueprints.forEach(function (blueprint) {
	draw.classDiagramNode(blueprint);
});

connection_blueprints.forEach(function (blueprint) {
	draw.connection(blueprint);
});
