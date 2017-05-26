'use strict';

// element text processing

export function prepareText(element_text) {

	// split text to something like `+ variable : int = 0;`, which is used in UML
	
	var prepared_attributes = element_text.attributes.map(function (attribute) {

		return [
			getScopeSymbol(attribute.scope),
			attribute.name,
			(attribute.type === 'any') ? '' : ': ' + attribute.type
		].join(' ') + 
			((attribute.value !== '') ? [' =', attribute.value].join(' ') : '');
	})

	var prepared_methods = element_text.methods.map(function (method) {
		return [
			getScopeSymbol(method.scope),
			(method.type === 'any') ? '' : method.type,
			method.name + '()'
		].join(' ');
	})

	return {
		name: element_text.name,
		attributes: prepared_attributes.join('\n'),
		methods: prepared_methods.join('\n')
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
	}
}
