'use strict';

// element text processing

var merge = require('deepmerge');

export function addAttributes(element, text, style) {
	// + foo : int = "bar"
	// 
	let attr_style = style.attribute;

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];

			add.tspan(getScopeSymbol(value.scope)).font(attr_style.scope).newLine();

			add.tspan(' ');

			add.tspan(value.name + ' ').font(attr_style.name);

			if (value.type !== 'any') {
				add.tspan(' : ');
				add.tspan(value.type + ' ').font(attr_style.type);
			}


			if (value.value) {

				add.tspan('= ').font(attr_style.symbol);

				if (value.type === 'string') {

					add.tspan('"' + value.value + '"').font(merge(attr_style.value.common, attr_style.value.string));

				} else if (value.type === 'int') {

					add.tspan(value.value).font(merge(attr_style.value.common, attr_style.value.integer));

				} else {

					add.tspan(value.value).font(attr_style.value.common);
				}
			}
		}
	}).font(attr_style.common);
}

export function addMethods(element, text, style) {
	// - string getFoo(
	// 		bar: int,
	// 		foo: string = "hello")
	let method_style = style.method;
	let attr_style = style.attribute;

	return element.text(function (add) {
		for (let name in text) {
			let value = text[name];

			add.tspan(getScopeSymbol(value.scope)).font(method_style.scope).newLine();

			add.tspan(' ');

			if (value.type !== 'any') {
				add.tspan(value.type + ' ').font(method_style.type);
			}

			add.tspan(value.name + ' ').font(method_style.name);

			if (value.args) {

				add.tspan('(').font(method_style.name);

				for (let arg in value.args) {

					let argument = value.args[arg];
					let arg_style = attr_style;

					add.tspan(argument.name)
						.font(arg_style.name)
						.font(method_style.passed)
						.newLine()
						.dx(20);
					
					if (argument.type !== 'any') {
						add.tspan(' : ').font(method_style.passed);
						add.tspan(argument.type)
							.font(arg_style.type)
							.font(method_style.passed);
					}

					if (argument.value !== '') {
						add.tspan(' ').font(method_style.passed);;
						add.tspan('=').font(arg_style.symbol).font(method_style.passed);
						add.tspan(' ').font(method_style.passed);;

						if (argument.type === 'string') {

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
						add.tspan(', ')
							.font(arg_style.common)
							.font(method_style.passed);
					} else {
						add.tspan(')').font(method_style.name);
					}
				}

			} else {
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
