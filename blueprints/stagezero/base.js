'use strict';

import {drawElement} from './elements';
import {_createLayer, getElementsAsArray} from './layers';
import {connectElements} from './connections';

var stage = SVG('diagram');
var layer = _createLayer(stage);

layer = drawElement(layer, {
	position: {
		x: 150,
		y: 200
	},
	text: 'Hello'
});

layer = drawElement(layer, {
	position: {
		x: 300,
		y: 200
	},
	text: 'Harder, Ivan',
	style: {
		background_color: 'pink'
	}
});

layer = drawElement(layer, {
	position: {
		x: 300,
		y: 300
	},
	text: 'Harder, Ivan',
	style: {
		background_color: 'pink'
	}
});


var elements = getElementsAsArray(layer);


// console.log(elements[0].extensions.socket(1));

// for (let element_id in layer.elements) {
// 	console.log(layer.elements[element_id].extensions.socket(1));
// }

layer = connectElements(layer, {
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
