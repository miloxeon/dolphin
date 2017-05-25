'use strict';

let merge = require('deepmerge');
import {default_blueprint, default_attribute, default_method} from './lib/element/model';
import {convertElementStyle} from './lib/element/style';

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
		// 'background-color': 'pink'
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

function getScopeSymbol(scope) {
	switch (scope.toLowerCase()) {
		case 'public':
			return '+';
			break;

		case 'private':
			return '-';
			break;

		case 'protected':
			return '#';
			break;

		case 'derived':
			return '/';
			break;

		case 'package':
			return '~';
			break;
	}
}

function prepareText(element_text) {
	var prepared_attributes = element_text.attributes.map(function (attribute) {

		return [
			getScopeSymbol(attribute.scope),
			attribute.name,
			(attribute.type === 'any') ? '' : ': ' + attribute.type
		].join(' ') + 
			((attribute.value !== '') ? [' =', attribute.value].join(' ') : '');
	})

	var prepared_methods = element_text.methods.map(function (method) {
		return [
			getScopeSymbol(method.scope),
			(method.type === 'any') ? '' : method.type,
			method.name + '()'
		].join(' ');
	})

	// console.log(element_text.attributes);

	return {
		name: element_text.name,
		attributes: prepared_attributes.join('\n'),
		methods: prepared_methods.join('\n')
	}
}

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: function (blueprint) {
			var checked_blueprint = fillBlueprint(blueprint);

			let style = convertElementStyle(checked_blueprint.style || {});
			let padding = style.additional_style.padding;

			let text = this.text(prepareText(checked_blueprint.text).methods).font(style.text_style).move(padding.w, padding.h);

			let rect_size = {
				w: text.bbox().w + padding.w * 2,
				h: text.bbox().h + padding.h * 2
			}

			let rect = this.rect(rect_size.w, rect_size.h).attr(style.rect_style).move(0, 0);
			text.front();

			return this;
		}
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode).applyBlueprint(blueprint).move(blueprint.position.x, blueprint.position.y);
		}
	}
});

var element = draw.classDiagramNode(blueprint);
// draw.rounded(200, 200);
// 
// 


console.log(draw.svg());
