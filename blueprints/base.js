'use strict';

var diagram = SVG('diagram');

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
	'stroke-dasharray': '5,5'
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

var rendered_connection = _drawConnection(createConnection({
	from: rendered_elements[0].sockets(5),
	to: rendered_elements[1].sockets(4),
	style: custom_line_style
}));

rendered_elements.forEach(function (element) {
	element.snapshot.on('dragmove', function () {
		_destroyConnection(rendered_connection);
		rendered_connection = _drawConnection(createConnection({
			from: rendered_elements[0].sockets(5),
			to: rendered_elements[1].sockets(4),
			style: custom_line_style
		}));
	});
});

function _drawConnection(virtual_connection) {
	var pos1 = virtual_connection.from;
	var pos2 = virtual_connection.to;

	var x_between_elements = pos1[0] + Math.abs(pos1[0] - pos2[0]) / 2;

	var line = diagram.path(
		'M ' + 
		pos1[0].toString() + ' ' + 
		pos1[1].toString() + ' ' + 
		'C ' +
		x_between_elements.toString() + ' ' + 
		pos1[1].toString() + ' ' +
		x_between_elements.toString() + ' ' + 
		pos2[1].toString() + 
		' ' + 
		pos2[0].toString() + ' ' + 
		pos2[1].toString()
	).attr(virtual_connection.style);

	return {
		blueprint: virtual_connection.blueprint,
		origin: virtual_connection,
		snapshot: line,
		tester: generateTestMethods(line)
	}
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

	var type = (!connection_blueprint.type || connection_blueprint.type == {}) ? {type: 'simple'} : connection_blueprint.type;
	var blueprint_style = connection_blueprint.style || {};

	var default_style = {
		'stroke': 'black',
		'stroke-width': '1',
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
		tester: generateTestMethods(element_rect),
		sockets: generateSockets(element)
	}

	return rendered_element;
}

function generateSockets(rendered_element) {
	var tester = generateTestMethods(rendered_element)();

	var colors = [
		'red',
		'green',
		'blue',
		'black',
		'orange',
		'purple',
		'grey',
		'hotpink'
	];

	// var colors = [
	// 	'transparent',
	// 	'transparent',
	// 	'transparent',
	// 	'transparent',
	// 	'transparent',
	// 	'transparent',
	// 	'transparent',
	// 	'transparent'
	// ];

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
	var tester = generateTestMethods(socket);

	return tester;
}

function generateTestMethods(rendered_element) {
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
	var id = 'element_' + Math.floor(Math.random() * new Date()).toString();
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
		style: style,
		blueprint: blueprint
	}
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
