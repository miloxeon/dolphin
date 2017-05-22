'use strict';

import {getHash} from './common';
import {checkConnectionType, defineLineShape, createConnection} from './lines';

export function connectElements(strict_connection_blueprint) {

	var from = strict_connection_blueprint.from;
	var to = strict_connection_blueprint.to;

	var from_coords = from.rendered_element.sockets(from.socket);
	var to_coords = to.rendered_element.sockets(to.socket);

	var connection_blueprint = Object.assign({}, strict_connection_blueprint);
	delete connection_blueprint.from;
	delete connection_blueprint.to;

	var type = checkConnectionType(connection_blueprint.type);

	type.shape = defineLineShape(from.socket, to.socket);

	delete connection_blueprint.type;

	return createConnection(Object.assign({}, {
		from: from_coords,
		to: to_coords,
		type: type
	}, connection_blueprint));
}

export function createElement(blueprint) {
	var id = 'element_' + getHash();
	var position = blueprint.position || [0, 0];
	var type = checkElementType(blueprint.type);
	var blueprint_style = blueprint.theme || {};

	var default_theme = {
		padding: [15, 10],

		border_color: 'black',
		border_width: 2,
		border_radius: 4,
		
		color: 'black',
		font_family: 'Arial',
		font_size: 14,
		line_height: 1.25,
		font_style: 'normal',
		font_weight: 'normal',
		text_align: 'left',

		background_color: 'white'
	};

	var style = {
		text_style: {
			'leading': blueprint_style.line_height || default_theme.line_height,
			'family': blueprint_style.font_family || default_theme.font_family,
			'size': blueprint_style.font_size || default_theme.font_size,
			'style': blueprint_style.font_style || default_theme.font_style,
			'weight': blueprint_style.font_weight || default_theme.font_weight,
			'fill': blueprint_style.color || default_theme.color,
			'anchor': (function () {
				var text_align = blueprint_style.text_align || default_theme.text_align;

				if (text_align == 'left') {
					return 'start';
				} else if (text_align == 'center') {
					return 'middle';
				} else if (text_align == 'right') {
					return 'end';
				} else {
					// error
				}
			})()
		},
		rect_style: {
			'fill': blueprint_style.background_color || default_theme.background_color,
			'stroke': blueprint_style.border_color || default_theme.border_color,
			'stroke-width': blueprint_style.border_width || default_theme.border_width,
			'rx': blueprint_style.border_radius || default_theme.border_radius,
			'ry': blueprint_style.border_radius || default_theme.border_radius
		},
		element_style: {
			'padding' : blueprint_style.padding || default_theme.padding
		}
	}

	var text = {
		text: fitText(blueprint.text),
		position: [
			style.element_style.padding[0] + style.rect_style['stroke-width'] / 2,
			style.element_style.padding[1] + style.rect_style['stroke-width'] / 2
		]
	}

	return {
		id: id,
		position: position,
		type: type,
		text: text,
		style: style,
		blueprint: blueprint
	}
}

export function createAddress(element, socket) {
	return {
		rendered_element: element,
		socket: socket
	}
}

export function checkElementType(type) {
	var defaults = {
		type: 'simple'
	}

	var new_type = Object.assign({}, type);

	for (var param in defaults) {
		if (!new_type.param) {
			new_type.param = param;
		}
	}

	return new_type;
}

export function computeRectSize(rendered_label, virtual_element) {
	return [
		rendered_label.bbox().w + 
			virtual_element.style.element_style.padding[0] * 2 +
			virtual_element.style.rect_style['stroke-width'],

		rendered_label.bbox().h + 
			virtual_element.style.element_style.padding[1] * 2 + 
			virtual_element.style.rect_style['stroke-width']
	]
}

export function computeTextPosition(rendered_label, virtual_element) {
	return [
		virtual_element.style.element_style.padding[0] + 
			virtual_element.style.rect_style['stroke-width'] / 2 + 
			(function () {
				if (virtual_element.style.text_style.anchor == 'start') {
					return 0;
				} else if (virtual_element.style.text_style.anchor == 'middle') {
					return rendered_label.bbox().w / 2;
				} else if (virtual_element.style.text_style.anchor == 'end') {
					return rendered_label.bbox().w;
				} else {
					// error
				}
			})(),

		virtual_element.style.element_style.padding[1] + 
			virtual_element.style.rect_style['stroke-width'] / 2
	];
}

function fitText(text, max_length) {
	var max_word_length = max_length || 20;

	var words = text.split(' ');	

	var lines = [];
	var line = '';

	words.forEach(function (word) {
		if (line.length + word.length >= getLongestWordLength(words, max_word_length)) {
			lines.push(line);
			line = '';
		}
		line += word + ' ';
	});

	if (line) {
		lines.push(line);
	}

	lines = lines.map(function (line) {
		return line.slice(0, -1) + '\n';
	});

	return lines.join('');
}

function getLongestWordLength(words, max_word_length) {
	var real_max_word_length = words.concat().sort(function (a, b) {
		return b.length - a.length;
	})[0].length;

	return Math.max(real_max_word_length, max_word_length);
}
