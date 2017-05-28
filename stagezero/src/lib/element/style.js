'use strict';

// convert CSS-like style to SVG-like

export function convertElementStyle(passed_style) {
	let converted_style = Object.assign({}, passed_style);

	let additional_style = {
		padding: Object.assign({}, converted_style.rect_style.padding)
	}

	converted_style.additional_style = additional_style;
	// delete converted_style.rect_style.padding;

	return converted_style;
}
