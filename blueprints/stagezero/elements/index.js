'use strict';

// everything needed to work with elements

//	element_type:
//		type: object of { type: 'simple' } by default, needs for Dolphin to be extendable
//	
//	element_blueprint:
//		id
//		position: {x, y}
//		type: element_type
//		text: element text as a single line
//		style: element_style (just like default_element_style but you may omit unused field like you are in CSS)
//
//	
//	address:
//		rendered_element,
//		socket
//	
//	rendered_element:
//		id
//		representation: actual element on the layer
//		tester
//		socket: function to get socket's coordinates by its number
//
//	sockets: TODO
//	tester: TODO


// 	element_style = {
// 		padding: [15, 10],
//
// 		border_color: 'black',
// 		border_width: 2,
// 		border_radius: 4,
//
// 		color: 'black',
// 		font_family: 'Arial',
// 		font_size: 14,
// 		line_height: 1.25,
// 		font_style: 'normal',
// 		font_weight: 'normal',
// 		text_align: 'left',
//
// 		background_color: 'white'
// 	}


import {fitText} from './text';
import {convertElementStyle} from './style';
import {computeRectSize, computeTextPosition} from './geometry';
import {getHash} from '../tools';


export function drawElement(layer, element_blueprint) {
	var new_layer = layer.clone();

	var element = new_layer.group();
	var style = convertElementStyle(element_blueprint.style);

	var element_text = element.text(
			fitText(element_blueprint.text)
		)
		.font(style.text_style);

	var rect_size = computeRectSize(element_text, style);
	var element_rect = element.rect(rect_size.w, rect_size.h)
		.attr(style.rect_style);

	var text_position = computeTextPosition(element_text, style);
	element_text.move(text_position.x, text_position.y);
	element_text.front();

	element.move(element_blueprint.position.x, element_blueprint.position.y);

	element.attr({
		id: getHash('element')
	})

	element.data({
		blueprint: element_blueprint//,
		// tester: generateTestMethods(element_rect, new_layer),
		// sockets: generateSockets(element, new_layer)
	});

	var element_with_id = {};
	element_with_id[getHash('element')] = element;

	new_layer.elements = Object.assign({}, 
		layer.elements,
		element_with_id
	);

	return new_layer;
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

