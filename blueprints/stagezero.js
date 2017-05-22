
// var c1 = rendered_elements[0].sockets[4].cx() + Math.abs((rendered_elements[0].sockets[4].cx() - rendered_elements[1].sockets[3].cx())) / 2;

// diagram.path(
// 	'M ' + 
// 	rendered_elements[0].sockets[4].cx().toString() + ' ' + 
// 	rendered_elements[0].sockets[4].cy().toString() + ' ' + 
// 	'C ' +
// 	c1.toString() + ' ' + 
// 	rendered_elements[0].sockets[4].cy().toString() + ' ' +
// 	c1.toString() + ' ' + 
// 	rendered_elements[1].sockets[3].cy().toString() + 
// 	' ' + 
// 	rendered_elements[1].sockets[3].cx().toString() + ' ' + 
// 	rendered_elements[1].sockets[3].cy().toString()
// ).attr({
// 	'stroke': 'black',
// 	'stroke-width': '1',
// 	'fill': 'none',
// 	'stroke-linecap': "round",
// 	'stroke-dasharray': "5,5"
// });




var connections = [];

rendered_elements[0].draggy();

setInterval(function () {
	_connectElements(rendered_elements[0], rendered_elements[1]);
	// console.log(rendered_elements[0].bbox().x, rendered_elements[0].bbox().y);


	setTimeout(function () {
		connections[0].remove();
		connections = [];
	}, 400);

}, 500);


function _connectElements(element_1, element_2) {

	var sectors = defineRelativePosition(element_2, element_1);
	console.log(sectors);

	// defaults
	var element_1_socket = 1;
	var element_2_socket = 2;

	if (sectors.length == 1) {

		switch (sectors[0]) {
			case 1:
				element_1_socket = 2;
				element_2_socket = 4;
				break;

			case 2:
			case 3:
				element_1_socket = 5;
				element_2_socket = 4;
				break;

			case 4:
				element_1_socket = 7;
				element_2_socket = 4;
				break;

			case 5:
				element_1_socket = 7;
				element_2_socket = 5;
				break;

			case 6:
			case 7:
				element_1_socket = 4;
				element_2_socket = 5;
				break;

			case 8:
				element_1_socket = 2;
				element_2_socket = 5;
				break;
		}

	} else if (sectors.length == 2) {
		// simple

		if (sectors == [1, 2]) {

			element_1_socket = 2;
			element_2_socket = 4;

		} else if (sectors == [2, 3]) {

			element_1_socket = 5;
			element_2_socket = 4;

		} else if (sectors == [3, 4]) {

			element_1_socket = 7;
			element_2_socket = 4;

		} else if (sectors == [4, 5]) {

			element_1_socket = 7;
			element_2_socket = 2;

		} else if (sectors == [5, 6]) {

			element_1_socket = 7;
			element_2_socket = 5;

		} else if (sectors == [6, 7]) {

			element_1_socket = 4;
			element_2_socket = 5;

		} else if (sectors == [7, 8]) {

			element_1_socket = 2;
			element_2_socket = 5;

		} else if (sectors == [1, 8]) {

			element_1_socket = 2;
			element_2_socket = 7;
		}

	} else if (sectors.length == 3) {
		// todo
	} else if (sectors.length == 4) {
		// todo
	} else {
		// error
	}


	var socket_1 = [element_1.sockets[element_1_socket - 1].cx(), element_1.sockets[element_1_socket - 1].cy()];
	var socket_2 = [element_2.sockets[element_2_socket - 1].cx(), element_2.sockets[element_2_socket - 1].cy()];

	var x_between_elements = socket_1[0] + Math.abs(socket_1[0] - socket_2[0]) / 2;

	connections.push(diagram.path(
		'M ' + 
		socket_1[0].toString() + ' ' + 
		socket_1[1].toString() + ' ' + 
		'C ' +
		x_between_elements.toString() + ' ' + 
		socket_1[1].toString() + ' ' +
		x_between_elements.toString() + ' ' + 
		socket_2[1].toString() + 
		' ' + 
		socket_2[0].toString() + ' ' + 
		socket_2[1].toString()
	).attr({
		'stroke': 'black',
		'stroke-width': '1',
		'fill': 'none',
		'stroke-linecap': "round",
		'stroke-dasharray': "5,5"
	}));

	

	function defineRelativePosition(element_1, element_2) {
		// how element_2 relates to element_1

		var bbox_1 = element_1.bbox();
		var bbox_2 = element_2.bbox();

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

		return unique_sectors;

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
}