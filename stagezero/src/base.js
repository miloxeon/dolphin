'use strict';

let merge = require('deepmerge');
import {default_blueprint, default_attribute, default_method} from './lib/element/model';

var draw = SVG('diagram');

let blueprint = {
	id: 1,
	position: {
		x: 100,
		y: 100
	},
	text: {
		name: 'Person',
		attributes: [
			{
				name: 'name',
				type: 'string',
				scope: 'public'
			},
			{
				name: 'age'
			}
		],
		methods: [

		]
	},
	style: {
		'background-color': 'pink',
		'font-size': '12'
	}
}

function fillBlueprint(blueprint) {
	if (!blueprint.position) {
		throw new TypeError('Invalid blueprint: coordinates are missing');
		return;
	} else {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(default_blueprint, blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(default_attribute, attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(default_method, method);
		});

		return desired_blueprint;		
	}
}

fillBlueprint(blueprint);

SVG.ClassDiagramNode = SVG.invent({
	create: 'rect',
	inherit: SVG.Shape,
	extend: {
		size: function (width, height) {
			return this.attr({
				width: width, 
				height: height,
				rx: height / 5,
				ry: height / 5
			});
		},
		abc: function (color) {
			return this.attr({
				fill: color
			})
		}
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode).size(width, height);
		}
	}
});

// var element = draw.classDiagramNode(200, 100).abc('pink');



