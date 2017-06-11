'use strict';

let merge = require('deepmerge');
import {getHash} from '../tools';
import {default_blueprint, allowed_types} from './model';

export function applyBlueprint (blueprint) {
	this.blueprint = fillBlueprint(blueprint);
	this.setId(blueprint.id);
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

import {checkBlueprint} from './errors';

function fillBlueprint(blueprint) {
	// get blueprint and fill it's empty fields with default values
	if (checkBlueprint(blueprint)) throw checkBlueprint(blueprint);
	
	let passed_blueprint = blueprint;
	let desired_blueprint = merge(default_blueprint, blueprint);

	if (allowed_types.indexOf(passed_blueprint.type) === -1) {
		console.warn('Wrong or missing connection type: ' + passed_blueprint.type);
		desired_blueprint.type = 'association-bidi';
	}

	return desired_blueprint;	
}
