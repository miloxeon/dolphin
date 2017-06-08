'use strict';

import {computeRectSize} from './geometry';
import {getId, getRawId} from '../tools';
// todo errors

export function drawBorder() {
	let id = getRawId(this.attr('id'));
	var rect = this.getRect();
	var rect_size = computeRectSize(this);
	
	if (rect) {

		rect.size(rect_size.w, rect_size.h);

	} else {
		rect = this.rect(rect_size.w, rect_size.h)
			.move(0, 0)
			.attr('id', getId('rectangle', id))
			.addClass('dolphin_rect');
	}
	rect.back();

	return this;
}
