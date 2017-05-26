'use strict';

import {applyBlueprint} from './lib/element';

var draw = SVG('diagram');

let blueprint = {
	id: 1,
	position: {
		x: 200,
		y: 100
	},
	text: {
		name: 'Person',
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
				scope: 'private',
				type: 'any'
			}
		],
		methods: [
			{
				name: 'helloWorld',
				type: 'int'
			}

		]
	},
	style: {
		'text-align': 'right'
	}
}

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: applyBlueprint
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.draggy();
		}
	}
});

var element = draw.classDiagramNode(blueprint);
