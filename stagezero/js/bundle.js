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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return default_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return default_blueprint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return default_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return default_method; });


// data models for element

let default_style = {
	'padding': '11 11',

	'border-color': 'black',
	'border-width': '2',
	'border-radius': '4',

	'color': 'black',
	'font-family': 'Verdana',
	'font-size': '12',
	'line-height': '1.25',
	'font-style': 'normal',
	'font-weight': 'normal',
	'text-align': 'left',

	'background-color': 'white'
};

let default_blueprint = {
	id: 0,
	position: {
		x: 0,
		y: 0
	},
	text: {
		name: 'NewClass',
		attributes: [],
		methods: []
	},
	style: default_style
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
	scope: 'public'
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_element__ = __webpack_require__(4);




var draw = SVG('diagram');

let element_blueprints = [
	{
		id: 1,
		position: {
			x: 200,
			y: 100
		},
		text: {
			name: 'Person',
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
					scope: 'private',
					type: 'any'
				}
			],
			methods: [
				{
					name: 'helloWorld',
					type: 'int'
				}

			]
		}
	},
	{
		id: 2,
		position: {
			x: 400,
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

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: __WEBPACK_IMPORTED_MODULE_0__lib_element__["a" /* applyBlueprint */],
		socket: __WEBPACK_IMPORTED_MODULE_0__lib_element__["b" /* getSocketCoords */],
		blueprint: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.draggy();
		}
	}
});

SVG.Connection = SVG.invent({
	create: 'path',
	inherit: SVG.Shape,
	extend: {
		connect: function (blueprint) {
			return this;
		},
		applyBlueprint: function (blueprint) {


			return this;
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

element_blueprints.forEach(function (blueprint) {
	draw.classDiagramNode(blueprint);
});

connection_blueprints.forEach(function (blueprint) {
	draw.connection(blueprint);
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fillBlueprint;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(1);


// Blueprints processing functions

let merge = __webpack_require__(0);


function fillBlueprint(blueprint) {
	if (checkBlueprint(blueprint)) {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(__WEBPACK_IMPORTED_MODULE_0__model__["b" /* default_blueprint */], blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__model__["c" /* default_attribute */], attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__model__["d" /* default_method */], method);
		});

		return desired_blueprint;	
	}
}

function checkBlueprint(blueprint) {
	if (blueprint.position && blueprint.id) {
		return true;
	} else {
		throw new TypeError('Blueprint error: id and/or coordinates are missing');
		return false;
	}
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getSocketCoords;
/* harmony export (immutable) */ __webpack_exports__["a"] = applyBlueprint;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__text__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blueprint__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools__ = __webpack_require__(7);


// Everything needed to construct an element






function getSocketCoords(number) {

	let rect;

	this.children().forEach(function (child) {
		if (child.attr('id').split('_')[0] === 'rectangle') {
			rect = child;
		}
	});

	if (rect) {
		var bbox = rect.bbox();
	} else {
		throw new ReferenceError("Element's rectangle is not defined, couldn't attach sockets");
	}

	switch (number) {
		case 1: return {x: bbox.x, y: bbox.y};		// top left
		case 2: return {x: bbox.cx, y: bbox.y};		// top center
		case 3: return {x: bbox.x2, y: bbox.y};		// top right

		case 4: return {x: bbox.x, y: bbox.cy};		// middle left
		case 5: return {x: bbox.x2, y: bbox.cy};	// middle right

		case 6: return {x: bbox.x, y: bbox.y2};		// bottom left
		case 7: return {x: bbox.cx, y: bbox.y2};	// bottom center
		case 8: return {x: bbox.x2, y: bbox.y2};	// bottom right

		default:
			throw new RangeError('Wrong socket number (must be from 1 to 8)');
	}
}

function applyBlueprint(blueprint) {
	var checked_blueprint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__blueprint__["a" /* fillBlueprint */])(blueprint);

	let id = checked_blueprint.id;

	let style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__style__["a" /* convertElementStyle */])(checked_blueprint.style || {});
	let padding = style.additional_style.padding;

	let text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__text__["a" /* prepareText */])(checked_blueprint.text);

	style.text_style['anchor'] = 'start';	// needed for class diagram

	let name_label = this.text(text.name)
		.font(style.text_style)
		.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('name-label', id));

	if (text.attributes && text.methods) {

		var attributes_label = this.text(text.attributes)
			.font(style.text_style)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('attributes-label', id));

		var methods_label = this.text(text.methods)
			.font(style.text_style)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('methods-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				attributes_label.bbox().w,
				methods_label.bbox().w
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				attributes_label.bbox().h + 
				padding.h + 
				methods_label.bbox().h +
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		attributes_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

		methods_label.move(
			padding.w,
			attributes_label.bbox().y2 + padding.h
		);

	} else if (text.attributes) {

		var attributes_label = this.text(text.attributes)
			.font(style.text_style)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('attributes-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				attributes_label.bbox().w,
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				attributes_label.bbox().h + 
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		attributes_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

	} else if (text.methods) {

		var methods_label = this.text(text.methods)
			.font(style.text_style)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('methods-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				methods_label.bbox().w
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				methods_label.bbox().h +
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		methods_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

	} else {
		var rect_size = {
			w: name_label.bbox().w + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h
		};
	}

	let rect = this.rect(rect_size.w, rect_size.h)
		.attr(style.rect_style)
		.move(0, 0)
		.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('rectangle', id));

	rect.back();

	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	this.attr({
		'id': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tools__["a" /* getId */])('ClassDiagramNode', id),
		'cursor': 'pointer'
	});
	this.blueprint = blueprint;

	return this;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertElementStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(1);


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

let merge = __webpack_require__(0);


function convertElementStyle(style) {
	var passed_style = merge(__WEBPACK_IMPORTED_MODULE_0__model__["a" /* default_style */], style);

	var rect_style = {
		'fill': passed_style['background-color'],
		'stroke': passed_style['border-color'],
		'stroke-width': passed_style['border-width'],
		'rx': passed_style['border-radius'],
		'ry': passed_style['border-radius']
	}

	var text_style = {
		'leading': parseFloat(passed_style['line-height']),
		'family': passed_style['font-family'],
		'size': parseInt(passed_style['font-size']),
		'style': passed_style['font-style'],
		'weight': passed_style['font-weight'],
		'fill': passed_style['color'],
		'anchor': (function () {
			var text_align = passed_style['text-align'];
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

	let padding = passed_style['padding'].split(' ');

	var additional_style = {
		padding: {
			w: parseInt(padding[1]),
			h: parseInt(padding[0])
		}
	}

	return {
		rect_style: rect_style,
		text_style: text_style,
		additional_style: additional_style
	}
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = prepareText;


// element text processing

function prepareText(element_text) {

	// split text to something like `+ variable : int = 0;`, which is used in UML
	
	var prepared_attributes = element_text.attributes.map(function (attribute) {

		return [
			getScopeSymbol(attribute.scope),
			attribute.name,
			(attribute.type === 'any') ? '' : ': ' + attribute.type
		].join(' ') + 
			((attribute.value !== '') ? [' =', attribute.value].join(' ') : '');
	})

	var prepared_methods = element_text.methods.map(function (method) {
		return [
			getScopeSymbol(method.scope),
			(method.type === 'any') ? '' : method.type,
			method.name + '()'
		].join(' ');
	})

	return {
		name: element_text.name,
		attributes: prepared_attributes.join('\n'),
		methods: prepared_methods.join('\n')
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
	}
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getHash */
/* harmony export (immutable) */ __webpack_exports__["a"] = getId;


function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map