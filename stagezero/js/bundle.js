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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getHash;
/* harmony export (immutable) */ __webpack_exports__["c"] = getId;
/* harmony export (immutable) */ __webpack_exports__["a"] = getRawId;
/* unused harmony export getTypeById */


// handy functions used everywhere

function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}

function getRawId(element_id) {
	return parseInt(element_id.split('_')[1]);
}

function getTypeById(element_type) {
	return parseInt(element_id.split('_')[0]);	
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fixtures__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_classes__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_controllers__ = __webpack_require__(8);


// entry point





let diagram = __WEBPACK_IMPORTED_MODULE_1__lib_classes__["a" /* draw */].classDiagram();
let model = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__fixtures__["a" /* model */]);

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			redrawConnections();
		})

		child.on('mouseup', function () {
			model = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lib_controllers__["a" /* moveController */])(this, model);
			rebuild();
		});
	});
}

function redrawConnections() {
	diagram.children().forEach(function (child) {
		if (child.getType() === 'Connection') {
			child.redraw();
		}
	});
}

function build(model) {
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build(model);
}

build(model);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
        })
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
        }
    })
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
}

return deepmerge

}));


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return model; });


// mock elements and connections

let element_blueprints = [
	{
		id: 1,
		position: {
			x: 300,
			y: 100
		},
		text: {
			name: 'Person',
			type: 'interface',
			attributes: [
				{
					name: 'name',
					type: 'string',
					value: 'Alex',
					scope: 'public'
				},
				{
					name: 'age',
					type: 'int',
					value: '100'
				},
				{
					name: 'wife',
					scope: 'protected',
					type: 'any'
				}
			],
			methods: [
				{
					name: 'helloWorld',
					type: 'int'
				},
				{
					name: 'foo',
					type: 'string',
					args: [
						{
							name: 'name',
							type: 'string',
							value: 'Alex'
						},
						{
							name: 'age',
							type: 'int',
							value: '100'
						},
						{
							name: 'wife',
							type: 'any'
						},
						{
							name: 'wife',
							type: 'any'
						}
					]					
				}
			]
		}
	},
	{
		id: 2,
		position: {
			x: 600,
			y: 300
		},
		text: {
			name: 'Creature',
			attributes: [
				{
					name: 'name',
					type: 'string'
				}
			]
		}
	}
];

let connection_blueprints = [
	{
		id: 1,
		type: 'inheritance',
		from: 1,
		to: 2,
		text: 'inherits',
		style: {
			'stroke-dasharray': '5,5'
		}
	}
];

let model = {
	elements: element_blueprints,
	connections: connection_blueprints
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return draw; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diagram__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__element__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connection__ = __webpack_require__(6);


// classes declarations


let draw = SVG('diagram');


// diagram


SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		setId: __WEBPACK_IMPORTED_MODULE_1__diagram__["a" /* setId */],
		clear: __WEBPACK_IMPORTED_MODULE_1__diagram__["b" /* clear */],
		fromModel: __WEBPACK_IMPORTED_MODULE_1__diagram__["c" /* fromModel */],
		getNodeById: __WEBPACK_IMPORTED_MODULE_1__diagram__["d" /* getNodeById */],
		getType: function () {
			return 'Diagram';
		}
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.addClass('dolphin_diagram dolphin_diagram-class')
				.setId(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["b" /* getHash */])())
				.move(0, 0);
		}
	}
});


// element


SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		x2: function() {
			return this.x() + this.getRect().width();
		},
		y2: function () {
			return this.y() + this.getRect().height();
		},
		setRichText: __WEBPACK_IMPORTED_MODULE_2__element__["a" /* setRichText */],
		drawBorder: __WEBPACK_IMPORTED_MODULE_2__element__["b" /* drawBorder */],
		reset: __WEBPACK_IMPORTED_MODULE_2__element__["c" /* reset */],
		applyBlueprint: __WEBPACK_IMPORTED_MODULE_2__element__["d" /* applyBlueprint */],
		socket: __WEBPACK_IMPORTED_MODULE_2__element__["e" /* getSocketCoords */],
		setId: __WEBPACK_IMPORTED_MODULE_2__element__["f" /* setId */],
		getRect: __WEBPACK_IMPORTED_MODULE_2__element__["g" /* getRect */],
		getNameLabel: __WEBPACK_IMPORTED_MODULE_2__element__["h" /* getNameLabel */],
		getTypeLabel: __WEBPACK_IMPORTED_MODULE_2__element__["i" /* getTypeLabel */],
		getAttributesLabel: __WEBPACK_IMPORTED_MODULE_2__element__["j" /* getAttributesLabel */],
		getMethodsLabel: __WEBPACK_IMPORTED_MODULE_2__element__["k" /* getMethodsLabel */],
		clear: __WEBPACK_IMPORTED_MODULE_2__element__["l" /* clear */],
		getType: function () {
			return 'DiagramNode';
		},
		blueprint: null,
		style: null,
		richText: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.addClass('dolphin_node')
				.draggy();
		}
	}
});


// connection


SVG.Connection = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: __WEBPACK_IMPORTED_MODULE_3__connection__["a" /* applyBlueprint */],
		connectSockets: __WEBPACK_IMPORTED_MODULE_3__connection__["b" /* connectSockets */],
		connectDots: __WEBPACK_IMPORTED_MODULE_3__connection__["c" /* connectDots */],
		redraw: __WEBPACK_IMPORTED_MODULE_3__connection__["d" /* redraw */],
		clear: __WEBPACK_IMPORTED_MODULE_3__connection__["e" /* clear */],
		setId: __WEBPACK_IMPORTED_MODULE_3__connection__["f" /* setId */],
		setRichText: __WEBPACK_IMPORTED_MODULE_3__connection__["g" /* setRichText */],
		getType: function () {
			return 'Connection';
		},
		blueprint: null
	},
	construct: {
		connection: function (blueprint) {
			return this.put(new SVG.Connection)
				.applyBlueprint(blueprint);
		}
	}
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
	'padding-w': '11',	// element padding
	'padding-h': '11'
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyBlueprint;
/* harmony export (immutable) */ __webpack_exports__["f"] = setId;
/* harmony export (immutable) */ __webpack_exports__["e"] = clear;
/* harmony export (immutable) */ __webpack_exports__["d"] = redraw;
/* harmony export (immutable) */ __webpack_exports__["b"] = connectSockets;
/* harmony export (immutable) */ __webpack_exports__["g"] = setRichText;
/* harmony export (immutable) */ __webpack_exports__["c"] = connectDots;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lines__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools__ = __webpack_require__(0);


// methods of Connection class




function applyBlueprint (blueprint) {
	this.blueprint = blueprint;

	this.setId(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__tools__["b" /* getHash */])());
	// check blueprint here
	this.setRichText('Hello');
	this.redraw();
	return this;
}

function setId(id) {
	return this.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__tools__["c" /* getId */])('Connection', id));
}

function clear() {
	// remove everything: the line, labels, arrows...
	this.children().forEach(function (child) {
		child.remove();
	});
	return this;
}

function redraw() {
	this.clear();

	let from = this.parent().getNodeById(this.blueprint.from).socket(5);
	let to = this.parent().getNodeById(this.blueprint.to).socket(4);

	this.connectDots(from, to);
}

function connectSockets () {
	// connect two elements' sockets (abstraction over connection by two coordinates)
	return this;
}

function setRichText(line_text) {
	// set connection's rich text: labels, roles, indicators...
	this.richText = line_text;
	this.redraw();
	return this;
}

function connectDots (a, b) {
	// connect two coordinates with a line
	let id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__tools__["a" /* getRawId */])(this.id());
	let richText = this.richText;

	let path = this.path(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lines__["a" /* cubicTo */])(a, b))
		.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__tools__["c" /* getId */])(id))
		.addClass('dolphin_line');

	let text = this.text(function (add) {
		add.tspan(richText).dy(-5);
	}).addClass('dolphin_text dolphin_line_text dolphin_line_action');

	let offset = (50 - Math.round((text.bbox().w / path.length()) * 50)) + '%';

	text.path(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lines__["a" /* cubicTo */])(a, b)).textPath().attr('startOffset', offset);

	return this;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export arcTo */
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicTo;


// Get pathes for line drawing

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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = moveController;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);




function moveController(node, model) {
	let new_model = Object.assign({}, model);
	let node_id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["a" /* getRawId */])(node.attr('id'));
	let new_coords = {
		x: node.x(),
		y: node.y()
	}
	
	new_model.elements.forEach(function (elem) {
		if (elem.id === node_id) {
			elem.position = new_coords;
		}
	});

	return new_model;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setId;
/* harmony export (immutable) */ __webpack_exports__["b"] = clear;
/* harmony export (immutable) */ __webpack_exports__["c"] = fromModel;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNodeById;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);


// methods of ClassDiagram class



function setId(id) {
	return this.attr({
		'id': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["c" /* getId */])('ClassDiagram', id)
	});
}

function clear() {
	this.children().forEach(function (child) {
		child.remove();
	});
	return this;
}

function fromModel(model) {
	let self = this;
	model.elements.forEach(function (blueprint) {
		self.classDiagramNode(blueprint);
	});

	model.connections.forEach(function (blueprint) {
		self.connection(blueprint);
	})

	return this;
}

function getNodeById(id) {
	let found;
	this.children().forEach(function (child) {
		if (child.attr('id') === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["c" /* getId */])('ClassDiagramNode', id)) {
			found = child;
		}
	})

	return found;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fillBlueprint;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);


// Blueprints processing functions

let merge = __webpack_require__(2);


function fillBlueprint(blueprint) {
	// get blueprint and fill it's empty fields with default values
	if (checkBlueprint(blueprint)) {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(__WEBPACK_IMPORTED_MODULE_0__model__["a" /* default_blueprint */], blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__model__["b" /* default_attribute */], attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__model__["c" /* default_method */], method);
		});

		if (desired_blueprint.text.methods !== []) {

			desired_blueprint.text.methods = desired_blueprint.text.methods.map(function (method) {
				if (method.args !== []) {
					method.args = method.args.map(function (argument) {
						return merge(__WEBPACK_IMPORTED_MODULE_0__model__["d" /* default_argument */], argument);
					});
				}
				return method;
			});
		}

		return desired_blueprint;	
	}
}

function checkBlueprint(blueprint) {
	// check the required parameters
	if (blueprint.position && blueprint.id) {
		return true;
	} else {
		throw new TypeError('Blueprint error: id and/or coordinates are missing');
		return false;
	}
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getSocketCoords;
/* harmony export (immutable) */ __webpack_exports__["l"] = clear;
/* harmony export (immutable) */ __webpack_exports__["c"] = reset;
/* harmony export (immutable) */ __webpack_exports__["a"] = setRichText;
/* harmony export (immutable) */ __webpack_exports__["b"] = drawBorder;
/* harmony export (immutable) */ __webpack_exports__["f"] = setId;
/* harmony export (immutable) */ __webpack_exports__["d"] = applyBlueprint;
/* harmony export (immutable) */ __webpack_exports__["g"] = getRect;
/* harmony export (immutable) */ __webpack_exports__["h"] = getNameLabel;
/* harmony export (immutable) */ __webpack_exports__["i"] = getTypeLabel;
/* harmony export (immutable) */ __webpack_exports__["j"] = getAttributesLabel;
/* harmony export (immutable) */ __webpack_exports__["k"] = getMethodsLabel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blueprint__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(5);


// methods of ClassDiagramNode element







function getSocketCoords(number) {

	switch (number) {
		case 1: return {x: this.x(), y: this.y()};		// top left
		case 2: return {x: this.cx(), y: this.y()};		// top center
		case 3: return {x: this.x2(), y: this.y()};		// top right

		case 4: return {x: this.x(), y: this.cy()};		// middle left
		case 5: return {x: this.x2(), y: this.cy()};	// middle right

		case 6: return {x: this.x(), y: this.y2()};		// bottom left
		case 7: return {x: this.cx(), y: this.y2()};	// bottom center
		case 8: return {x: this.x2(), y: this.y2()};	// bottom right

		default:
			throw new RangeError('Wrong socket number (must be from 1 to 8)');
	}
}

function clear() {
	// delete everything inside the element
	this.children().forEach(function (child) {
		child.remove();
	})
}

function reset() {
	// rebuild element
	this.setRichText();
	this.drawBorder();
	return this;
}

function setRichText() {
	// set element's rich text: node name, attribures, methods and so on
	let id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["a" /* getRawId */])(this.attr('id'));
	let text = this.richText;

	if (!text) {
		throw new EvalError("Couldn't apply rich text: no rich text set");
	}

	this.clear();

	if (text.type !== 'normal') {
		var type_label = this.text('<' + text.type + '>')
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('type-label', id))
			.addClass('dolphin_text dolphin_node_type');
	}

	var name_label = this.text(text.name)
		.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('name-label', id))
		.addClass('dolphin_text dolphin_node_name');

	if (text.attributes) {
		var attributes_label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__text__["a" /* addAttributes */])(this, text.attributes)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('attributes-label', id))
			.addClass('dolphin_text');
	}

	if (text.methods) {
		var methods_label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__text__["b" /* addMethods */])(this, text.methods)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('methods-label', id))
			.addClass('dolphin_text');
	}

	let offsets = computeLabelOffsets(this);

	if (type_label) {
		type_label.move(offsets.type.x, offsets.type.y);
	}

	if (name_label) {
		name_label.move(offsets.name.x, offsets.name.y);
	}

	if (attributes_label) {
		attributes_label.move(offsets.attributes.x, offsets.attributes.y);
	}

	if (methods_label) {
		methods_label.move(offsets.methods.x, offsets.methods.y);
	}

	return this;
}

function drawBorder() {
	let id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["a" /* getRawId */])(this.attr('id'));
	var rect = this.getRect();
	var rect_size = computeRectSize(this);
	
	if (rect) {

		rect.size(rect_size.w, rect_size.h);

	} else {
		rect = this.rect(rect_size.w, rect_size.h)
			.move(0, 0)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('rectangle', id))
			.addClass('dolphin_rect');
	}
	rect.back();

	return this;
}

function setId(id) {
	return this.attr({
		'id': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* getId */])('ClassDiagramNode', id)
	});
}

function applyBlueprint(blueprint) {
	var checked_blueprint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__blueprint__["a" /* fillBlueprint */])(blueprint);
	this.setId(checked_blueprint.id);
	this.blueprint = checked_blueprint;
	this.richText = checked_blueprint.text;
	this.reset();
	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	return this;
}

function computeRectSize(element) {
	let name_label = element.getNameLabel();
	let type_label = element.getTypeLabel();
	let attributes_label = element.getAttributesLabel();
	let methods_label = element.getMethodsLabel();

	let padding = {
		w: parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */]['padding-w']),
		h: parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */]['padding-h'])
	};

	let actual_padding = padding;

	// let actual_padding = {
	// 	w: Math.max(
	// 		padding.w,
	// 		element.style.rect_style.rx
	// 	),

	// 	h: Math.max(
	// 		padding.h,
	// 		element.style.rect_style.ry
	// 	)
	// }

	let width = Math.max(
		name_label ? name_label.bbox().w : 0,
		type_label ? type_label.bbox().w : 0,
		attributes_label ? attributes_label.bbox().w : 0,
		methods_label ? methods_label.bbox().w : 0
	) + actual_padding.w * 2;

	let height = (
		(name_label ? name_label.bbox().h : 0) +
		(type_label ? type_label.bbox().h : 0) +
		(attributes_label ? attributes_label.bbox().h : 0) +
		(methods_label ? methods_label.bbox().h : 0)
	) + actual_padding.h * 2;	// top and bottom padding

	if (attributes_label) {	// name label is always there, type label doesn't require to be spaced
		height += padding.h;
	}

	if (methods_label) {
		height += padding.h
	}

	return {
		w: width,
		h: height
	}
}

function computeLabelOffsets(element) {
	let name_label = element.getNameLabel();
	let type_label = element.getTypeLabel();
	let attributes_label = element.getAttributesLabel();
	let methods_label = element.getMethodsLabel();
	
	let rect_size = computeRectSize(element);
	let offsets = {};

	let padding = {
		w: parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */]['padding-w']),
		h: parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */]['padding-h'])
	};

	// let actual_padding = {
	// 	w: Math.max(
	// 		padding.w,
	// 		element.style.rect_style.rx
	// 	),

	// 	h: Math.max(
	// 		padding.h,
	// 		element.style.rect_style.ry
	// 	)
	// }

	let actual_padding = padding;

	let x_left = actual_padding.w;
	let x_center = rect_size.w / 2;	
	let y_last = actual_padding.h;

	if (type_label) {
		offsets.type = {
			x: x_center,
			y: y_last
		};
		y_last += type_label.bbox().h;
	}

	if (name_label) {
		offsets.name = {
			x: x_center,
			y: y_last
		};
		y_last += name_label.bbox().h + padding.h;
	}

	if (attributes_label) {
		offsets.attributes = {
			x: x_left,
			y: y_last
		}
		y_last += attributes_label.bbox().h + padding.h;
	}

	if (methods_label) {
		offsets.methods = {
			x: x_left,
			y: y_last
		}
		y_last += methods_label.bbox().h + padding.h;
	}

	return offsets;
}

function getRect() {
	return findChildElement(this, 'rectangle');
}

function getNameLabel() {
	return findChildElement(this, 'name-label');
}

function getTypeLabel() {
	return findChildElement(this, 'type-label');
}

function getAttributesLabel() {
	return findChildElement(this, 'attributes-label');
}

function getMethodsLabel() {
	return findChildElement(this, 'methods-label');
}

function findChildElement(parent, type) {
	let children = findChildElements(parent, type);
	
	if (children.length === 1) {
		return children[0];
	} else if (children.length > 1) {
		throw new RangeError('Parent ' + parent.attr('id').split('_')[0] + ' has more than one ' + type);
	}
}

function findChildElements(parent, type) {
	let children = [];

	parent.children().forEach(function (child) {
		if (child.attr('id').split('_')[0] === type) {
			children.push(child);
		}
	});

	return children;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return default_blueprint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return default_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return default_method; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return default_argument; });


// data models for element

let default_blueprint = {
	id: 0,
	position: {
		x: 0,
		y: 0
	},
	text: {
		name: 'NewClass',
		type: 'normal',
		attributes: [],
		methods: []
	},
};

let default_attribute = {
	name: 'newElement',
	value: '',
	type: 'any',
	scope: 'public'
};

let default_method = {
	name: 'newMethod',
	type: 'any',
	scope: 'public',
	args: []
};

let default_argument = {
	name: 'newArgument',
	type: 'any',
	value: ''
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addAttributes;
/* harmony export (immutable) */ __webpack_exports__["b"] = addMethods;


// element text processing

function addAttributes(element, text, style) {
	// + foo : int = "bar"
 
	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];		// one attribute
			let addLabel = construct_addLabel(add);

			addLabel(getScopeSymbol(value.scope), 'dolphin_node_scope', 1).newLine();	// scope
			addLabel(value.name, 'dolphin_node_attribute', 1);	// attribute name

			if (value.type !== 'any') {
				// if attribute has type
				addLabel(':', 'dolphin_node_symbol', 2);
				addLabel(capitalizeFirst(value.type), 'dolphin_node_datatype');
			}

			if (value.value) {
				// if attribute has value
				addLabel('=', 'dolphin_node_symbol', 2);

				switch (value.type) {
					case 'string':
						addLabel('"' + value.value + '"', 'dolphin_node_value dolphin_node_value-string');
						break;

					case 'int':
						addLabel(value.value, 'dolphin_node_value dolphin_node_value-int');
						break;

					default:
						addLabel(value.value, 'dolphin_node_value');
						break;
				}
			}
		}
	}).addClass('dolphin_text');	// apply general font style
}

function addMethods(element, text, style) {
	// - string getFoo(
	// 		bar: int,
	// 		foo: string = "hello")

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];
			let addLabel = construct_addLabel(add);

			addLabel(getScopeSymbol(value.scope), 'dolphin_node_scope', 1).newLine();	// scope

			if (value.type !== 'any') {
				addLabel(capitalizeFirst(value.type), 'dolphin_node_datatype', 1);
			}

			addLabel(value.name, 'dolphin_node_method', 1);	// attribute name

			if (value.args) {	// if method has arguments

				add.tspan('(');		// open the bracket

				for (let arg in value.args) {
					// get one argument

					let argument = value.args[arg];

					addLabel(argument.name, 'dolphin_node_passed dolphin_node_attribute').newLine().dx(20);
					
					if (argument.type !== 'any') {
						addLabel(':', 'dolphin_node_passed dolphin_node_symbol', 2);
						addLabel(capitalizeFirst(argument.type), 'dolphin_node_passed dolphin_node_datatype');
					}

					if (argument.value !== '') {

						addLabel('=', 'dolphin_node_passed dolphin_node_symbol', 2);

						switch (argument.type) {
							case 'string':
								addLabel('"' + argument.value + '"', 'dolphin_node_passed dolphin_node_value dolphin_node_value-string');
								break;

							case 'int':
								addLabel(argument.value, 'dolphin_node_passed dolphin_node_value dolphin_node_value-int');
								break;

							default:
								addLabel(argument.value, 'dolphin_node_passed dolphin_node_value');
								break;
						}
					}

					if (arg < value.args.length - 1) {
						addLabel(',', 'dolphin_node_passed');
					} else {
						addLabel(')');
					}
				}

			} else {
				// otherwise just close the method with ()
				addLabel('()');
			}
		}
	}).addClass('dolphin_text');
}

function construct_addLabel(add) {
	return function (text, classes, spacing) {
		if (spacing) {
			if (spacing === 1) {

				let tspan = add.tspan(text)
					.addClass(classes || '');
				add.tspan(' ');

				return tspan;

			} else if (spacing === 2) {
				
				add.tspan(' ');
				let tspan = add.tspan(text)
					.addClass(classes || '');
				add.tspan(' ');

				return tspan;

			} else {
				throw new RangeError('Wrong spacing: ' + spacing);
			}
		} else {
			return add.tspan(text)
				.addClass(classes || '');
		}
	}
}

function getScopeSymbol(scope) {
	switch (scope.toLowerCase()) {
		case 'public':
			return '+';
			break;

		case 'private':
			return '-';
			break;

		case 'protected':
			return '#';
			break;

		case 'derived':
			return '/';
			break;

		case 'package':
			return '~';
			break;

		default:
			throw new TypeError('Unknown scope: ' + scope);
	}
}

function capitalizeFirst(word) {
	return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);