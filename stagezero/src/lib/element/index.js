'use strict';

// Everything needed to construct an element

import {convertElementStyle} from './style';
import {prepareText} from './text';
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

export function applyBlueprint(blueprint) {
	var checked_blueprint = fillBlueprint(blueprint);

	let id = getHash();

	let style = convertElementStyle(checked_blueprint.style || {});
	let padding = style.additional_style.padding;

	let text = prepareText(checked_blueprint.text);

	style.text_style['anchor'] = 'start';	// needed for class diagram

	let name_label = this.text(text.name)
		.font(style.text_style)
		.attr('id', getId('name-label', id));

	if (text.attributes && text.methods) {

		var attributes_label = this.text(text.attributes)
			.font(style.text_style)
			.attr('id', getId('attributes-label', id));

		var methods_label = this.text(text.methods)
			.font(style.text_style)
			.attr('id', getId('methods-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				attributes_label.bbox().w,
				methods_label.bbox().w
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				attributes_label.bbox().h + 
				padding.h + 
				methods_label.bbox().h +
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		attributes_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

		methods_label.move(
			padding.w,
			attributes_label.bbox().y2 + padding.h
		);

	} else if (text.attributes) {

		var attributes_label = this.text(text.attributes)
			.font(style.text_style)
			.attr('id', getId('attributes-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				attributes_label.bbox().w,
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				attributes_label.bbox().h + 
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		attributes_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

	} else if (text.methods) {

		var methods_label = this.text(text.methods)
			.font(style.text_style)
			.attr('id', getId('methods-label', id));

		var rect_size = {
			w: Math.max(
				name_label.bbox().w,
				methods_label.bbox().w
			) + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h +
				methods_label.bbox().h +
				padding.h
		};

		name_label.font({
			'anchor': 'middle',
			'weight': 'bold'})
			.move(rect_size.w / 2, padding.h);

		methods_label.move(
			padding.w,
			name_label.bbox().y2 + padding.h
		);

	} else {
		var rect_size = {
			w: name_label.bbox().w + padding.w * 2,

			h: padding.h + 
				name_label.bbox().h + 
				padding.h
		};

	}

	let rect = this.rect(rect_size.w, rect_size.h)
		.attr(style.rect_style)
		.move(0, 0)
		.attr('id', getId('rectangle', id));

	rect.back();

	this.move(checked_blueprint.position.x, checked_blueprint.position.y);
	this.attr({
		'id': getId('ClassDiagramNode', id),
		'cursor': 'pointer'
	});

	return this;
}
