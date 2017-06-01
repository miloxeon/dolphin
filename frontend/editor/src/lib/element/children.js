'use strict';
// todo errors

export function getRect() {
	return findChildElement(this, 'rectangle');
}

export function getNameLabel() {
	return findChildElement(this, 'name-label');
}

export function getTypeLabel() {
	return findChildElement(this, 'type-label');
}

export function getAttributesLabel() {
	return findChildElement(this, 'attributes-label');
}

export function getMethodsLabel() {
	return findChildElement(this, 'methods-label');
}

function findChildElement(parent, type) {
	let children = findChildElements(parent, type);
	
	if (children.length === 1) {
		return children[0];
	} else if (children.length > 1) {
		throw new RangeError('Parent ' + parent.attr('id').split('_')[0] + ' has more than one ' + type);
	}
}

function findChildElements(parent, type) {
	let children = [];

	parent.children().forEach(function (child) {
		if (child.attr('id').split('_')[0] === type) {
			children.push(child);
		}
	});

	return children;
}
