'use strict';

// methods for computing element's geometry

export function computeRectSize(rendered_label, style) {
	return {
		w: rendered_label.bbox().w + 
			style.additional_style.text_offset.x * 2 +
			style.rect_style['stroke-width'],

		h: rendered_label.bbox().h + 
			style.additional_style.text_offset.y * 2 + 
			style.rect_style['stroke-width'] 
	}
}

export function computeTextPosition(rendered_label, style) {

	var text_offset = style.additional_style.text_offset;
	var stroke_offset = style.rect_style['stroke-width'] / 2;

	return {
		x: text_offset.x + stroke_offset + 
			computeAnchorOffset(rendered_label, style.text_style.anchor),

		y: text_offset.y + stroke_offset
	}
}

function computeAnchorOffset(rendered_label, anchor) {
	switch (anchor) {
		case 'start':
			return 0;
			break;

		case 'middle':
			return rendered_label.bbox().w / 2;
			break;

		case 'end':
			return rendered_label.bbox().w;
			break;

		default:
			// error
			break;
	}
}
