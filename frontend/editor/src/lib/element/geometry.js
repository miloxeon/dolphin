'use strict';
// todo errors

import config from '../config';

export function x2() {
	return this.x() + this.getRect().width();
}

export function y2() {
	return this.y() + this.getRect().height();
}

export function computeRectSize(element) {
	let name_label = element.getNameLabel();
	let type_label = element.getTypeLabel();
	let attributes_label = element.getAttributesLabel();
	let methods_label = element.getMethodsLabel();

	let padding = {
		w: parseInt(config['padding-w']),
		h: parseInt(config['padding-h'])
	};

	let actual_padding = padding;

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

	let width = Math.max(
		name_label ? name_label.bbox().w : 0,
		type_label ? type_label.bbox().w : 0,
		attributes_label ? attributes_label.bbox().w : 0,
		methods_label ? methods_label.bbox().w : 0
	) + actual_padding.w * 2;

	let height = (
		(name_label ? name_label.bbox().h : 0) +
		(type_label ? type_label.bbox().h : 0) +
		(attributes_label ? attributes_label.bbox().h : 0) +
		(methods_label ? methods_label.bbox().h : 0)
	) + actual_padding.h * 2;	// top and bottom padding

	if (attributes_label) {	// name label is always there, type label doesn't require to be spaced
		height += padding.h;
	}

	if (methods_label) {
		height += padding.h
	}

	return {
		w: width,
		h: height
	}
}
