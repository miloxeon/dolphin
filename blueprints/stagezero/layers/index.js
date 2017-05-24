'use strict';

// layers api

export function _createLayer(stage) {
	return stage.group();
}

export function getElements(layer) {
	return Object.assign({}, layer.elements);
}

export function getElementsAsArray(layer) {
	var elements = [];

	var layer_elements = getElements(layer);

	for (let element_id in layer_elements) {
		elements.push(layer_elements[element_id]);
	}

	return elements;
}

export function getElementById(layer, element_id) {
	return getElements(layer)[element_id];
}

export function cloneLayer(layer) {
	var new_layer = layer.clone();
	new_layer.elements = layer.elements;
	
	return new_layer;
}
