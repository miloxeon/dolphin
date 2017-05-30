'use strict';

// methods of Connection class

import {arcTo, arcReverseTo, cubicTo} from './lines';
import {getId, getHash, getRawId} from '../tools';
import {defineSockets} from './geometry';

export function applyBlueprint (blueprint) {
	this.blueprint = blueprint;

	this.setId(getHash());
	// check blueprint here
	this.setRichText({
		text: blueprint.text,
		from: {
			role: blueprint.from.role,
			indicator: blueprint.from.indicator
		},
		to: {
			role: blueprint.to.role,
			indicator: blueprint.to.indicator
		}
	});
	this.redraw();
	return this;
}

export function setId(id) {
	return this.attr('id', getId('Connection', id));
}

export function clear() {
	// remove everything: the line, labels, arrows...
	this.children().forEach(function (child) {
		child.remove();
	});
	return this;
}

function defineLineShape(sockets) {
	let sockets_str = [].concat(sockets).sort((a, b) => a - b).join('');

	switch (sockets_str) {
		case '47':
		case '57':
		case '24':
		case '25':
			return 'arc';

		default:
			return 'cubic';
	}
}

function getLineFunction(sockets) {
	let sockets_str = [].concat(sockets).sort((a, b) => a - b).join('');

	switch (sockets_str) {
		case '47':
		case '24':
			return arcTo;

		case '25':
		case '57':
			return arcReverseTo;

		default:
			return cubicTo;
	}	
}

export function redraw() {
	this.clear();

	let from_elem = this.parent().getNodeById(this.blueprint.from.id);
	let to_elem = this.parent().getNodeById(this.blueprint.to.id);

	let sockets = defineSockets(from_elem, to_elem);

	let from = {
		element: from_elem,
		socket: sockets[0]
	}

	let to = {
		element: to_elem,
		socket: sockets[1]
	}

	let type = this.blueprint.type;

	let connector = getLineFunction(sockets);
	this.connectSockets(from, to, type, connector);
}

export function connectSockets (from, to, type, connector = cubicTo) {
	// connect two elements' sockets (abstraction over connection by two coordinates)
	let from_dot = from.element.socket(from.socket);
	let to_dot = to.element.socket(to.socket);
	let isReverse = from_dot.x > to_dot.x;

	if (!isReverse) {
		this.connectDots(from_dot, to_dot, type, connector, false);
	} else {
		this.connectDots(to_dot, from_dot, type, connector, true);
	}

	return this;
}

export function setRichText(rich_text) {
	// set connection's rich text: labels, roles, indicators...
	this.richText = rich_text;
	this.redraw();
	return this;
}

function computeOffset(part, all, position) {
	let path_length = all.length();
	let padding = 10;

	switch (position) {
		case 'start':
			return padding;

		case 'middle':
			// magic
			return (50 - ((part / path_length) * 50)) + '%';

		case 'end':
			return path_length - part - padding;

		default:
			// err
	}
}

export function displayLineText(isReverse = false) {
	let path = this.connectionLine;
	let richText = this.richText;
	let offset_upper = -5;
	let offset_lower = 15;


	// text at the middle
	// let line_text = this.text(function (add) { add.tspan(richText.text).dy(offset_upper)})
	// 	.addClass('dolphin_text dolphin_line_text dolphin_line_action')
	// 	.path(path.array())
	// 	.textPath();
	// line_text.attr({
	// 	'startOffset': computeOffset(line_text, path, 'middle'),
	// 	'spacing': 'auto'
	// });
	
	// role at the start
	let role_start_width;
	let role_start = this.text(function (add) {

		let t = add.tspan(richText.from.role).dy(offset_upper);
		role_start_width = t.bbox().w;

	}).addClass('dolphin_text dolphin_line_text dolphin_line_role')
		.path(path.array())
		.textPath();
	role_start.attr({
		'startOffset': computeOffset(role_start_width, path, !isReverse ? 'start' : 'end'),
		'spacing': 'auto'
	});
	
	// indicator at the start
	let indicator_start_width;
	let indicator_start = this.text(function (add) {

		let t = add.tspan(richText.from.indicator).dy(offset_lower);
		indicator_start_width = t.bbox().w;

	}).addClass('dolphin_text dolphin_line_text dolphin_line_indicator')
		.path(path.array())
		.textPath();
	indicator_start.attr({
		'startOffset': computeOffset(indicator_start_width, path, !isReverse ? 'start' : 'end'),
		'spacing': 'auto'
	});
	
	// role at the end
	let role_end_width;
	let role_end = this.text(function (add) {

		let t = add.tspan(richText.to.role).dy(offset_upper);
		role_end_width = t.bbox().w;

	}).addClass('dolphin_text dolphin_line_text dolphin_line_role')
		.path(path.array())
		.textPath();
	role_end.attr({
		'startOffset': computeOffset(role_end_width, path, !isReverse ? 'end' : 'start'),
		'spacing': 'auto'
	});

	// indicator at the end
	let indicator_end_width;
	let indicator_end = this.text(function (add) {

		let t = add.tspan(richText.to.indicator).dy(offset_lower);
		indicator_end_width = t.bbox().w;

	}).addClass('dolphin_text dolphin_line_text dolphin_line_indicator')
		.path(path.array())
		.textPath();
	indicator_end.attr({
		'startOffset': computeOffset(indicator_end_width, path, !isReverse ? 'end' : 'start'),
		'spacing': 'auto'
	});
		
	return this;
}

export function connectDots (a, b, type, connector, isReverse) {
	// connect two coordinates with a line
	let id = getRawId(this.id());

	console.log(type);

	this.connectionLine = this.path(connector(a, b))
		.attr('id', getId(id))
		.addClass('dolphin_line');

	this.displayLineText(isReverse);

	return this;
}
