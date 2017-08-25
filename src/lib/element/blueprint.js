'use strict';

// Blueprints processing functions
// todo errors

let merge = require('deepmerge');
import {default_blueprint, default_attribute, default_method, default_argument} from './model';

export function applyBlueprint(blueprint) {
	var checked_blueprint = fillBlueprint(blueprint);
	this.setId(checked_blueprint.id);
	this.blueprint = checked_blueprint;
	this.richText = checked_blueprint.text;
	this.reset();
	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	return this;
}

function fillBlueprint(blueprint) {
	// get blueprint and fill it's empty fields with default values
	if (checkBlueprint(blueprint)) {
		let passed_blueprint = blueprint;
		let desired_blueprint = merge(default_blueprint, blueprint);

		desired_blueprint.text.attributes = (desired_blueprint.text.attributes || []).map(function (attribute) {
			return merge(default_attribute, attribute);
		});

		desired_blueprint.text.methods = (desired_blueprint.text.methods || []).map(function (method) {
			return merge(default_method, method);
		});

		if (desired_blueprint.text.methods !== []) {

			desired_blueprint.text.methods = desired_blueprint.text.methods.map(function (method) {
				if (method.args !== []) {
					method.args = method.args.map(function (argument) {
						return merge(default_argument, argument);
					});
				}
				return method;
			});
		}

		return desired_blueprint;	
	}
}

function checkBlueprint(blueprint) {
	// check the required parameters
	if (blueprint.position && blueprint.id) {
		return true;
	} else {
		throw new TypeError('Blueprint error: id and/or coordinates are missing');
		return false;
	}
}
