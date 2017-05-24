'use strict';

// layers api

export function _createLayer(stage) {
	return stage.group();
}

export function cloneLayer(layer) {
	var new_layer = layer.clone();
	
	new_layer.elements = layer.elements;
	new_layer.connections = layer.connections;

	return new_layer;
}


// elements
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


//connections
export function getConnections(layer) {
	return Object.assign({}, layer.connections);
}

export function getConnectionsAsArray(layer) {
	var connections = [];

	var layer_connections = getConnections(layer);

	for (let connection_id in layer_connections) {
		connections.push(layer_connections[connection_id]);
	}

	return connections;
}

export function getConnectionById(layer, connection_id) {
	return getConnections(layer)[connection_id];
}

