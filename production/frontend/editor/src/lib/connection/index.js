'use strict';

// methods of Connection class

import {getLineFunction} from './pathes';
import {getId} from '../tools';
import {defineSockets} from './geometry';
import {applyBlueprint, setRichText} from './blueprints';
import {connectSockets, connectDots} from './lines';
import {displayLineText} from './text';

let name = 'Connection';

export default {
	applyBlueprint,
	connectSockets,
	connectDots,
	redraw,
	setId,
	setRichText,
	displayLineText,
	getType,
	hideAll,
	showAll,
	blueprint: null,
	actionLabel: null,
	startRole: null,
	endRole: null,
	startIndicator: null,
	endIndicator: null
}

function getType() {
	return name;
}

function setId(id) {
	return this.attr('id', getId(name, id));
}

function hideAll() {
	this.children().forEach(function (child) {
		child.opacity(0);
	})
	return this;
}

function showAll() {
	this.children().forEach(function (child) {
		child.opacity(1);
	})
	return this;
}

function redraw() {
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
	this.connectSockets(from, to, type, getLineFunction(sockets));
}
