'use strict';

// methods of Connection class

import {getLineFunction} from './pathes';
import {getId} from '../tools';
import {defineSockets, checkOverlap} from './geometry';
import {applyBlueprint} from './blueprints';
import {connectSockets, connectDots} from './lines';
import {displayLineText, setRichText} from './text';

import {checkElement, checkLineFunction, checkType} from './errors';

import config from '../config';

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
	if (checkElement(from_elem)) throw checkElement(from_elem);
	if (checkElement(to_elem)) throw checkElement(to_elem);

	let sockets = defineSockets(from_elem, to_elem);

	if (sockets && !checkOverlap(from_elem, to_elem)) {
		this.showAll();
		let from = {
			element: from_elem,
			socket: sockets[0]
		}

		let to = {
			element: to_elem,
			socket: sockets[1]
		}

		let type = this.blueprint.type;

		if (!type) {
			console.warn("Connection type is missing, loading default");
			type = config['default-connection-type'];
		}

		if (checkType(type)) throw checkType(type);

		let line_function = getLineFunction(sockets);
		if (checkLineFunction(line_function)) throw checkLineFunction(line_function);

		this.connectSockets(from, to, type, line_function);

	} else {
		// overlap
		this.hideAll();
	}

}
