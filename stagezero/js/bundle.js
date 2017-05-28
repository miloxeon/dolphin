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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getHash;
/* harmony export (immutable) */ __webpack_exports__["d"] = getId;
/* harmony export (immutable) */ __webpack_exports__["a"] = getRawId;
/* unused harmony export xor */
/* unused harmony export isComplexObject */
/* unused harmony export isObject */
/* unused harmony export isNested */
/* harmony export (immutable) */ __webpack_exports__["c"] = convertObject;


function getHash(object_type) {
	return Math.floor(Math.random() * new Date()).toString();
}

function getId(object_type, hash) {
	return object_type.toString() + '_' + hash;
}

function getRawId(element_id) {
	return parseInt(element_id.split('_')[1]);
}

function xor(arr) {
	var all_false = Array(arr.length).fill('0').join('');
	var all_true = Array(arr.length).fill('1').join('');
	var arr_str = arr.map(function (elem) {
		return elem ? '1' : '0';
	}).join('');

	return (arr_str !== all_false && arr_str !== all_true);
}

function isComplexObject(object) {
	var obj_str = [];
	for (let name in object) {
		if (isObject(object[name])) {
			obj_str.push(true);
		} else {
			obj_str.push(false);
		}
	}
	return xor(obj_str);
}

function isObject(variable) {
	return (variable !== null) && (typeof variable === 'object');
}

function isNested(object) {
	for (let name in object) {
		if (!isObject(object[name])) {
			return false;
		}
	}
	return true;
}

function convertObject(object, converter) {
	let new_object = {};

	if (!isComplexObject(object)) {

		if (isNested(object)) {
			for (let name in object) {
				new_object[name] = convertObject(object[name], converter);
			}
		} else {
			new_object = converter(object);
		}

		return new_object;
		
	} else {
		console.log(object);
		throw new TypeError("Couldn't convert a complex object");
	}
}


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return class_theme; });


let class_theme = {
	rect_style: {
		'padding': '11 11',
		'border-color': 'black',
		'border-width': '2',
		'border-radius': '4',
		'background-color': 'white'
	},
	text_style: {
		common: {
			// styles applied to overall text
			'color': 'black',
			'font-family': 'Verdana, sans-serif',
			'font-size': '12',
			'line-height': '1.25',
			'font-style': 'normal',
			'font-weight': 'normal',
			'text-align': 'left'
		},
		node: {
			common: {
			},
			name: {
				'font-weight': 'bold'
			},
			type: {
				// for example, <<interface>>
				'font-style': 'italic',
				'font-size': '9'
			}
		},
		attribute: {
			common: {
				// styles applied to overall attributes
			},
			scope: {
				// +, -, /, ~ and so on
				'font-family': 'Courier New, monospace',
				'color': '#B90690'
			},
			name: {

			},
			type: {
				'color': 'blue',
				'font-style': 'italic'
			},
			symbol: {
				// '=' if there is default value
			},
			value: {
				common: {
					'color': 'blue'
				},
				string: {
					'color': '#036A07'
				},
				integer: {

				}
			}
		},
		method: {
			common: {
				
			},
			scope: {
				'font-family': 'Courier New, monospace',
				'color': '#B90690'
			},
			type: {
				'color': 'blue'
			},
			name: {
				'color': '#0000A2',
			},
			passed: {
				// these styles will override everything applied to passed agruments
				// 'color': 'dimgrey'
			}
		}
	},
	line_style: {
		line: {
			'stroke': 'black',
			'stroke-opacity': '1',
			'stroke-linecap': 'round',
			'stroke-linejoin': 'round',
			'fill': 'none'
		},
		text: {
			// text on top of the line
			'color': 'black',
			'font-family': 'Verdana, sans-serif',
			'font-size': '12',
			'line-height': '1.25',
			'font-style': 'normal',
			'font-weight': 'normal',
			'text-align': 'left'
		}
	}
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertStyle;


function convertStyle(style) {
	let decision_matrix = {
		'padding': {
			name: 'padding',
			converter: function (value) {
				let split_value = value.split(' ');
				return {
					w: parseInt(split_value[1]),
					h: parseInt(split_value[0])
				}
			}
		},
		'border-color': {
			name: 'stroke'
		},
		'border-width': {
			name: 'stroke-width',
			converter: parseInt
		},
		'border-radius': {
			name: ['rx', 'ry'],
			converter: parseInt
		},
		'color': {
			name: 'fill'
		},
		'font-family': {
			name: 'family'
		},
		'font-size': {
			name: 'size',
			converter: parseInt
		},
		'font-style': {
			name: 'style',
			converter: getDefaultConverter('font-style', ['normal', 'italic'])
		},
		'font-weight': {
			name: 'weight',
			converter: getDefaultConverter('font-weight', ['normal', 'bold'])
		},
		'text-align': {
			name: 'anchor',
			converter: function (value) {
				if (value === 'left') {
					return 'start';
				} else if (value === 'center') {
					return 'middle';
				} else if (value === 'right') {
					return 'end';
				} else {
					throw getValueError('text-align', value, ['left', 'center', 'right']);
				}
			}
		},
		'line-height': {
			name: 'leading',
			converter: parseFloat
		},
		'background-color': {
			name: 'fill'
		},
		'stroke': {
			name: 'stroke'
		},
		'stroke-opacity': {
			name: 'stroke-opacity',
			converter: parseFloat
		},
		'stroke-linecap': {
			name: 'stroke-linecap',
			converter: getDefaultConverter('stroke-linecap', ['butt', 'square', 'round'])
		},
		'stroke-linejoin': {
			name: 'stroke-linejoin',
			converter: getDefaultConverter('stroke-linecap', ['miter', 'bevel', 'round'])
		},
		'stroke-dasharray': {
			name: 'stroke-dasharray'
		},
		'fill': {
			name: 'fill'
		}
	};

	let converted_style = {};

	for (let parameter in style) {
		if (decision_matrix[parameter]) {

			let parameter_names = [].concat(decision_matrix[parameter].name);
			let parameter_convert_function = decision_matrix[parameter].converter || function (value) { return value; }

			parameter_names.forEach(function (parameter_name) {
				converted_style[parameter_name] = parameter_convert_function(style[parameter]);
			})

		} else {
			throw new TypeError('Wrong attribute name: ' + parameter.toString());
		}
	}

	return converted_style;
}

function getValueError(name, value, accepted) {
	return new RangeError(
		'Wrong ' + 
		name.toString() + ': ' + 
		value.toString() + 
		'. Must be ' + 
		accepted.map(function (val) {
			return '`' + val.toString() + '`';
		}).join(' or ') + '.');
}

function getDefaultConverter(name, accepted) {
	return function(value) {
		let found = false;

		for (let acc in accepted) {
			if (value === accepted[acc]) {
				found = true;
			}
		}

		if (!found) {
			throw getValueError(name, value, accepted);
		} else {
			return value;
		}
	}
}

let monokai = {
	rect_style: {
		'background-color': '#272822',
		'border-color': 'white',
		'border-width': '1'
	},
	text_style: {
		common: {
			'color': 'white'
		},
		node: {
			name: {
				'color': '#A6E22E',
				'font-weight': 'bold'
			}
		},
		attribute: {
			scope: {
				'color': '#F92672'
			},
			type: {
				'color': '#66D9EF'
			},
			symbol: {
				'color': '#F92672'
			},
			value: {
				common: {
					'color': '#AE81FF'
				},
				string: {
					'color': '#E6DB74'
				}
			}
		},
		method: {
			scope: {
				'color': '#F92672'
			},
			type: {
				'color': '#66D9EF',
				'font-style': 'italic'
			},
			name: {
				'color': '#A6E22E',
			}
		}
	}
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fixtures__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_theme_model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_classes__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_controllers__ = __webpack_require__(10);







let diagram = __WEBPACK_IMPORTED_MODULE_2__lib_classes__["a" /* draw */].classDiagram();
let model = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__fixtures__["a" /* model */]);

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		child.on('mouseup', function () {
			model = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__lib_controllers__["a" /* dragController */])(this, model);
			rebuild();
		});
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

//build(model);

diagram.rect(100, 100).move(100, 100).addClass('dolphin rect');
diagram.text('This is my text').move(200, 200).addClass('dolphin text');
diagram.line(100, 100, 500, 500).addClass('dolphin line');

console.log(diagram.children());

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return model; });


let element_blueprints = [
	{
		id: 1,
		position: {
			x: 200,
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return draw; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connection__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diagram__ = __webpack_require__(11);









let draw = SVG('diagram');

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
		setRichText: __WEBPACK_IMPORTED_MODULE_1__element__["a" /* setRichText */],
		drawBorder: __WEBPACK_IMPORTED_MODULE_1__element__["b" /* drawBorder */],
		refreshTheme: __WEBPACK_IMPORTED_MODULE_1__element__["c" /* refreshTheme */],
		applyBlueprint: __WEBPACK_IMPORTED_MODULE_1__element__["d" /* applyBlueprint */],
		socket: __WEBPACK_IMPORTED_MODULE_1__element__["e" /* getSocketCoords */],
		setId: __WEBPACK_IMPORTED_MODULE_1__element__["f" /* setId */],
		getRect: __WEBPACK_IMPORTED_MODULE_1__element__["g" /* getRect */],
		getNameLabel: __WEBPACK_IMPORTED_MODULE_1__element__["h" /* getNameLabel */],
		getTypeLabel: __WEBPACK_IMPORTED_MODULE_1__element__["i" /* getTypeLabel */],
		getAttributesLabel: __WEBPACK_IMPORTED_MODULE_1__element__["j" /* getAttributesLabel */],
		getMethodsLabel: __WEBPACK_IMPORTED_MODULE_1__element__["k" /* getMethodsLabel */],
		blueprint: null,
		style: null,
		richText: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.draggy();
		}
	}
});

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyTheme: __WEBPACK_IMPORTED_MODULE_3__diagram__["a" /* applyTheme */],
		setId: __WEBPACK_IMPORTED_MODULE_3__diagram__["b" /* setId */],
		clear: __WEBPACK_IMPORTED_MODULE_3__diagram__["c" /* clear */],
		fromModel: __WEBPACK_IMPORTED_MODULE_3__diagram__["d" /* fromModel */],
		getNodeById: __WEBPACK_IMPORTED_MODULE_3__diagram__["e" /* getNodeById */]
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.applyTheme(theme)
				.addClass('class_diagram')
				.setId(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["b" /* getHash */])())
				.move(0, 0);
		}
	}
});

SVG.Connection = SVG.invent({
	create: 'path',
	inherit: SVG.Path,
	extend: {
		applyBlueprint: __WEBPACK_IMPORTED_MODULE_2__connection__["a" /* applyBlueprint */],
		connectSockets: __WEBPACK_IMPORTED_MODULE_2__connection__["b" /* connectSockets */],
		connectDots: __WEBPACK_IMPORTED_MODULE_2__connection__["c" /* connectDots */],
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyBlueprint;
/* harmony export (immutable) */ __webpack_exports__["b"] = connectSockets;
/* harmony export (immutable) */ __webpack_exports__["c"] = connectDots;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lines__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__(9);





function applyBlueprint (blueprint) {
	let from = this.parent().getNodeById(blueprint.from).socket(5);
	let to = this.parent().getNodeById(blueprint.to).socket(4);

	this.connectDots(from, to);

	return this;
}

function connectSockets () {
	return this;
}

function connectDots (a, b) {
	this.parent().path(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lines__["a" /* cubicTo */])(a, b)).fill('none').stroke('black');

	return this;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export arcTo */
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicTo;


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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export convertLineStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__theme__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__theme_model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(0);






let merge = __webpack_require__(1);

function convertLineStyle(passed_style) {
	let merged_style = merge(__WEBPACK_IMPORTED_MODULE_1__theme_model__["a" /* class_theme */], passed_style);
	let converted_style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* convertObject */])(merged_style, __WEBPACK_IMPORTED_MODULE_0__theme__["a" /* convertStyle */]);

	return converted_style.line_style;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dragController;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);




function dragController(node, model) {
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setId;
/* harmony export (immutable) */ __webpack_exports__["a"] = applyTheme;
/* harmony export (immutable) */ __webpack_exports__["c"] = clear;
/* harmony export (immutable) */ __webpack_exports__["d"] = fromModel;
/* harmony export (immutable) */ __webpack_exports__["e"] = getNodeById;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style__ = __webpack_require__(12);





function setId(id) {
	return this.attr({
		'id': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["d" /* getId */])('ClassDiagram', id)
	});
}

function applyTheme(theme) {
	if (!theme) {
		console.warn('Missing diagram theme, loading default');
	}

	this.theme = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__style__["a" /* convertTheme */])(theme);

	this.children().forEach(function (child) {
		child.refreshTheme();
	});
	return this;
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
		if (child.attr('id') === __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tools__["d" /* getId */])('ClassDiagramNode', id)) {
			found = child;
		}
	})

	return found;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertTheme;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__theme__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__theme_model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(0);


let merge = __webpack_require__(1);




function convertTheme(theme) {
	let merged_style = merge(__WEBPACK_IMPORTED_MODULE_1__theme_model__["a" /* class_theme */], theme || {});
	let converted_style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["c" /* convertObject */])(merged_style, __WEBPACK_IMPORTED_MODULE_0__theme__["a" /* convertStyle */]);
	
	return converted_style;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fillBlueprint;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(15);


// Blueprints processing functions

let merge = __webpack_require__(1);


function fillBlueprint(blueprint) {
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
	if (blueprint.position && blueprint.id) {
		return true;
	} else {
		throw new TypeError('Blueprint error: id and/or coordinates are missing');
		return false;
	}
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getSocketCoords;
/* harmony export (immutable) */ __webpack_exports__["a"] = setRichText;
/* harmony export (immutable) */ __webpack_exports__["b"] = drawBorder;
/* harmony export (immutable) */ __webpack_exports__["c"] = refreshTheme;
/* harmony export (immutable) */ __webpack_exports__["f"] = setId;
/* harmony export (immutable) */ __webpack_exports__["d"] = applyBlueprint;
/* harmony export (immutable) */ __webpack_exports__["g"] = getRect;
/* harmony export (immutable) */ __webpack_exports__["h"] = getNameLabel;
/* harmony export (immutable) */ __webpack_exports__["i"] = getTypeLabel;
/* harmony export (immutable) */ __webpack_exports__["j"] = getAttributesLabel;
/* harmony export (immutable) */ __webpack_exports__["k"] = getMethodsLabel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blueprint__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__(16);


// Everything needed to construct an element






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

function setRichText() {
	let id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["a" /* getRawId */])(this.attr('id'));
	let style = this.style;
	let text = this.richText;

	if (!text) {
		throw new EvalError("Couldn't apply rich text: no rich text set");
	}

	if (!style) {
		throw new EvalError("Couldn't apply rich text: no theme set");
	}

	let name_label = this.getNameLabel();
	let type_label = this.getTypeLabel();
	let attributes_label = this.getAttributesLabel();
	let methods_label = this.getMethodsLabel();

	if (name_label) {
		name_label.remove();
	}

	if (type_label) {
		type_label.remove();
	}

	if (attributes_label) {
		attributes_label.remove();
	}

	if (methods_label) {
		methods_label.remove();
	}

	if (text.type !== 'normal') {
		type_label = this.text('<' + text.type + '>')
			.font(style.text_style.common)
			.font(style.text_style.node.common)
			.font(style.text_style.node.type)
			.font('anchor', 'middle')
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('type-label', id));
	}

	name_label = this.text(text.name)
		.font(style.text_style.common)
		.font(style.text_style.node.common)
		.font(style.text_style.node.name)
		.font('anchor', 'middle')
		.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('name-label', id));

	if (text.attributes) {
		attributes_label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__text__["a" /* addAttributes */])(this, text.attributes, style.text_style)
			.font(style.text_style.common)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('attributes-label', id));
	}

	if (text.methods) {
		methods_label = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__text__["b" /* addMethods */])(this, text.methods, style.text_style)
			.font(style.text_style.common)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('methods-label', id));
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
	let style = this.style;

	var rect = this.getRect();
	var rect_size = computeRectSize(this);
	
	if (rect) {
		rect.size(rect_size.w, rect_size.h)
			.attr(style.rect_style);
	} else {
		rect = this.rect(rect_size.w, rect_size.h)
			.attr(style.rect_style)
			.move(0, 0)
			.attr('id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('rectangle', id));
	}
	rect.back();

	return this;
}

function refreshTheme() {
	if (!this.parent().theme) {
		throw new TypeError('Diagram theme is undefined');
	}

	let theme = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__style__["a" /* convertElementStyle */])(this.parent().theme);

	this.style = {
		rect_style: theme.rect_style,
		text_style: theme.text_style,
		additional_style: theme.additional_style
	}

	this.setRichText();
	this.drawBorder();
	return this;
}

function setId(id) {
	return this.attr({
		'id': __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tools__["d" /* getId */])('ClassDiagramNode', id)
	});
}

function applyBlueprint(blueprint) {
	var checked_blueprint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__blueprint__["a" /* fillBlueprint */])(blueprint);
	this.setId(checked_blueprint.id);
	this.blueprint = checked_blueprint;
	this.richText = checked_blueprint.text;
	this.refreshTheme();
	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	this.attr('cursor', 'pointer');
	return this;
}

function computeRectSize(element) {
	let name_label = element.getNameLabel();
	let type_label = element.getTypeLabel();
	let attributes_label = element.getAttributesLabel();
	let methods_label = element.getMethodsLabel();

	let padding = element.style.additional_style.padding;

	let actual_padding = {
		w: Math.max(
			padding.w,
			element.style.rect_style.rx
		),

		h: Math.max(
			padding.h,
			element.style.rect_style.ry
		)
	}

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

	let padding = element.style.additional_style.padding;
	let actual_padding = {
		w: Math.max(
			padding.w,
			element.style.rect_style.rx
		),

		h: Math.max(
			padding.h,
			element.style.rect_style.ry
		)
	}

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
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = convertElementStyle;


// convert CSS-like style to SVG-like

function convertElementStyle(passed_style) {
	let converted_style = Object.assign({}, passed_style);

	let additional_style = {
		padding: Object.assign({}, converted_style.rect_style.padding)
	}

	converted_style.additional_style = additional_style;
	// delete converted_style.rect_style.padding;

	return converted_style;
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addAttributes;
/* harmony export (immutable) */ __webpack_exports__["b"] = addMethods;


// element text processing

var merge = __webpack_require__(1);

function addAttributes(element, text, style) {
	// + foo : int = "bar"
	// 
	let attr_style = style.attribute;

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];		// one attribute

			add.tspan(getScopeSymbol(value.scope)).font(attr_style.scope).newLine();	// add scope symbol
			add.tspan(' ');

			add.tspan(value.name).font(attr_style.name);	// add attibute's name
			add.tspan(' ');

			if (value.type !== 'any') {
				// if attribute has type
				add.tspan(' : ');
				add.tspan(capitalizeFirst(value.type) + ' ').font(attr_style.type);		// add attribute's type
			}

			if (value.value) {
				// if attribute has value

				add.tspan('=').font(attr_style.symbol);		// add '='
				add.tspan(' ');

				if (value.type === 'string') {
					// if value's type is string, apply specific stypes
					add.tspan('"' + value.value + '"').font(merge(attr_style.value.common, attr_style.value.string));

				} else if (value.type === 'int') {
					// the same kind of action for integers
					add.tspan(value.value).font(merge(attr_style.value.common, attr_style.value.integer));

				} else {
					// any other value
					add.tspan(value.value).font(attr_style.value.common);
				}
			}
		}
	}).font(attr_style.common);		// apply general font style
}

function addMethods(element, text, style) {
	// - string getFoo(
	// 		bar: int,
	// 		foo: string = "hello")
	let method_style = style.method;
	let attr_style = style.attribute;	// needed to apply to passed parameters

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];

			add.tspan(getScopeSymbol(value.scope)).font(method_style.scope).newLine();	// add scope symbol
			add.tspan(' ');

			if (value.type !== 'any') {
				add.tspan(capitalizeFirst(value.type)).font(method_style.type);	// add returned value type if needed
				add.tspan(' ');
			}
			add.tspan(value.name).font(method_style.name);	// add method name
			add.tspan(' ');

			if (value.args) {	// if method has arguments

				add.tspan('(');		// open the bracket

				for (let arg in value.args) {
					// get one argument

					let argument = value.args[arg];
					let arg_style = attr_style;

					add.tspan(argument.name)	// add argument name
						.font(arg_style.name)
						.font(method_style.passed)	// override the style with special style for passed argument
						.newLine()	// each passed argument should start with newline
						.dx(20);	// ident
					
					if (argument.type !== 'any') {
						add.tspan(' : ').font(method_style.passed);
						add.tspan(capitalizeFirst(argument.type))	// add argument data type
							.font(arg_style.type)
							.font(method_style.passed);
					}

					if (argument.value !== '') {
						add.tspan(' ').font(method_style.passed);
						add.tspan('=').font(arg_style.symbol).font(method_style.passed);	// add '='
						add.tspan(' ').font(method_style.passed);;

						if (argument.type === 'string') {	// add default value just like we do it in attributes

							add.tspan('"' + argument.value + '"')
								.font(merge(arg_style.value.common, arg_style.value.string))
								.font(method_style.passed);

						} else if (argument.type === 'int') {

							add.tspan(argument.value)
								.font(merge(arg_style.value.common, arg_style.value.integer))
								.font(method_style.passed);

						} else {

							add.tspan(argument.value)
								.font(arg_style.value.common)
								.font(method_style.passed);
						}

					}

					if (arg < value.args.length - 1) {
						add.tspan(',')
							.font(arg_style.common)
							.font(method_style.passed);
					} else {
						add.tspan(')');
					}
				}

			} else {
				// otherwise just close the method with ()
				add.tspan('()');
			}
		}
	}).font(method_style.common);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map