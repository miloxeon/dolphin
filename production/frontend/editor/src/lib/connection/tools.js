'use strict';

export function invertDirection(direction) {
	switch (direction) {
		case 'top': return 'bottom';
		case 'bottom': return 'top';
		case 'left': return 'right';
		case 'right': return 'left';
		default:
			// error
	}
}
