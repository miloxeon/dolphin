'use strict';

import {drawElement} from './elements';

var stage = SVG('diagram');
var layer = stage.group();

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

for (let element_id in layer.elements) {
	console.log(layer.elements[element_id].extensions.socket(1));
}

// console.log(layer.elements[0]);

// console.log(layer.elements);

// console.log('it works!');
