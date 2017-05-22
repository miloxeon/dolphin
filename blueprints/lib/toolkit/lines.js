'use strict';

import {getHash} from './common';

export function createConnection (connection_blueprint) {
	var id = 'connection_' + getHash();
	
	if (connection_blueprint.from && connection_blueprint.to) {
		var from = connection_blueprint.from;
		var to = connection_blueprint.to;
	} else {
		// error
	}

	var type = checkConnectionType(connection_blueprint.type);

	var blueprint_style = connection_blueprint.style || {};

	var default_style = {
		'stroke': 'black',
		'stroke-width': '2',
		'fill': 'none',
		'stroke-linecap': 'round',
		'stroke-dasharray': 'none'
	}

	var style = {
		'stroke': blueprint_style['stroke'] || default_style['stroke'],
		'stroke-width': blueprint_style['stroke-width'] || default_style['stroke-width'],
		'fill': blueprint_style['fill'] || default_style['fill'],
		'stroke-linecap': blueprint_style['stroke-linecap'] || default_style['stroke-linecap'],
		'stroke-dasharray': blueprint_style['stroke-dasharray'] || default_style['stroke-dasharray']
	}

	return {
		id: id,
		type: type,
		from: from,
		to: to,
		style: style,
		blueprint: connection_blueprint
	}
}

export function checkConnectionType(type) {
	var defaults = {
		type: 'simple',
		shape: 'cubic',
		roughness: 'soft'
	}

	var new_type = Object.assign({}, type);

	for (var param in defaults) {
		if (!new_type[param]) {
			new_type[param] = defaults[param];
		}
	}

	return new_type;
}

export function defineLineShape(socket_1, socket_2) {
	var sockets = [socket_1, socket_2].map(function (a) {
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
