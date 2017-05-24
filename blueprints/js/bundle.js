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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = _createLayer;
/* unused harmony export getElements */
/* harmony export (immutable) */ __webpack_exports__["b"] = getElementsAsArray;
/* harmony export (immutable) */ __webpack_exports__["d"] = getElementById;
/* harmony export (immutable) */ __webpack_exports__["c"] = cloneLayer;


// layers api

function _createLayer(stage) {
	return stage.group();
}

function getElements(layer) {
	return Object.assign({}, layer.elements);
}

function getElementsAsArray(layer) {
	var elements = [];

	var layer_elements = getElements(layer);

	for (let element_id in layer_elements) {
		elements.push(layer_elements[element_id]);
	}

	return elements;
}

function getElementById(layer, element_id) {
	return getElements(layer)[element_id];
}

function cloneLayer(layer) {
	var new_layer = layer.clone();
	new_layer.elements = layer.elements;
	
	return new_layer;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHash;
/* harmony export (immutable) */ __webpack_exports__["b"] = fillObject;


// set of handy pure functions

function getHash(object_type) {
	return object_type.toString() + '_' + Math.floor(Math.random() * new Date()).toString();
}

function fillObject(object, defaults) {
	var new_object = Object.assign({}, object || {});

	for (var param in defaults || {}) {
		if (!new_object[param]) {
			new_object[param] = defaults[param];
		}
	}

	return new_object;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elements__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connections__ = __webpack_require__(3);






var stage = SVG('diagram');
var layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__layers__["a" /* _createLayer */])(stage);

layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__elements__["a" /* drawElement */])(layer, {
	position: {
		x: 150,
		y: 200
	},
	text: 'Hello'
});

layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__elements__["a" /* drawElement */])(layer, {
	position: {
		x: 300,
		y: 200
	},
	text: 'Harder, Ivan',
	style: {
		background_color: 'pink'
	}
});

layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__elements__["a" /* drawElement */])(layer, {
	position: {
		x: 300,
		y: 300
	},
	text: 'Harder, Ivan',
	style: {
		background_color: 'pink'
	}
});


var elements = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__layers__["b" /* getElementsAsArray */])(layer);


// console.log(elements[0].extensions.socket(1));

// for (let element_id in layer.elements) {
// 	console.log(layer.elements[element_id].extensions.socket(1));
// }

layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__connections__["a" /* connectElements */])(layer, {
	from: {
		element_id: elements[0].id(),
		socket: 2
	},
	to: {
		element_id: elements[1].id(),
		socket: 4
	}
});

// for (let element_id in layer.elements) {
// 	console.log(layer.elements[element_id].extensions.socket(1));
// }

// console.log(layer.elements[0]);

// console.log(layer.elements);

// console.log('it works!');


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = connectElements;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layers__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lines__ = __webpack_require__(4);


// everything needed to work with connections between elements

// 	connection_blueprint:
// 		from: address
// 		to: address
// 		type: connection_type
// 		style: connection_style

// 	connection_type:
// 		type: 'simple' by default
// 		direction: 'normal' or 'reverse'

// 	address:
// 		element_id
// 		socket





function connectElements(layer, connection_blueprint) {
	var new_layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__layers__["c" /* cloneLayer */])(layer);

	var from = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__layers__["d" /* getElementById */])(new_layer, connection_blueprint.from.element_id).extensions.socket(connection_blueprint.from.socket);
	var to = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__layers__["d" /* getElementById */])(new_layer, connection_blueprint.to.element_id).extensions.socket(connection_blueprint.to.socket);

	var line_shape = defineLineShape(connection_blueprint.from, connection_blueprint.to);
	var line_path = '';


	switch (line_shape) {
		case 'arc':
			line_path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lines__["a" /* arcTo */])(from, to);
			break;

		case 'cubic':
			line_path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lines__["b" /* cubicTo */])(from, to);
			break;

		default:
			//error;
			break;
	}

	new_layer.path(line_path);

	return new_layer;
}

function defineLineShape(from, to) {
	var sockets = [from.socket, to.socket].map(function (a) {
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = arcTo;
/* harmony export (immutable) */ __webpack_exports__["b"] = cubicTo;


// generate paths

function arcTo(from, to) {
	var x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	var bias = {
		x: from.x,
		y: to.y
	}

	return cubic(from, to, bias, bias);
}

function cubicTo(from, to) {
	var x_between_from_and_to = from.x + Math.abs(from.x - to.x) / 2;

	var bias_1 = {
		x: x_between_from_and_to,
		y: from.y
	}

	var bias_2 = {
		x: x_between_from_and_to,
		y: to.y
	}

	return cubic(from, to, bias_1, bias_2);
}

function cubic(from, to, bias_1, bias_2) {
	return 'M ' + 
		from.x.toString() + ' ' + 
		from.y.toString() + ' ' + 
		'C ' +
		bias_1.x.toString() + ' ' + 
		bias_1.y.toString() + ' ' +
		bias_2.x.toString() + ' ' + 
		bias_2.y.toString() + 
		' ' + 
		to.x.toString() + ' ' + 
		to.y.toString();
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = computeRectSize;
/* harmony export (immutable) */ __webpack_exports__["b"] = computeTextPosition;


// methods for computing element's geometry

function computeRectSize(rendered_label, style) {
	return {
		w: rendered_label.bbox().w + 
			style.additional_style.text_offset.x * 2 +
			style.rect_style['stroke-width'],

		h: rendered_label.bbox().h + 
			style.additional_style.text_offset.y * 2 + 
			style.rect_style['stroke-width'] 
	}
}

function computeTextPosition(rendered_label, style) {

	var text_offset = style.additional_style.text_offset;
	var stroke_offset = style.rect_style['stroke-width'] / 2;

	return {
		x: text_offset.x + stroke_offset + 
			computeAnchorOffset(rendered_label, style.text_style.anchor),

		y: text_offset.y + stroke_offset
	}
}

function computeAnchorOffset(rendered_label, anchor) {
	switch (anchor) {
		case 'start':
			return 0;
			break;

		case 'middle':
			return rendered_label.bbox().w / 2;
			break;

		case 'end':
			return rendered_label.bbox().w;
			break;

		default:
			// error
			break;
	}
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawElement;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geometry__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__layers__ = __webpack_require__(0);


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









function drawElement(layer, element_blueprint) {
	var new_layer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__layers__["c" /* cloneLayer */])(layer);
	
	// create the element itself
	var element = _createElement(new_layer);
	var style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__style__["a" /* convertElementStyle */])(element_blueprint.style);

	// console.log(element_blueprint);

	var element_text = element.text(
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__text__["a" /* fitText */])(element_blueprint.text)
		)
		.font(style.text_style);

	var rect_size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__geometry__["a" /* computeRectSize */])(element_text, style);
	var element_rect = element.rect(rect_size.w, rect_size.h)
		.attr(style.rect_style);

	var text_position = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__geometry__["b" /* computeTextPosition */])(element_text, style);
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

	var element_id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getHash */])('element');

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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertElementStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(1);


// convert CSS-like style to SVG-like:

// this:
// 	{
// 		padding
// 		border_color
// 		border_width
// 		border_radius
//	
// 		color
// 		font_family
// 		font_size
// 		line_height
// 		font_style
// 		font_weight
// 		text_align
//
// 		background_color
// 	}
//
//	to this:
//	{
//		rect_style: {
//			fill
//			stroke
//			stroke-width
//			rx
//			ry
//		},
//		text_style: {
//			leading
//			family
//			size
//			style
//			weight
//			fill
//			anchor
//		},
//		additional_style: {
//			horizontal_text_offset,
//			vertical_text_offset
//		}
//	}



function convertElementStyle(element_style) {
	var default_element_style = {
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

	var passed_style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["b" /* fillObject */])(element_style, default_element_style);

	var rect_style = {
		'fill': passed_style.background_color,
		'stroke': passed_style.border_color,
		'stroke-width': passed_style.border_width,
		'rx': passed_style.border_radius,
		'ry': passed_style.border_radius
	}

	var text_style = {
		'leading': passed_style.line_height,
		'family': passed_style.font_family,
		'size': passed_style.font_size,
		'style': passed_style.font_style,
		'weight': passed_style.font_weight,
		'fill': passed_style.color,
		'anchor': (function () {
			var text_align = passed_style.text_align;
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
	}

	var additional_style = {
		text_offset: {
			x: passed_style.padding[1],
			y: passed_style.padding[0]
		}
	}

	return {
		rect_style: rect_style,
		text_style: text_style,
		additional_style: additional_style
	}
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fitText;


// element text processing methods

function fitText(text, max_length) {

	// split text to lines because SVG doesn't support HTML-like line wrap

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map