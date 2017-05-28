'use strict';

import {getHash} from './tools';
import {
	applyBlueprint,
	getSocketCoords,
	setRichText,
	drawBorder,
	refreshTheme,
	setId as setId_element,
	getRect,
	getNameLabel,
	getTypeLabel,
	getAttributesLabel,
	getMethodsLabel
} from './element';

import {
	applyBlueprint as applyBlueprint_connection,
	connectSockets,
	connectDots
} from './connection';

import {
	applyTheme,
	setId as setId_diagram,
	clear,
	fromModel,
	getNodeById
} from './diagram';

export let draw = SVG('diagram');

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
		refreshTheme: refreshTheme,
		applyBlueprint: applyBlueprint,
		socket: getSocketCoords,
		setId: setId_element,
		getRect: getRect,
		getNameLabel: getNameLabel,
		getTypeLabel: getTypeLabel,
		getAttributesLabel: getAttributesLabel,
		getMethodsLabel: getMethodsLabel,
		blueprint: null,
		style: null,
		richText: null
	},
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.draggy();
		}
	}
});

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyTheme: applyTheme,
		setId: setId_diagram,
		clear: clear,
		fromModel: fromModel,
		getNodeById: getNodeById
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.applyTheme(theme)
				.addClass('class_diagram')
				.setId(getHash())
				.move(0, 0);
		}
	}
});

SVG.Connection = SVG.invent({
	create: 'path',
	inherit: SVG.Path,
	extend: {
		applyBlueprint: applyBlueprint_connection,
		connectSockets: connectSockets,
		connectDots: connectDots,
		blueprint: null
	},
	construct: {
		connection: function (blueprint) {
			return this.put(new SVG.Connection)
				.applyBlueprint(blueprint);
		}
	}
});
