'use strict';

// Blueprints processing functions

let merge = require('deepmerge');
import {default_blueprint, default_attribute, default_method} from './model';

export function fillBlueprint(blueprint) {
	if (!blueprint.position) {
		throw new TypeError('Invalid blueprint: coordinates are missing');
		return;
	} else {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(default_blueprint, blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(default_attribute, attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(default_method, method);
		});

		return desired_blueprint;		
	}
}
