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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_element_model__ = __webpack_require__(2);


let merge = __webpack_require__(1);


var draw = SVG('diagram');

let blueprint = {
	id: 1,
	position: {
		x: 100,
		y: 100
	},
	text: {
		name: 'Person',
		attributes: [
			{
				name: 'name',
				type: 'string',
				scope: 'public'
			},
			{
				name: 'age'
			}
		],
		methods: [

		]
	},
	style: {
		'background-color': 'pink',
		'font-size': '12'
	}
}

function fillBlueprint(blueprint) {
	if (!blueprint.position) {
		throw new TypeError('Invalid blueprint: coordinates are missing');
		return;
	} else {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(__WEBPACK_IMPORTED_MODULE_0__lib_element_model__["a" /* default_blueprint */], blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__lib_element_model__["b" /* default_attribute */], attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(__WEBPACK_IMPORTED_MODULE_0__lib_element_model__["c" /* default_method */], method);
		});

		return desired_blueprint;		
	}
}

fillBlueprint(blueprint);

SVG.ClassDiagramNode = SVG.invent({
	create: 'rect',
	inherit: SVG.Shape,
	extend: {
		size: function (width, height) {
			return this.attr({
				width: width, 
				height: height,
				rx: height / 5,
				ry: height / 5
			});
		},
		abc: function (color) {
			return this.attr({
				fill: color
			})
		}
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode).size(width, height);
		}
	}
});

// var element = draw.classDiagramNode(200, 100).abc('pink');





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
/* unused harmony export default_style */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return default_blueprint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return default_attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return default_method; });


// data models for element

let default_style = {
	'padding': '15 10',

	'border-color': 'black',
	'border-width': '2',
	'border-radius': '4',

	'color': 'black',
	'font-family': 'Arial',
	'font-size': '14',
	'line-height': '1.25',
	'font-style': 'normal',
	'font-weight': 'normal',
	'text-align': 'left',

	'background-color': 'white'
}

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
}

let default_attribute = {
	name: 'newElement',
	value: '',
	type: 'any',
	scope: 'public'
}

let default_method = {
	name: 'newMethod',
	type: 'any',
	scope: 'public'
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map