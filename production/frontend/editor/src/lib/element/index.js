'use strict';
// todo errors

// methods of ClassDiagramNode element

import {setRichText} from './text';
import {applyBlueprint} from './blueprint';
import {getId} from '../tools';

import {x2, y2} from './geometry';
import {socket} from './sockets';
import {drawBorder} from './border';

import {
	getRect,
	getNameLabel,
	getTypeLabel,
	getAttributesLabel,
	getMethodsLabel
} from './children';

let name = 'DiagramNode';

export default {
	x2,
	y2,
	setRichText,
	drawBorder,
	reset,
	applyBlueprint,
	socket,
	setId,
	getRect,
	getNameLabel,
	getTypeLabel,
	getAttributesLabel,
	getMethodsLabel,
	clear,
	getType,
	blueprint: null,
	style: null,
	richText: null
}

function getType() {
	return name;
}

function setId(id) {
	return this.attr({
		'id': getId('ClassDiagramNode', id)
	});
}

function clear() {
	// delete everything inside the element
	this.children().forEach(function (child) {
		child.remove();
	})
}

function reset() {
	// rebuild element
	this.setRichText();
	this.drawBorder();
	return this;
}
