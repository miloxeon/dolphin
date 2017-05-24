'use strict';

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


import {getElementById, cloneLayer} from '../layers';
import {arcTo, cubicTo} from './lines';
import {convertLineStyle} from './style';
import {getHash} from '../tools';

export function connectElements(layer, connection_blueprint) {
	var new_layer = cloneLayer(layer);

	var from = getElementById(new_layer, connection_blueprint.from.element_id).extensions.socket(connection_blueprint.from.socket);
	var to = getElementById(new_layer, connection_blueprint.to.element_id).extensions.socket(connection_blueprint.to.socket);

	var line_shape = defineLineShape(connection_blueprint.from, connection_blueprint.to);
	var line_path = '';

	switch (line_shape) {
		case 'arc':
			line_path = arcTo(from, to);
			break;

		case 'cubic':
			line_path = cubicTo(from, to);
			break;

		default:
			//error;
			break;
	}

	var line_style = convertLineStyle(connection_blueprint.style).line_style;

	var connection = new_layer.path(line_path).attr(line_style);
	var connection_id = getHash('connection');

	connection.attr({
		id: connection_id
	})

	var connection_with_id = {};
	connection_with_id[connection_id] = connection;

	new_layer.connections = Object.assign({}, 
		layer.connections,
		connection_with_id
	);

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
