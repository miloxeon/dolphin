'use strict';
// todo errors

export function socket(number) {

	switch (number) {
		case 1: return {x: this.x(), y: this.y()};		// top left
		case 2: return {x: this.cx(), y: this.y()};		// top center
		case 3: return {x: this.x2(), y: this.y()};		// top right

		case 4: return {x: this.x(), y: this.cy()};		// middle left
		case 5: return {x: this.x2(), y: this.cy()};	// middle right

		case 6: return {x: this.x(), y: this.y2()};		// bottom left
		case 7: return {x: this.cx(), y: this.y2()};	// bottom center
		case 8: return {x: this.x2(), y: this.y2()};	// bottom right

		default:
			throw new RangeError('Wrong socket number (must be from 1 to 8)');
	}
}
