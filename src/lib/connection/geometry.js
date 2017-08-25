'use strict';

import {checkElement, checkPos, checkBbox} from './errors';

export function checkOverlap(elem_1, elem_2) {
	if (checkElement(elem_1)) throw checkElement(elem_1);
	if (checkElement(elem_2)) throw checkElement(elem_2);

	let bbox_1 = getFakeBbox(elem_1);
	let bbox_2 = getFakeBbox(elem_2);

	return (checkIfInside(elem_1, {x: bbox_2.x, y: bbox_2.y}) ||
			checkIfInside(elem_1, {x: bbox_2.x2, y: bbox_2.y}) || 
			checkIfInside(elem_1, {x: bbox_2.x, y: bbox_2.y2}) ||
			checkIfInside(elem_1, {x: bbox_2.x2, y: bbox_2.y2}) ||
			checkIfInside(elem_1, {x: bbox_2.cx, y: bbox_2.cy}));

}

export function checkIfInside(elem, pos) {

	if (checkElement(elem)) throw checkElement(elem);
	if (checkPos(pos)) throw checkPos(pos);

	let x = pos.x;
	let y = pos.y;
	let bbox = getFakeBbox(elem);

	return (x > bbox.x) && 
		(x < bbox.x2) && 
		(y > bbox.y) && 
		(y < bbox.y2);
}

function getFakeBbox(elem) {
	// get fake bbox for the element (because the element is <g> and it's have no geometry by defaut)
	if (checkElement(elem)) throw checkElement(elem);

	return {
		x: elem.x(),
		y: elem.y(),
		cx: elem.cx(),
		cy: elem.cy(),
		x2: elem.x() + Math.abs((elem.x() - elem.cx()) * 2),
		y2: elem.y() + Math.abs((elem.y() - elem.cy()) * 2),
		w: Math.abs((elem.x() - elem.cx()) * 2),
		h: Math.abs((elem.y() - elem.cy()) * 2)
	}
	// return elem.getRect().bbox();
}

export function defineSockets(elem_1, elem_2) {
	// define which sockets of elem_1 and elem_2 should be connected
	let sectors = defineRelativePosition(elem_1, elem_2);

	let decision_matrix = {
		'1': '24',
		'2': '54',
		'3': '54',
		'4': '74',
		'5': '75',
		'6': '45',
		'7': '45',
		'8': '25',
		'12': '24',
		'23': '54',
		'34': '74',
		'45': '72',
		'56': '75',
		'67': '45',
		'78': '25',
		'18': '27',
		'123': '54',
		'234': '54',
		'345': '72',
		'456': '72',
		'567': '45',
		'678': '45',
		'178': '27',
		'128': '27',
		'1234': '54',
		'2345': '72',
		'3456': '72',
		'4567': '75',
		'5678': '45',
		'1678': '25',
		'1278': '27',
		'1238': '24'
	}

	return decision_matrix[sectors] ? decision_matrix[sectors].split('').map((e) => parseInt(e)) : null;
}

function defineRelativePosition(elem_1, elem_2) {
	// define how element_2 relates to element_1 (sectors)
	 
	if (checkElement(elem_1)) throw checkElement(elem_1);
	if (checkElement(elem_2)) throw checkElement(elem_2);

	let bbox_1 = getFakeBbox(elem_1);
	let bbox_2 = getFakeBbox(elem_2);
	// more is rigter
	let horizontal_offset = bbox_2.x - bbox_1.x;

	// more is lower
	let vertical_offset = bbox_2.y - bbox_1.y;

	let sectors = [];

	let bbox_2_relative_x = bbox_2.x - bbox_1.cx;
	let bbox_2_relative_y = bbox_2.y - bbox_1.cy;

	sectors.push(defineDotRelativePosition(bbox_1, {x: bbox_2.x, y: bbox_2.y}));	// top left
	sectors.push(defineDotRelativePosition(bbox_1, {x: bbox_2.x2, y: bbox_2.y}));	// top right
	sectors.push(defineDotRelativePosition(bbox_1, {x: bbox_2.x, y: bbox_2.y2}));	// bottom left
	sectors.push(defineDotRelativePosition(bbox_1, {x: bbox_2.x2, y: bbox_2.y2}));	// bottom right

	let unique_sectors = []

	sectors.forEach(function (sector) {
		if (unique_sectors.indexOf(sector) == -1) {
			unique_sectors.push(sector);
		}
	})

	unique_sectors.sort(function (a, b) {
		return a - b;
	});

	return unique_sectors.join('');
}

function defineDotRelativePosition(bbox, pos) {
	// define the sector in which the dot with coordinates x and y situated relatively to some bbox
	if (checkBbox(bbox)) throw checkBbox(bbox);
	if (checkPos(pos)) throw checkPos(pos);

	let x = pos.x;
	let y = pos.y;

	let relative_x = Math.abs(bbox.cx - x);
	let relative_y = Math.abs(bbox.cy - y);

	if (x >= bbox.cx) {
		// righter: sectors 1, 2, 3, 4

		if (y <= bbox.cy) {
			// above: sectors 1 or 2

			if (relative_x >= relative_y) {
				// sector 2
				return 2;
			} else {
				// sector 1
				return 1;
			}

		} else {
			// under: sectors 3 or 4

			if (relative_x >= relative_y) {
				// sector 3
				return 3;
			} else {
				// sector 4
				return 4;
			}
		}

	} else {
		// lefter: sectors 5, 6, 7, 8

		if (y <= bbox.cy) {
			// above: sectors 7 or 8

			if (relative_x >= relative_y) {
				// sector 7
				return 7;
			} else {
				// sector 8
				return 8;
			}

		} else {
			// under: sectors 5 or 6

			if (relative_x >= relative_y) {
				// sector 6
				return 6;
			} else {
				// sector 5
				return 5;
			}
		}
	}
}
