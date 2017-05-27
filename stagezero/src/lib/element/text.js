'use strict';

// element text processing

var merge = require('deepmerge');

export function addAttributes(element, text, style) {
	// + foo : int = "bar"
	// 
	let attr_style = style.attribute;

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];		// one attribute

			add.tspan(getScopeSymbol(value.scope)).font(attr_style.scope).newLine();	// add scope symbol
			add.tspan(' ');

			add.tspan(value.name).font(attr_style.name);	// add attibute's name
			add.tspan(' ');

			if (value.type !== 'any') {
				// if attribute has type
				add.tspan(' : ');
				add.tspan(capitalizeFirst(value.type) + ' ').font(attr_style.type);		// add attribute's type
			}

			if (value.value) {
				// if attribute has value

				add.tspan('=').font(attr_style.symbol);		// add '='
				add.tspan(' ');

				if (value.type === 'string') {
					// if value's type is string, apply specific stypes
					add.tspan('"' + value.value + '"').font(merge(attr_style.value.common, attr_style.value.string));

				} else if (value.type === 'int') {
					// the same kind of action for integers
					add.tspan(value.value).font(merge(attr_style.value.common, attr_style.value.integer));

				} else {
					// any other value
					add.tspan(value.value).font(attr_style.value.common);
				}
			}
		}
	}).font(attr_style.common);		// apply general font style
}

export function addMethods(element, text, style) {
	// - string getFoo(
	// 		bar: int,
	// 		foo: string = "hello")
	let method_style = style.method;
	let attr_style = style.attribute;	// needed to apply to passed parameters

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];

			add.tspan(getScopeSymbol(value.scope)).font(method_style.scope).newLine();	// add scope symbol
			add.tspan(' ');

			if (value.type !== 'any') {
				add.tspan(capitalizeFirst(value.type)).font(method_style.type);	// add returned value type if needed
				add.tspan(' ');
			}
			add.tspan(value.name).font(method_style.name);	// add method name
			add.tspan(' ');

			if (value.args) {	// if method has arguments

				add.tspan('(').font(method_style.name);		// open the bracket

				for (let arg in value.args) {
					// get one argument

					let argument = value.args[arg];
					let arg_style = attr_style;

					add.tspan(argument.name)	// add argument name
						.font(arg_style.name)
						.font(method_style.passed)	// override the style with special style for passed argument
						.newLine()	// each passed argument should start with newline
						.dx(20);	// ident
					
					if (argument.type !== 'any') {
						add.tspan(' : ').font(method_style.passed);
						add.tspan(capitalizeFirst(argument.type))	// add argument data type
							.font(arg_style.type)
							.font(method_style.passed);
					}

					if (argument.value !== '') {
						add.tspan(' ').font(method_style.passed);
						add.tspan('=').font(arg_style.symbol).font(method_style.passed);	// add '='
						add.tspan(' ').font(method_style.passed);;

						if (argument.type === 'string') {	// add default value just like we do it in attributes

							add.tspan('"' + argument.value + '"')
								.font(merge(arg_style.value.common, arg_style.value.string))
								.font(method_style.passed);

						} else if (argument.type === 'int') {

							add.tspan(argument.value)
								.font(merge(arg_style.value.common, arg_style.value.integer))
								.font(method_style.passed);

						} else {

							add.tspan(argument.value)
								.font(arg_style.value.common)
								.font(method_style.passed);
						}

					}

					if (arg < value.args.length - 1) {
						add.tspan(',')
							.font(arg_style.common)
							.font(method_style.passed);
					} else {
						add.tspan(')').font(method_style.name);
					}
				}

			} else {
				// otherwise just close the method with ()
				add.tspan('()').font(method_style.name);
			}
		}
	}).font(method_style.common);
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
	}
}

function capitalizeFirst(word) {
	console.log(word);
	return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}