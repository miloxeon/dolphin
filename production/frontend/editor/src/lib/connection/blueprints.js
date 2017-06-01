'use strict';

import {getHash} from '../tools';

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

export function setRichText(rich_text) {
	// set connection's rich text: labels, roles, indicators...
	this.richText = rich_text;
	this.redraw();
	return this;
}
