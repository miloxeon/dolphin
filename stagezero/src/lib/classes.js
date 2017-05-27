'use strict';

import {applyBlueprint, getSocketCoords, setRichText, drawBorder, applyTheme as applyTheme_element} from './element';
import {applyTheme as applyTheme_diagram} from './diagram';

export let draw = SVG('diagram');

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		applyTheme: applyTheme_diagram
	},
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.applyTheme(theme)
				.addClass('class_diagram')
				.move(0, 0);
		}
	}
});

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: {
		setRichText: setRichText,
		drawBorder: drawBorder,
		applyTheme: applyTheme_element,
		applyBlueprint: applyBlueprint,
		socket: getSocketCoords,
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

SVG.Connection = SVG.invent({
	create: 'path',
	inherit: SVG.Path,
	extend: {
		connect: function (blueprint) {
			return this;
		},
		applyBlueprint: function (blueprint) {
			return this;
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
