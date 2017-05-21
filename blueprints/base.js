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

	border_color: 'orange',
	border_width: 5,
	border_radius: 4,
	
	color: 'orange',
	font_family: 'Verdana',
	font_size: 14,
	line_height: 1.9,
	font_style: 'normal',
	font_weight: 'bold',
	text_align: 'center',

	background_color: 'white'
};

var elements = [
	{
		id: Math.floor(Math.random() * new Date()),
		position: [35, 20],
		type: {type: 'simple'},
		text: 'Hello world'
	},
	{
		id: Math.floor(Math.random() * new Date()),
		position: [80, 90],
		type: {type: 'simple'},
		text: 'Lorem ipsum dolor sit amet consectetur. Cras sodales imperdiet auctor.'
	}
];


elements.forEach(function (element) {
	_drawElement(element);
});

function _drawElement(element) {
	_drawElement_unthemed(element, default_theme);
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
