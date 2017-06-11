'use strict';
// todo errors

// element text processing

import {getId, getRawId} from '../tools';
import {computeRectSize} from './geometry';
import config from '../config';

export function setRichText() {
	// set element's rich text: node name, attribures, methods and so on
	let id = getRawId(this.attr('id'));
	let text = this.richText;

	if (!text) {
		throw new EvalError("Couldn't apply rich text: no rich text set");
	}

	this.clear();

	if (text.type !== 'normal') {
		var type_label = this.text('<' + text.type + '>')
			.attr('id', getId('type-label', id))
			.addClass('dolphin_text dolphin_node_type');
	}

	var name_label = this.text(text.name)
		.attr('id', getId('name-label', id))
		.addClass('dolphin_text dolphin_node_name');

	if (text.attributes) {
		var attributes_label = addAttributes(this, text.attributes)
			.attr('id', getId('attributes-label', id))
			.addClass('dolphin_text');
	}

	if (text.methods) {
		var methods_label = addMethods(this, text.methods)
			.attr('id', getId('methods-label', id))
			.addClass('dolphin_text');
	}

	let offsets = computeLabelOffsets(this);

	if (type_label) {
		type_label.move(offsets.type.x, offsets.type.y);
	}

	if (name_label) {
		name_label.move(offsets.name.x, offsets.name.y);
	}

	if (attributes_label) {
		attributes_label.move(offsets.attributes.x, offsets.attributes.y);
	}

	if (methods_label) {
		methods_label.move(offsets.methods.x, offsets.methods.y);
	}

	return this;
}

function addAttributes(element, text, style) {
	// + foo : int = "bar"
 
	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];		// one attribute
			let addLabel = construct_addLabel(add);

			addLabel(getScopeSymbol(value.scope), 'dolphin_node_scope', 1).newLine();	// scope
			addLabel(value.name, 'dolphin_node_attribute', 1);	// attribute name

			if (value.type !== 'any') {
				// if attribute has type
				addLabel(':', 'dolphin_node_symbol', 2);
				addLabel(capitalizeFirst(value.type), 'dolphin_node_datatype');
			}

			if (value.value) {
				// if attribute has value
				addLabel('=', 'dolphin_node_symbol', 2);

				switch (value.type) {
					case 'string':
						addLabel('"' + value.value + '"', 'dolphin_node_value dolphin_node_value-string');
						break;

					case 'int':
						addLabel(value.value, 'dolphin_node_value dolphin_node_value-int');
						break;

					default:
						addLabel(value.value, 'dolphin_node_value');
						break;
				}
			}
		}
	}).addClass('dolphin_text');	// apply general font style
}

function addMethods(element, text, style) {
	// - string getFoo(
	// 		bar: int,
	// 		foo: string = "hello")

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];
			let addLabel = construct_addLabel(add);

			addLabel(getScopeSymbol(value.scope), 'dolphin_node_scope', 1).newLine();	// scope

			if (value.type !== 'any') {
				addLabel(capitalizeFirst(value.type), 'dolphin_node_datatype', 1);
			}

			addLabel(value.name, 'dolphin_node_method', 1);	// attribute name

			if (value.args.length > 1) {	// if method has arguments

				add.tspan('(');		// open the bracket

				for (let arg in value.args) {
					// get one argument

					let argument = value.args[arg];

					addLabel(argument.name, 'dolphin_node_passed dolphin_node_attribute').newLine().dx(20);
					
					if (argument.type !== 'any') {
						addLabel(':', 'dolphin_node_passed dolphin_node_symbol', 2);
						addLabel(capitalizeFirst(argument.type), 'dolphin_node_passed dolphin_node_datatype');
					}

					if (argument.value !== '') {

						addLabel('=', 'dolphin_node_passed dolphin_node_symbol', 2);

						switch (argument.type) {
							case 'string':
								addLabel('"' + argument.value + '"', 'dolphin_node_passed dolphin_node_value dolphin_node_value-string');
								break;

							case 'int':
								addLabel(argument.value, 'dolphin_node_passed dolphin_node_value dolphin_node_value-int');
								break;

							default:
								addLabel(argument.value, 'dolphin_node_passed dolphin_node_value');
								break;
						}
					}

					if (arg < value.args.length - 1) {
						addLabel(',', 'dolphin_node_passed');
					} else {
						addLabel(')');
					}
				}

			} else {
				// otherwise just close the method with ()
				addLabel('()');
			}
		}
	}).addClass('dolphin_text');
}

function computeLabelOffsets(element) {
	let name_label = element.getNameLabel();
	let type_label = element.getTypeLabel();
	let attributes_label = element.getAttributesLabel();
	let methods_label = element.getMethodsLabel();
	
	let rect_size = computeRectSize(element);
	let offsets = {};

	let padding = {
		w: parseInt(config['padding-w']),
		h: parseInt(config['padding-h'])
	};

	// let actual_padding = {
	// 	w: Math.max(
	// 		padding.w,
	// 		element.style.rect_style.rx
	// 	),

	// 	h: Math.max(
	// 		padding.h,
	// 		element.style.rect_style.ry
	// 	)
	// }

	let actual_padding = padding;

	let x_left = actual_padding.w;
	let x_center = rect_size.w / 2;	
	let y_last = actual_padding.h;

	if (type_label) {
		offsets.type = {
			x: x_center,
			y: y_last
		};
		y_last += type_label.bbox().h;
	}

	if (name_label) {
		offsets.name = {
			x: x_center,
			y: y_last
		};
		y_last += name_label.bbox().h + padding.h;
	}

	if (attributes_label) {
		offsets.attributes = {
			x: x_left,
			y: y_last
		}
		y_last += attributes_label.bbox().h + padding.h;
	}

	if (methods_label) {
		offsets.methods = {
			x: x_left,
			y: y_last
		}
		y_last += methods_label.bbox().h + padding.h;
	}

	return offsets;
}

function construct_addLabel(add) {
	return function (text, classes, spacing) {
		if (spacing) {
			if (spacing === 1) {

				let tspan = add.tspan(text)
					.addClass(classes || '');
				add.tspan(' ');

				return tspan;

			} else if (spacing === 2) {
				
				add.tspan(' ');
				let tspan = add.tspan(text)
					.addClass(classes || '');
				add.tspan(' ');

				return tspan;

			} else {
				throw new RangeError('Wrong spacing: ' + spacing);
			}
		} else {
			return add.tspan(text)
				.addClass(classes || '');
		}
	}
}

function getScopeSymbol(scope) {
	switch (scope.toLowerCase()) {
		case 'public':
			return '+';
			break;

		case 'private':
			return '-';
			break;

		case 'protected':
			return '#';
			break;

		case 'derived':
			return '/';
			break;

		case 'package':
			return '~';
			break;

		default:
			throw new TypeError('Unknown scope: ' + scope);
	}
}

function capitalizeFirst(word) {
	return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}
