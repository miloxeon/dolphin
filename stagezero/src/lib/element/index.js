'use strict';

// Everything needed to construct an element

import {convertElementStyle} from './style';
import {addAttributes, addMethods} from './text';
import {fillBlueprint} from './blueprint';
import {getHash, getId} from '../tools';


export function getSocketCoords(number) {

	let rect;

	this.children().forEach(function (child) {
		if (child.attr('id').split('_')[0] === 'rectangle') {
			rect = child;
		}
	});

	if (rect) {
		var bbox = rect.bbox();
	} else {
		throw new ReferenceError("Element's rectangle is not defined, couldn't attach sockets");
	}

	switch (number) {
		case 1: return {x: bbox.x, y: bbox.y};		// top left
		case 2: return {x: bbox.cx, y: bbox.y};		// top center
		case 3: return {x: bbox.x2, y: bbox.y};		// top right

		case 4: return {x: bbox.x, y: bbox.cy};		// middle left
		case 5: return {x: bbox.x2, y: bbox.cy};	// middle right

		case 6: return {x: bbox.x, y: bbox.y2};		// bottom left
		case 7: return {x: bbox.cx, y: bbox.y2};	// bottom center
		case 8: return {x: bbox.x2, y: bbox.y2};	// bottom right

		default:
			throw new RangeError('Wrong socket number (must be from 1 to 8)');
	}
}

export function setRichText() {
	let id = getRawId(this.attr('id'));
	let style = this.style;
	let text = this.richText;

	if (!text) {
		throw new EvalError("Couldn't apply rich text: no rich text set");
	}

	if (!style) {
		throw new EvalError("Couldn't apply rich text: no theme set");
	}

	let name_label = this.text(text.name)
		.font(style.text_style.common)
		.font(style.text_style.node.common)
		.font(style.text_style.node.name)
		.font('anchor', 'middle')
		.attr('id', getId('name-label', id));

	let type_label;
	let attributes_label;
	let methods_label;

	if (text.type !== 'normal') {
		type_label = this.text('<' + text.type + '>')
			.font(style.text_style.common)
			.font(style.text_style.node.common)
			.font(style.text_style.node.type)
			.font('anchor', 'middle')
			.attr('id', getId('type-label', id));
	}

	if (text.attributes) {
		attributes_label = addAttributes(this, text.attributes, style.text_style)
			.font(style.text_style.common)
			.attr('id', getId('attributes-label', id));
	}

	if (text.methods) {
		methods_label = addMethods(this, text.methods, style.text_style)
			.font(style.text_style.common)
			.attr('id', getId('methods-label', id));
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

export function drawBorder() {
	let id = getRawId(this.attr('id'));
	let style = this.style;
	let rect_size = computeRectSize(this);

	let rect = this.rect(rect_size.w, rect_size.h)
		.attr(style.rect_style)
		.move(0, 0)
		.attr('id', getId('rectangle', id));

	rect.back();
	return this;
}

export function applyTheme(theme) {
	this.style = convertElementStyle(theme || {});
	this.setRichText();
	this.drawBorder();
	return this;
}

export function applyBlueprint(blueprint) {
	var checked_blueprint = fillBlueprint(blueprint);
	let id = checked_blueprint.id;
	let style = checked_blueprint.style;
	
	this.richText = checked_blueprint.text;
	this.blueprint = checked_blueprint;

	this.applyTheme(style);
	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	this.attr({
		'id': getId('ClassDiagramNode', id),
		'cursor': 'pointer'
	});
	
	return this;
}

function getRawId(element_id) {
	return element_id.split('_')[1];
}

function computeRectSize(element) {
	let name_label = findChildElement(element, 'name-label');
	let type_label = findChildElement(element, 'type-label');
	let attributes_label = findChildElement(element, 'attributes-label');
	let methods_label = findChildElement(element, 'methods-label');

	let width = Math.max(
		name_label ? name_label.bbox().w : 0,
		type_label ? type_label.bbox().w : 0,
		attributes_label ? attributes_label.bbox().w : 0,
		methods_label ? methods_label.bbox().w : 0
	) + element.style.additional_style.padding.w * 2;

	let height = (
		(name_label ? name_label.bbox().h : 0) +
		(type_label ? type_label.bbox().h : 0) +
		(attributes_label ? attributes_label.bbox().h : 0) +
		(methods_label ? methods_label.bbox().h : 0)
	) + (
		(name_label ? 1 : 0) +
		(attributes_label ? 1 : 0) +
		(methods_label ? 1 : 0) + 1
	) * element.style.additional_style.padding.h;

	return {
		w: width,
		h: height
	}
}

function computeLabelOffsets(element) {
	let name_label = findChildElement(element, 'name-label');
	let type_label = findChildElement(element, 'type-label');
	let attributes_label = findChildElement(element, 'attributes-label');
	let methods_label = findChildElement(element, 'methods-label');
	
	let padding = element.style.additional_style.padding;
	let rect_size = computeRectSize(element);
	let offsets = {};

	let x_left = padding.w;
	let x_center = rect_size.w / 2;	
	let y_last = padding.h;

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
