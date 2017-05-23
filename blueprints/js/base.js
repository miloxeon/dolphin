'use strict';

import {createElement, connectElements, computeRectSize, computeTextPosition, createAddress} from '../lib/toolkit/elements';
import {defineRelativePosition, checkIfInside} from '../lib/toolkit/geometry';

var diagram = SVG('diagram').group();

var layer = {
	id,
	origin
}

var connection_type = {
	type,
	shape,
	roughness
}

var line_blueprint = {
	id,
	from,
	to,
	type,
	style
}

var connection_blueprint = {
	id,
	from,	// addresses
	to,
	type,
	style
}




var address = {
	rendered_element,
	socket
}


var custom_theme = {
	border_color: 'pink',
	color: 'white',
	font_family: 'Comic Sans',
	font_size: 14,
	font_style: 'italic',
	text_align: 'center',
	background_color: 'pink'
};

var blueprints = [
	{
		position: [150, 90],
		text: 'Harder, Ivan',
		theme: custom_theme
	},
	{
		position: [450, 100],
		text: 'Lorem ipsum dolor sit amet consectetur. Cras sodales imperdiet auctor.'
	}
];

var custom_line_style = {
	'stroke': 'red',
	'stroke-width': '3',
	'stroke-dasharray': '1,5'
}

var connections = [
	{
		from: [50, 50],
		to: [100, 100],
		type: {type: 'simple'},
		style: custom_line_style
	},
	{
		from: [70, 50],
		to: [100, 120]
	}
];


var rendered_elements = blueprints.map(function (blueprint) {
	var element = _drawElement(createElement(blueprint));
	element.snapshot.draggy();
	return element;
});

var sockets = defineSockets(rendered_elements[0], rendered_elements[1]);

var rendered_connection = _drawConnection(connectElements({
	from: createAddress(rendered_elements[0], sockets[0]),
	to: createAddress(rendered_elements[1], sockets[1]),
	style: custom_line_style
}))

rendered_elements.forEach(function (element) {
	element.snapshot.on('dragmove', function () {
		if (rendered_connection) {
			_destroyConnection(rendered_connection);
		}

		var sockets = defineSockets(rendered_elements[0], rendered_elements[1]);

		if (sockets.length > 0) {

			rendered_connection = _drawConnection(connectElements({
				from: createAddress(rendered_elements[0], sockets[0]),
				to: createAddress(rendered_elements[1], sockets[1]),
				style: custom_line_style,
				type: {
					roughness: 'soft'
				}
			}))
		}
	});
});

function defineSockets(rendered_element_1, rendered_element_2) {
	var decision_matrix = {
		'1': '24',
		'2': '54',
		'3': '54',
		'4': '74',
		'5': '75',
		'6': '45',
		'7': '45',
		'8': '25',

		'12': '24',
		'23': '54',
		'34': '74',
		'45': '72',
		'56': '75',
		'67': '45',
		'78': '25',
		'18': '27',

		'123': '54',
		'234': '54',
		'345': '72',
		'456': '72',
		'567': '45',
		'678': '45',
		'178': '27',
		'128': '27',

		'1234': '54',
		'2345': '',		//overlaps are empty (no line required)
		'3456': '72',
		'4567': '',
		'5678': '45',
		'1678': '',
		'1278': '27',
		'1238': ''
	}

	var sockets = decision_matrix[defineRelativePosition(rendered_element_2, rendered_element_1)];
	var is_overlap = checkOverlap(rendered_element_1, rendered_element_2);

	if (is_overlap) {
		return [];
	} else {
		return sockets ? sockets.split('').reverse() : [];
	}
}

function checkOverlap(rendered_element_1, rendered_element_2) {
	var bbox_1 = rendered_element_1.tester();
	var bbox_2 = rendered_element_2.tester();

	return checkIfInside(rendered_element_1, [bbox_2.x, bbox_2.y]) || 
		checkIfInside(rendered_element_1, [bbox_2.x2, bbox_2.y]) || 
		checkIfInside(rendered_element_1, [bbox_2.x, bbox_2.y2]) || 
		checkIfInside(rendered_element_1, [bbox_2.x2, bbox_2.y2]) ||

		checkIfInside(rendered_element_2, [bbox_1.x, bbox_1.y]) || 
		checkIfInside(rendered_element_2, [bbox_1.x2, bbox_1.y]) || 
		checkIfInside(rendered_element_2, [bbox_1.x, bbox_1.y2]) || 
		checkIfInside(rendered_element_2, [bbox_1.x2, bbox_1.y2]);

}

function _drawConnection(virtual_connection) {
	var from = virtual_connection.from;
	var to = virtual_connection.to;

	if (virtual_connection.type.shape && virtual_connection.type.shape == 'arc') {

		if (virtual_connection.from[0] <= virtual_connection.to[0]) {
			var direction = 'normal';
		} else {
			var direction = 'reverse';
		}
		var pos1 = virtual_connection.to;
		var pos2 = virtual_connection.from;

		var line = _arcTo(pos1, pos2).attr(virtual_connection.style);

	} else {

		if (virtual_connection.from[0] <= virtual_connection.to[0]) {
			var direction = 'normal';
			var pos1 = virtual_connection.from;
			var pos2 = virtual_connection.to;

		} else {
			var direction = 'reverse';
			var pos1 = virtual_connection.to;
			var pos2 = virtual_connection.from;
		}
		var line = _cubicTo(pos1, pos2).attr(virtual_connection.style);
	}

	return {
		blueprint: virtual_connection.blueprint,
		origin: virtual_connection,
		snapshot: line,
		tester: _generateTestMethods(line)
	}
}

function _apply_params(element, params) {
	return element.attr(params);
}

function _arcTo(from, to, style) {

	var x_between_from_and_to = from[0] + Math.abs(from[0] - to[0]) / 2;

	var bias = [
		from[0],
		to[1]
	];

	return _cubic(from, to, bias, bias);
}

function _cubicTo(from, to) {

	var x_between_from_and_to = from[0] + Math.abs(from[0] - to[0]) / 2;

	var bias_1 = [
		x_between_from_and_to,
		from[1]
	];

	var bias_2 = [
		x_between_from_and_to,
		to[1]
	];

	return _cubic(from, to, bias_1, bias_2);
}

function _cubic(from, to, bias_1, bias_2) {
	return diagram.path(
		'M ' + 
		from[0].toString() + ' ' + 
		from[1].toString() + ' ' + 
		'C ' +
		bias_1[0].toString() + ' ' + 
		bias_1[1].toString() + ' ' +
		bias_2[0].toString() + ' ' + 
		bias_2[1].toString() + 
		' ' + 
		to[0].toString() + ' ' + 
		to[1].toString()
	);
}

function _destroyConnection(rendered_connection) {
	rendered_connection.snapshot.remove();
}

function createConnection (connection_blueprint) {
	var id = 'connection_' + Math.floor(Math.random() * new Date()).toString();
	
	if (connection_blueprint.from && connection_blueprint.to) {
		var from = connection_blueprint.from;
		var to = connection_blueprint.to;
	} else {
		// error
	}

	var type = checkConnectionType(connection_blueprint.type);

	var blueprint_style = connection_blueprint.style || {};

	var default_style = {
		'stroke': 'black',
		'stroke-width': '2',
		'fill': 'none',
		'stroke-linecap': 'round',
		'stroke-dasharray': 'none'
	}

	var style = {
		'stroke': blueprint_style['stroke'] || default_style['stroke'],
		'stroke-width': blueprint_style['stroke-width'] || default_style['stroke-width'],
		'fill': blueprint_style['fill'] || default_style['fill'],
		'stroke-linecap': blueprint_style['stroke-linecap'] || default_style['stroke-linecap'],
		'stroke-dasharray': blueprint_style['stroke-dasharray'] || default_style['stroke-dasharray']
	}

	return {
		id: id,
		type: type,
		from: from,
		to: to,
		style: style,
		blueprint: connection_blueprint
	}
}


function _drawElement(virtual_element) {
	// init element
	var element = diagram.group();

	// create text and rect
	var element_text = element.text(virtual_element.text.text)
		.font(virtual_element.style.text_style);

	var rect_size = computeRectSize(element_text, virtual_element);

	var element_rect = element.rect(rect_size[0], rect_size[1])
		.attr(virtual_element.style.rect_style);


	// position everything
	element_text.front();

	var position = virtual_element.position;
	element.move(position[0], position[1]);

	var text_position = computeTextPosition(element_text, virtual_element);
	element_text.move(text_position[0], text_position[1]);

	var rendered_element = {
		blueprint: virtual_element.blueprint,
		origin: virtual_element,
		snapshot: element,
		tester: _generateTestMethods(element_rect),
		sockets: generateSockets(element)
	}

	return rendered_element;
}

function generateSockets(rendered_element) {
	var tester = _generateTestMethods(rendered_element)();

	// var colors = [
	// 	'red',
	// 	'green',
	// 	'blue',
	// 	'black',
	// 	'orange',
	// 	'purple',
	// 	'grey',
	// 	'hotpink'
	// ];

	var colors = [
		'transparent',
		'transparent',
		'transparent',
		'transparent',
		'transparent',
		'transparent',
		'transparent',
		'transparent'
	];

	var sockets = [
		_generateSocket(rendered_element, 0, 			0, colors[0]),	// socket 1: top left
		_generateSocket(rendered_element, tester.w / 2, 0, colors[1]),	// socket 2: top center
		_generateSocket(rendered_element, tester.w, 	0, colors[2]),	// socket 3: top right

		_generateSocket(rendered_element, 0, 			tester.h / 2, colors[3]),	// socket 4: middle left
		_generateSocket(rendered_element, tester.w, 	tester.h / 2, colors[4]),	// socket 5: middle right

		_generateSocket(rendered_element, 0, 			tester.h, colors[5]),	// socket 6: bottom left
		_generateSocket(rendered_element, tester.w / 2, tester.h, colors[6]),	// socket 7: bottom center
		_generateSocket(rendered_element, tester.w, 	tester.h, colors[7])	// socket 8: bottom right
	]

	return function (number) {
		return [sockets[number - 1]().cx, sockets[number - 1]().cy];
	}
}

function _generateSocket(rendered_element, cx, cy, color) {
	var socket = rendered_element.circle(5).center(cx, cy).fill(color);
	var tester = _generateTestMethods(socket);

	return tester;
}

function _generateTestMethods(rendered_element) {
	return function () {
		var rbox = rendered_element.rbox();
		var diagram_rbox = diagram.rbox();

		var x = rbox.x - diagram_rbox.x;
		var y = rbox.y - diagram_rbox.y;

		return {
			'x': x,
			'y': y,
			'x2': x + rbox.w,
			'y2': y + rbox.h,
			'cx': x + rbox.w / 2,
			'cy': y + rbox.h / 2,
			'w': rbox.w,
			'h': rbox.h
		}
	}
}
