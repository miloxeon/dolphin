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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return default_style; });
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
	'font-family': 'Tahoma',
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_element_model__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_element_style__ = __webpack_require__(3);


let merge = __webpack_require__(0);



var draw = SVG('diagram');

let blueprint = {
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
	},
	style: {
		// 'background-color': 'pink'
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

function prepareText(element_text) {
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

	// console.log(element_text.attributes);

	return {
		name: element_text.name,
		attributes: prepared_attributes.join('\n'),
		methods: prepared_methods.join('\n')
	}
}

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: function (blueprint) {
			var checked_blueprint = fillBlueprint(blueprint);

			let style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib_element_style__["a" /* convertElementStyle */])(checked_blueprint.style || {});
			let padding = style.additional_style.padding;

			let text = this.text(prepareText(checked_blueprint.text).methods).font(style.text_style).move(padding.w, padding.h);

			let rect_size = {
				w: text.bbox().w + padding.w * 2,
				h: text.bbox().h + padding.h * 2
			}

			let rect = this.rect(rect_size.w, rect_size.h).attr(style.rect_style).move(0, 0);
			text.front();

			return this;
		}
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode).applyBlueprint(blueprint).move(blueprint.position.x, blueprint.position.y);
		}
	}
});

var element = draw.classDiagramNode(blueprint);
// draw.rounded(200, 200);


/***/ }),
/* 3 */
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
	var passed_style = merge(__WEBPACK_IMPORTED_MODULE_0__model__["d" /* default_style */], style);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map