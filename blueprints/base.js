'use strict';

var diagram = SVG('diagram');

var custom_theme = {
	padding: [15, 10],

	border_color: 'pink',
	border_width: 2,
	border_radius: 4,
	
	color: 'pink',
	font_family: 'Comic Sans',
	font_size: 14,
	line_height: 1.25,
	font_style: 'italic',
	font_weight: 'normal',
	text_align: 'center',

	background_color: 'white'
};

var blueprints = [
	{
		position: [150, 90],
		text: 'Harder, Ivan',
		theme: custom_theme
	},
	{
		position: [50, 100],
		text: 'Lorem ipsum dolor sit amet consectetur. Cras sodales imperdiet auctor.'
	}
];


var rendered_element = _drawElement(createElement(blueprints[1]));
rendered_element.rendered_element.draggy();

// setInterval(function () {
	// console.log(rendered_element.tester())
// }, 500);


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
		rect: element_rect,
		text: element_text,
		rendered_element: element,
		tester: generateTestMethods(element_rect),
		sockets: generateSockets(element)
	}

	return rendered_element;
}

function generateSockets(rendered_element) {
	var tester = generateTestMethods(rendered_element)();

	var sockets = [
		generateSocket(rendered_element, 0, 			0, 'red'),		// socket 1: top left
		generateSocket(rendered_element, tester.w / 2, 	0, 'green'),	// socket 2: top center
		generateSocket(rendered_element, tester.w, 		0, 'blue'),		// socket 3: top right

		generateSocket(rendered_element, 0, 			tester.h / 2, 'black'),		// socket 4: middle left
		generateSocket(rendered_element, tester.w, 		tester.h / 2, 'orange'),	// socket 5: middle right

		generateSocket(rendered_element, 0, 			tester.h, 'purple'),	// socket 6: bottom left
		generateSocket(rendered_element, tester.w / 2, 	tester.h, 'grey'),		// socket 7: bottom center
		generateSocket(rendered_element, tester.w, 		tester.h, 'hotpink')	// socket 8: bottom right
	]

	return function (number) {
		return sockets[number - 1];
	}
}

function generateSocket(rendered_element, cx, cy, color) {
	var socket = rendered_element.circle(5).center(cx, cy).fill(color);
	var tester = generateTestMethods(socket)();

	return [tester.cx, tester.cy];
}

function generateTestMethods(rendered_element) {
	return function () {
		var rbox = rendered_element.rbox();
		var diagram_rbox = diagram.rbox();

		return {
			'x': rbox.x - diagram_rbox.x,
			'y': rbox.y - diagram_rbox.y,
			'x2': rbox.x + rbox.w,
			'y2': rbox.y + rbox.h,
			'cx': rbox.x + rbox.w / 2,
			'cy': rbox.y + rbox.h / 2,
			'w': rbox.w,
			'h': rbox.h
		}
	}
}

function computeRectSize(rendered_label, virtual_element) {
	return [
		rendered_label.bbox().w + 
			virtual_element.style.element_style.padding[0] * 2 +
			virtual_element.style.rect_style['stroke-width'],

		rendered_label.bbox().h + 
			virtual_element.style.element_style.padding[1] * 2 + 
			virtual_element.style.rect_style['stroke-width']
	]
}

function computeTextPosition(rendered_label, virtual_element) {
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



function createElement(blueprint) {
	var id = Math.floor(Math.random() * new Date());
	var position = blueprint.position || [0, 0];
	var type = (!blueprint.type || blueprint.type == {}) ? {type: 'simple'} : blueprint.type;
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
		style: style
	}
}

function fitText(text, max_length) {
	var max_word_length = max_length || 20;

	var words = text.split(' ');	

	var lines = [];
	var line = '';

	words.forEach(function (word) {
		if (line.length + word.length >= getLongestWordLength(words)) {
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


	function getLongestWordLength(words) {
		var real_max_word_length = words.concat().sort(function (a, b) {
			return b.length - a.length;
		})[0].length;

		return (max_word_length > real_max_word_length) ? max_word_length : real_max_word_length;
	}
}
