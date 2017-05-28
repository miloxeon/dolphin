'use strict';

import {arcTo, cubicTo} from './lines';
import {convertLineStyle} from './style';

export function applyBlueprint (blueprint) {
	let from = this.parent().getNodeById(blueprint.from).socket(5);
	let to = this.parent().getNodeById(blueprint.to).socket(4);

	this.connectDots(from, to);

	return this;
}

export function connectSockets () {
	return this;
}

export function connectDots (a, b) {
	this.parent().path(cubicTo(a, b)).fill('none').stroke('black');

	return this;
}
