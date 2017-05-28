'use strict';

import {element_blueprints, connection_blueprints} from './fixtures';
import {draw} from './lib/classes';
import {dragController} from './lib/controllers';

let diagram = draw.classDiagram();

let model = element_blueprints;

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		child.on('mouseup', function () {
			model = dragController(this, model);
			rebuild();
		});
	});
}

function build(model) {
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build(model);
}

build(model);

// connection_blueprints.forEach(function (blueprint) {
// 	diagram.connection(blueprint);
// });
// 
