'use strict';

var diagram = SVG('diagram');

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

var elements = [
	{
		id: Math.floor(Math.random() * new Date()),
		position: [150, 90],
		type: {type: 'simple'},
		text: 'Harder, Ivan',
		theme: custom_theme
	},
	{
		id: Math.floor(Math.random() * new Date()),
		position: [280, 90],
		type: {type: 'simple'},
		text: 'Lorem ipsum dolor sit amet consectetur. Cras sodales imperdiet auctor.'
	}
];

var rendered_elements = [];

elements.forEach(function (element) {
	rendered_elements.push(_drawElement(element));
});

// var c1 = rendered_elements[0].sockets[4].cx() + Math.abs((rendered_elements[0].sockets[4].cx() - rendered_elements[1].sockets[3].cx())) / 2;

// diagram.path(
// 	'M ' + 
// 	rendered_elements[0].sockets[4].cx().toString() + ' ' + 
// 	rendered_elements[0].sockets[4].cy().toString() + ' ' + 
// 	'C ' +
// 	c1.toString() + ' ' + 
// 	rendered_elements[0].sockets[4].cy().toString() + ' ' +
// 	c1.toString() + ' ' + 
// 	rendered_elements[1].sockets[3].cy().toString() + 
// 	' ' + 
// 	rendered_elements[1].sockets[3].cx().toString() + ' ' + 
// 	rendered_elements[1].sockets[3].cy().toString()
// ).attr({
// 	'stroke': 'black',
// 	'stroke-width': '1',
// 	'fill': 'none',
// 	'stroke-linecap': "round",
// 	'stroke-dasharray': "5,5"
// });




var connections = [];

rendered_elements[0].draggy();

setInterval(function () {
	_connectElements(rendered_elements[0], rendered_elements[1]);
	// console.log(rendered_elements[0].bbox().x, rendered_elements[0].bbox().y);


	setTimeout(function () {
		connections[0].remove();
		connections = [];
	}, 400);

}, 500);


function _connectElements(element_1, element_2) {

	var sectors = defineRelativePosition(element_2, element_1);
	console.log(sectors);

	// defaults
	var element_1_socket = 1;
	var element_2_socket = 2;

	if (sectors.length == 1) {

		switch (sectors[0]) {
			case 1:
				element_1_socket = 2;
				element_2_socket = 4;
				break;

			case 2:
			case 3:
				element_1_socket = 5;
				element_2_socket = 4;
				break;

			case 4:
				element_1_socket = 7;
				element_2_socket = 4;
				break;

			case 5:
				element_1_socket = 7;
				element_2_socket = 5;
				break;

			case 6:
			case 7:
				element_1_socket = 4;
				element_2_socket = 5;
				break;

			case 8:
				element_1_socket = 2;
				element_2_socket = 5;
				break;
		}

	} else if (sectors.length == 2) {
		// simple

		if (sectors == [1, 2]) {

			element_1_socket = 2;
			element_2_socket = 4;

		} else if (sectors == [2, 3]) {

			element_1_socket = 5;
			element_2_socket = 4;

		} else if (sectors == [3, 4]) {

			element_1_socket = 7;
			element_2_socket = 4;

		} else if (sectors == [4, 5]) {

			element_1_socket = 7;
			element_2_socket = 2;

		} else if (sectors == [5, 6]) {

			element_1_socket = 7;
			element_2_socket = 5;

		} else if (sectors == [6, 7]) {

			element_1_socket = 4;
			element_2_socket = 5;

		} else if (sectors == [7, 8]) {

			element_1_socket = 2;
			element_2_socket = 5;

		} else if (sectors == [1, 8]) {

			element_1_socket = 2;
			element_2_socket = 7;
		}

	} else if (sectors.length == 3) {
		// todo
	} else if (sectors.length == 4) {
		// todo
	} else {
		// error
	}


	var socket_1 = [element_1.sockets[element_1_socket - 1].cx(), element_1.sockets[element_1_socket - 1].cy()];
	var socket_2 = [element_2.sockets[element_2_socket - 1].cx(), element_2.sockets[element_2_socket - 1].cy()];

	var x_between_elements = socket_1[0] + Math.abs(socket_1[0] - socket_2[0]) / 2;

	connections.push(diagram.path(
		'M ' + 
		socket_1[0].toString() + ' ' + 
		socket_1[1].toString() + ' ' + 
		'C ' +
		x_between_elements.toString() + ' ' + 
		socket_1[1].toString() + ' ' +
		x_between_elements.toString() + ' ' + 
		socket_2[1].toString() + 
		' ' + 
		socket_2[0].toString() + ' ' + 
		socket_2[1].toString()
	).attr({
		'stroke': 'black',
		'stroke-width': '1',
		'fill': 'none',
		'stroke-linecap': "round",
		'stroke-dasharray': "5,5"
	}));

	

	function defineRelativePosition(element_1, element_2) {
		// how element_2 relates to element_1

		var bbox_1 = element_1.bbox();
		var bbox_2 = element_2.bbox();

		// more is rigter
		var horizontal_offset = bbox_2.x - bbox_1.x;

		// more is lower
		var vertical_offset = bbox_2.y - bbox_1.y;

		var sectors = [];

		var bbox_2_relative_x = bbox_2.x - bbox_1.cx;
		var bbox_2_relative_y = bbox_2.y - bbox_1.cy;

		sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x, bbox_2.y));	// top left
		sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x2, bbox_2.y));	// top right
		sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x, bbox_2.y2));	// bottom left
		sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x2, bbox_2.y2));	// bottom right

		var unique_sectors = []

		sectors.forEach(function (sector) {
			if (unique_sectors.indexOf(sector) == -1) {
				unique_sectors.push(sector);
			}
		})

		unique_sectors.sort(function (a, b) {
			return a - b;
		});

		return unique_sectors;

	}

	function defineDotRelativePosition(bbox, x, y) {

		var relative_x = Math.abs(bbox.cx - x);
		var relative_y = Math.abs(bbox.cy - y);


		if (x >= bbox.cx) {
			// righter: sectors 1, 2, 3, 4

			if (y <= bbox.cy) {
				// above: sectors 1 or 2

				if (relative_x >= relative_y) {
					// sector 2
					return 2;
				} else {
					// sector 1
					return 1;
				}

			} else {
				// under: sectors 3 or 4

				if (relative_x >= relative_y) {
					// sector 3
					return 3;
				} else {
					// sector 4
					return 4;
				}
			}

		} else {
			// lefter: sectors 5, 6, 7, 8

			if (y <= bbox.cy) {
				// above: sectors 7 or 8

				if (relative_x >= relative_y) {
					// sector 7
					return 7;
				} else {
					// sector 8
					return 8;
				}

			} else {
				// under: sectors 5 or 6

				if (relative_x >= relative_y) {
					// sector 6
					return 6;
				} else {
					// sector 5
					return 5;
				}
			}
		}
	}
}

function _drawElement(element) {
	return _drawElement_unthemed(element, default_theme);
}

function _drawElement_unthemed(element, default_style) {
	var position = element.position;
	var text = element.text;

	var style = element.theme || {};
	var default_style = default_style || {};

	var padding 			= style.padding 			|| default_style.padding 			|| [15, 10];
	var border_color 		= style.border_color 		|| default_style.border_color 		|| 'black';
	var border_width 		= style.border_width 		|| default_style.border_width 		|| 2;
	var border_radius 		= style.border_radius 		|| default_style.border_radius 		|| 4;
	var color 				= style.color 				|| default_style.color 				|| 'black';
	var font_size 			= style.font_size 			|| default_style.font_size 			|| 14;
	var line_height 		= style.line_height 		|| default_style.line_height 		|| 1.25;
	var font_style 			= style.font_style 			|| default_style.font_style 		|| 'normal';
	var font_family 		= style.font_family 		|| default_style.font_family 		|| 'Arial';
	var font_weight 		= style.font_weight 		|| default_style.font_weight 		|| 'normal';
	var text_align 			= style.text_align 			|| default_style.text_align 		|| 'left';
	var background_color 	= style.background_color 	|| default_style.background_color 	|| 'white';

	var element = diagram.group();

	var element_text = element.text(fitText(text));
	element_text.font({
		'leading': line_height,
		'family': font_family,
		'size': font_size,
		'style': font_style,
		'weight': font_weight,
		'fill': color
	})

	var text_size = [element_text.bbox().w, element_text.bbox().h];

	var rect_size = [
		text_size[0] + padding[0] * 2 + border_width,
		text_size[1] + padding[1] * 2 + border_width
	];

	var element_rect = element.rect(rect_size[0], rect_size[1])
		.move(position[0], position[1])
		.attr({
			'fill': background_color,
			'stroke': border_color,
			'stroke-width': border_width,
			'rx': border_radius,
			'ry': border_radius
		});

	element_text.front();

	var text_position = [
		position[0] + padding[0] + border_width / 2,
		position[1] + padding[1] + border_width / 2
	];

	if (text_align == 'left') {
		element_text.font('anchor', 'start');
		element_text.move(text_position[0], text_position[1]);
	} else if (text_align == 'center') {
		element_text.font('anchor', 'middle');
		element_text.move(text_position[0] + text_size[0] / 2, text_position[1]);
	} else if (text_align == 'right') {
		element_text.font('anchor', 'end');
		element_text.move(text_position[0] + text_size[0], text_position[1]);
	}

	element.sockets = [
		element.circle(5).center(position[0], 						position[1])					.fill('red'),
		element.circle(5).center(position[0] + rect_size[0] / 2, 	position[1])					.fill('green'),
		element.circle(5).center(position[0] + rect_size[0], 		position[1])					.fill('blue'),
		element.circle(5).center(position[0], 						position[1] + rect_size[1] / 2)	.fill('black'),
		element.circle(5).center(position[0] + rect_size[0], 		position[1] + rect_size[1] / 2)	.fill('orange'),
		element.circle(5).center(position[0], 						position[1] + rect_size[1])		.fill('purple'),
		element.circle(5).center(position[0] + rect_size[0] / 2, 	position[1] + rect_size[1])		.fill('grey'),
		element.circle(5).center(position[0] + rect_size[0], 		position[1] + rect_size[1])		.fill('hotpink')
	];

	return element;
}

function fitText(text) {
	var max_word_length = 20;

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
