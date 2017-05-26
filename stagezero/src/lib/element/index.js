'use strict';

// Everything needed to construct an element

import {convertElementStyle} from './style';
import {prepareText} from './text';
import {fillBlueprint} from './blueprint';

export function applyBlueprint(blueprint) {
	var checked_blueprint = fillBlueprint(blueprint);

	let style = convertElementStyle(checked_blueprint.style || {});
	let padding = style.additional_style.padding;

	let text = prepareText(checked_blueprint.text);

	style.text_style['anchor'] = 'start';	// needed for class diagram

	let name_label = this.text(text.name)
		.font(style.text_style);

	if (text.attributes && text.methods) {

		var attributes_label = this.text(text.attributes)
			.font(style.text_style);

		var methods_label = this.text(text.methods)
			.font(style.text_style);

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

		var attributes_label = this.text(text.attributes).font(style.text_style);
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

		var methods_label = this.text(text.methods).font(style.text_style);
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
		.move(0, 0);

	rect.back();

	this.move(checked_blueprint.position.x, checked_blueprint.position.y);

	return this;
}
