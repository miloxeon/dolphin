'use strict';

// element text processing

export function addAttributes(element, text, style) {
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

export function addMethods(element, text, style) {
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

			if (value.args) {	// if method has arguments

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
