'use strict';

// classes declarations

let SVG = require('svg.js');
let draggy = require('svg.draggy.js');

import {getHash} from './tools';

import extends_element from './element';
import extends_connection from './connection';
import extends_diagram from './diagram';

SVG.ClassDiagram = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: extends_diagram,
	construct: {
		classDiagram: function (theme) {
			return this.put(new SVG.ClassDiagram)
				.addClass('dolphin_diagram dolphin_diagram-class')
				.setId(getHash())
				.move(0, 0);
		}
	}
});

SVG.ClassDiagramNode = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: extends_element,
	construct: {
		classDiagramNode: function (blueprint) {
			return this.put(new SVG.ClassDiagramNode)
				.applyBlueprint(blueprint)
				.addClass('dolphin_node')
				.draggy();
		}
	}
});

SVG.Connection = SVG.invent({
	create: 'g',
	inherit: SVG.G,
	extend: extends_connection,
	construct: {
		connection: function (blueprint) {
			return this.put(new SVG.Connection)
				.applyBlueprint(blueprint)
				.addClass('dolphin-connection');
		}
	}
});

export let draw = SVG('diagram');
