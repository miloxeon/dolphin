'use strict';

import config from '../config';
import {checkLineFunction, checkType, checkLine} from './errors';

export function defineMarker(type = config['default-connection-type']) {
	if (checkType(type)) throw checkType(type);
	switch (type) {
		case 'association': return generateMockMarker(drawUnfilledArrow);
		case 'association-bidi': return blank;

		case 'inheritance': return generateMockMarker(drawFilledArrow);
		case 'implementation': return generateMockMarker(drawFilledArrow);
		case 'dependency': return generateMockMarker(drawUnfilledArrow);

		case 'aggregation': return function (line, isReverse) {
			drawUnfilledArrow(line, isReverse);
			drawUnfilledDiamond(line, !isReverse);
			return line;
		}

		case 'composition': return function (line, isReverse) {
			drawUnfilledArrow(line, isReverse);
			drawFilledDiamond(line, !isReverse);
			return line;
		}

		default:
			throw new RangeError('Unknown connection type: ' + type);
	}
}

function generateMockMarker(initial_function) {
	if (checkLineFunction(initial_function)) throw checkLineFunction(initial_function);

	return function(line, isReverse) {
		initial_function(line, isReverse);
		blank(line, !isReverse);
		return line;
	}
}

function blank(line, isReverse) {
	if (checkLine(line)) throw checkLine(line);
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.rect(24, 24).center(13, 13).fill('transparent');
	});
	return line;
}

function drawUnfilledArrow(line, isReverse) {
	if (checkLine(line)) throw checkLine(line);
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,2 L0,4').addClass('dolphin_line_marker dolphin_line_marker-arrow')
			.attr('transform-origin', '2 0').move(9, 11)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawFilledArrow(line, isReverse) {
	if (checkLine(line)) throw checkLine(line);
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,2 L0,4 z').addClass('dolphin_line_marker dolphin_line_marker-arrow_filled')
			.attr('transform-origin', '2 0').move(9, 11)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawUnfilledDiamond(line, isReverse) {
	if (checkLine(line)) throw checkLine(line);
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,3 L0,6 L-4,3 z').addClass('dolphin_line_marker dolphin_line_marker-diamond')
			.attr('transform-origin', '0 0').move(9, 10)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function drawFilledDiamond(line, isReverse) {
	let marker = line.marker(isReverse ? 'start' : 'end', 26, 26, function (add) {
		add.path('M0,0 L4,3 L0,6 L-4,3 z').addClass('dolphin_line_marker dolphin_line_marker-diamond_filled')
			.attr('transform-origin', '0 0').move(9, 10)
			.transform({'rotation': getDegrees(isReverse)})
	});

	return line;
}

function getDegrees(isReverse = false) {
	return isReverse ? 180 : 0;
}
