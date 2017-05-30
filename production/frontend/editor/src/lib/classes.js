'use strict';

// classes declarations

let SVG = require('svg.js');
let draggy = require('svg.draggy.js');
import {getHash} from './tools';

export let draw = SVG('diagram');

// diagram
import {
	setId as setId_diagram,
	clear,
	fromModel,
	getNodeById,
} from './diagram';

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		setId: setId_diagram,
		clear: clear,
		fromModel: fromModel,
		getNodeById: getNodeById,
		getType: function () {
			return 'Diagram';
		}
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.addClass('dolphin_diagram dolphin_diagram-class')
				.setId(getHash())
				.move(0, 0);
		}
	}
});


// element
import {
	applyBlueprint,
	getSocketCoords,
	setRichText,
	drawBorder,
	reset,
	setId as setId_element,
	getRect,
	getNameLabel,
	getTypeLabel,
	getAttributesLabel,
	getMethodsLabel,
	clear as clear_element
} from './element';

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		x2: function() {
			return this.x() + this.getRect().width();
		},
		y2: function () {
			return this.y() + this.getRect().height();
		},
		setRichText: setRichText,
		drawBorder: drawBorder,
		reset: reset,
		applyBlueprint: applyBlueprint,
		socket: getSocketCoords,
		setId: setId_element,
		getRect: getRect,
		getNameLabel: getNameLabel,
		getTypeLabel: getTypeLabel,
		getAttributesLabel: getAttributesLabel,
		getMethodsLabel: getMethodsLabel,
		clear: clear_element,
		getType: function () {
			return 'DiagramNode';
		},
		blueprint: null,
		style: null,
		richText: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.addClass('dolphin_node')
				.draggy();
		}
	}
});


// connection
import {
	applyBlueprint as applyBlueprint_connection,
	connectSockets,
	connectDots,
	redraw,
	clear as clear_connection,
	setRichText as setRichText_connection,
	setId as setId_connection,
	displayLineText
} from './connection';

SVG.Connection = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyBlueprint: applyBlueprint_connection,
		connectSockets: connectSockets,
		connectDots: connectDots,
		redraw: redraw,
		clear: clear_connection,
		setId: setId_connection,
		setRichText: setRichText_connection,
		displayLineText: displayLineText,
		getType: function () {
			return 'Connection';
		},
		blueprint: null
	},
	construct: {
		connection: function (blueprint) {
			return this.put(new SVG.Connection)
				.applyBlueprint(blueprint);
		}
	}
});
