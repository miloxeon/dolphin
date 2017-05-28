'use strict';

// methods of Connection class

import {arcTo, cubicTo} from './lines';
import {getId, getHash, getRawId} from '../tools';

export function applyBlueprint (blueprint) {
	this.blueprint = blueprint;

	this.setId(getHash());
	// check blueprint here
	this.setRichText('Hello');
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

export function redraw() {
	this.clear();

	let from = this.parent().getNodeById(this.blueprint.from).socket(5);
	let to = this.parent().getNodeById(this.blueprint.to).socket(4);

	this.connectDots(from, to);
}

export function connectSockets () {
	// connect two elements' sockets (abstraction over connection by two coordinates)
	return this;
}

export function setRichText(line_text) {
	// set connection's rich text: labels, roles, indicators...
	this.richText = line_text;
	this.redraw();
	return this;
}

export function connectDots (a, b) {
	// connect two coordinates with a line
	let id = getRawId(this.id());
	let richText = this.richText;

	let path = this.path(cubicTo(a, b))
		.attr('id', getId(id))
		.addClass('dolphin_line');

	let text = this.text(function (add) {
		add.tspan(richText).dy(-5);
	}).addClass('dolphin_text dolphin_line_text dolphin_line_action');

	let offset = (50 - Math.round((text.bbox().w / path.length()) * 50)) + '%';

	text.path(cubicTo(a, b)).textPath().attr('startOffset', offset);

	return this;
}
