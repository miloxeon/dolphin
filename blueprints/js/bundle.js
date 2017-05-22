/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHash;


function getHash() {
	return Math.floor(Math.random() * new Date()).toString();
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__ = __webpack_require__(3);





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
	var element = _drawElement(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["a" /* createElement */])(blueprint));
	element.snapshot.draggy();
	return element;
});

var sockets = defineSockets(rendered_elements[0], rendered_elements[1]);

var rendered_connection = _drawConnection(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["b" /* connectElements */])({
	from: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["c" /* createAddress */])(rendered_elements[0], sockets[0]),
	to: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["c" /* createAddress */])(rendered_elements[1], sockets[1]),
	style: custom_line_style
}))

rendered_elements.forEach(function (element) {
	element.snapshot.on('dragmove', function () {
		if (rendered_connection) {
			_destroyConnection(rendered_connection);
		}

		var sockets = defineSockets(rendered_elements[0], rendered_elements[1]);

		if (sockets.length > 0) {

			rendered_connection = _drawConnection(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["b" /* connectElements */])({
				from: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["c" /* createAddress */])(rendered_elements[0], sockets[0]),
				to: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["c" /* createAddress */])(rendered_elements[1], sockets[1]),
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

	var sockets = decision_matrix[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["a" /* defineRelativePosition */])(rendered_element_2, rendered_element_1)];
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

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_1, [bbox_2.x, bbox_2.y]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_1, [bbox_2.x2, bbox_2.y]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_1, [bbox_2.x, bbox_2.y2]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_1, [bbox_2.x2, bbox_2.y2]) ||

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_2, [bbox_1.x, bbox_1.y]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_2, [bbox_1.x2, bbox_1.y]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_2, [bbox_1.x, bbox_1.y2]) || 
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_toolkit_geometry__["b" /* checkIfInside */])(rendered_element_2, [bbox_1.x2, bbox_1.y2]);

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

	var rect_size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["d" /* computeRectSize */])(element_text, virtual_element);

	var element_rect = element.rect(rect_size[0], rect_size[1])
		.attr(virtual_element.style.rect_style);


	// position everything
	element_text.front();

	var position = virtual_element.position;
	element.move(position[0], position[1]);

	var text_position = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_toolkit_elements__["e" /* computeTextPosition */])(element_text, virtual_element);
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = connectElements;
/* harmony export (immutable) */ __webpack_exports__["a"] = createElement;
/* harmony export (immutable) */ __webpack_exports__["c"] = createAddress;
/* unused harmony export checkElementType */
/* harmony export (immutable) */ __webpack_exports__["d"] = computeRectSize;
/* harmony export (immutable) */ __webpack_exports__["e"] = computeTextPosition;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lines__ = __webpack_require__(4);





function connectElements(strict_connection_blueprint) {

	var from = strict_connection_blueprint.from;
	var to = strict_connection_blueprint.to;

	var from_coords = from.rendered_element.sockets(from.socket);
	var to_coords = to.rendered_element.sockets(to.socket);

	var connection_blueprint = Object.assign({}, strict_connection_blueprint);
	delete connection_blueprint.from;
	delete connection_blueprint.to;

	var type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lines__["a" /* checkConnectionType */])(connection_blueprint.type);

	type.shape = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lines__["b" /* defineLineShape */])(from.socket, to.socket);

	delete connection_blueprint.type;

	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lines__["c" /* createConnection */])(Object.assign({}, {
		from: from_coords,
		to: to_coords,
		type: type
	}, connection_blueprint));
}

function createElement(blueprint) {
	var id = 'element_' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common__["a" /* getHash */])();
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

function createAddress(element, socket) {
	return {
		rendered_element: element,
		socket: socket
	}
}

function checkElementType(type) {
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = checkIfInside;
/* harmony export (immutable) */ __webpack_exports__["a"] = defineRelativePosition;


function checkIfInside(rendered_element, dot_coordinates) {
	var x = dot_coordinates[0];
	var y = dot_coordinates[1];

	var bbox = rendered_element.tester();

	return (x > bbox.x) && 
		(x < bbox.x2) && 
		(y > bbox.y) && 
		(y < bbox.y2);
}

function defineRelativePosition(rendered_element_1, rendered_element_2) {
	// how element_2 relates to element_1

	var bbox_1 = rendered_element_1.tester();
	var bbox_2 = rendered_element_2.tester();

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

	return unique_sectors.join('');

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



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = createConnection;
/* harmony export (immutable) */ __webpack_exports__["a"] = checkConnectionType;
/* harmony export (immutable) */ __webpack_exports__["b"] = defineLineShape;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(0);




function createConnection (connection_blueprint) {
	var id = 'connection_' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common__["a" /* getHash */])();
	
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

function checkConnectionType(type) {
	var defaults = {
		type: 'simple',
		shape: 'cubic',
		roughness: 'soft'
	}

	var new_type = Object.assign({}, type);

	for (var param in defaults) {
		if (!new_type[param]) {
			new_type[param] = defaults[param];
		}
	}

	return new_type;
}

function defineLineShape(socket_1, socket_2) {
	var sockets = [socket_1, socket_2].map(function (a) {
		return parseInt(a);
	}).sort(function (a, b) {
		return a - b;
	}).join('');

	switch (sockets) {
		case '24':
		case '25':
		case '47':
		case '57':
			return 'arc';
			break;

		default:
			return 'cubic';
			break;
	}
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map