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
import {cloneLayer} from '../layers';


export function drawElement(layer, element_blueprint) {
	var new_layer = cloneLayer(layer);
	
	// create the element itself
	var element = _createElement(new_layer);
	var style = convertElementStyle(element_blueprint.style);

	// console.log(element_blueprint);

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

	// assign element's data

	var element_tester = _generateTestMethods(element_rect, new_layer);

	element.extensions = {
		blueprint: element_blueprint,
		tester: element_tester,
		socket: _generateSockets(element_tester)
	}

	var element_id = getHash('element');

	element.attr({
		id: element_id
	})

	var element_with_id = {};
	element_with_id[element_id] = element;

	new_layer.elements = Object.assign({}, 
		layer.elements,
		element_with_id
	);

	return new_layer;
}

function _createElement(layer) {
	return layer.group();
}

function cloneElement(element) {
	var new_element = element.clone();

	new_element.extensions = element.extensions;
	new_element.attr({
		id: element.attr('id')
	});

	return new_element;
}

function _generateTestMethods(element, layer) {
	return function () {
		var rbox = element.rbox();
		var layer_rbox = layer.doc().rbox();

		var x = rbox.x - layer_rbox.x;
		var y = rbox.y - layer_rbox.y;

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

function _generateSockets(tester) {
	return function (number) {

		var activated_tester = tester();

		var socket_offsets = [
			{
				// socket 1: top left
				x: 0,
				y: 0
			},
			{
				// socket 2: top center
				x: activated_tester.w / 2,
				y: 0
			},
			{
				// socket 3: top right
				x: activated_tester.w,
				y: 0
			},
			{
				// socket 4: middle left
				x: 0,
				y: activated_tester.h / 2
			},
			{
				// socket 5: middle right
				x: activated_tester.w,
				y: activated_tester.h / 2
			},
			{
				// socket 6: bottom left
				x: 0,
				y: activated_tester.h
			},
			{
				// socket 7: bottom center
				x: activated_tester.w / 2,
				y: activated_tester.h
			},
			{
				// socket 8: bottom right
				x: activated_tester.w,
				y: activated_tester.h
			},
		];

		var socket_positions = socket_offsets.map(function (offset) {
			return {
				x: offset.x + activated_tester.x,
				y: offset.y + activated_tester.y
			}
		});
		
		return socket_positions[number - 1];
	}
}

// function _generateSockets(layer, element) {
// 	var new_element = cloneElement(element);

// 	var tester = _generateTestMethods(new_element, layer)();

// 	var colors = [
// 		'red',
// 		'green',
// 		'blue',
// 		'black',
// 		'orange',
// 		'purple',
// 		'grey',
// 		'hotpink'
// 	];

// 	// var colors = [
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent',
// 	// 	'transparent'
// 	// ];

// 	var socket_positions = [
// 		{
// 			// socket 1: top left
// 			x: 0,
// 			y: 0
// 		},
// 		{
// 			// socket 2: top center
// 			x: tester.w / 2,
// 			y: 0
// 		},
// 		{
// 			// socket 3: top right
// 			x: tester.w,
// 			y: 0
// 		},
// 		{
// 			// socket 4: middle left
// 			x: 0,
// 			y: tester.h / 2
// 		},
// 		{
// 			// socket 5: middle right
// 			x: tester.w,
// 			y: tester.h / 2
// 		},
// 		{
// 			// socket 6: bottom left
// 			x: 0,
// 			y: tester.h
// 		},
// 		{
// 			// socket 7: bottom center
// 			x: tester.w / 2,
// 			y: tester.h
// 		},
// 		{
// 			// socket 8: bottom right
// 			x: tester.w,
// 			y: tester.h
// 		},
// 	];

// 	// imperative dirty stuff begin. I feel so sorry about that
// 	var current_color = 0;

// 	for (let socket_position in socket_positions) {
// 		new_element = generateSocket(new_element, socket_position, colors[current_color]);

// 		if (current_color + 1 == colors.length) {
// 			current_color = 0;
// 		} else {
// 			current_color++;
// 		}
// 	}
// 	// imperative dirty stuff end

// 	new_element['sockets'] = function(number) {
// 		return socket_positions[number - 1];
// 	}

// 	return new_element;
// }

// function generateSocket(element, position, color) {
// 	var new_element = cloneElement(element);
// 	return new_element.circle(5).center(position.x, position.y).fill(color);
// }
