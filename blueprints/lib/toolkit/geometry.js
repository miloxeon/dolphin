'use strict';

export function checkIfInside(rendered_element, dot_coordinates) {
	var x = dot_coordinates[0];
	var y = dot_coordinates[1];

	var bbox = rendered_element.tester();

	return (x > bbox.x) && 
		(x < bbox.x2) && 
		(y > bbox.y) && 
		(y < bbox.y2);
}

export function defineRelativePosition(rendered_element_1, rendered_element_2) {
	// how element_2 relates to element_1

	var bbox_1 = rendered_element_1.tester();
	var bbox_2 = rendered_element_2.tester();

	// more is rigter
	var horizontal_offset = bbox_2.x - bbox_1.x;

	// more is lower
	var vertical_offset = bbox_2.y - bbox_1.y;

	var sectors = [];

	var bbox_2_relative_x = bbox_2.x - bbox_1.cx;
	var bbox_2_relative_y = bbox_2.y - bbox_1.cy;

	sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x, bbox_2.y));	// top left
	sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x2, bbox_2.y));	// top right
	sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x, bbox_2.y2));	// bottom left
	sectors.push(defineDotRelativePosition(bbox_1, bbox_2.x2, bbox_2.y2));	// bottom right

	var unique_sectors = []

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

function defineDotRelativePosition(bbox, x, y) {

	var relative_x = Math.abs(bbox.cx - x);
	var relative_y = Math.abs(bbox.cy - y);


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

