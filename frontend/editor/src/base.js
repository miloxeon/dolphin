'use strict';

// entry point
// todo errors

require('./css/style.css');
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';

let diagram = draw.classDiagram();
let model = Object.assign({}, mock_model);

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			redrawConnections();
		})

		child.on('mouseup', function () {
			model = moveController(this, model);
			rebuild();
		});
	});
}

function redrawConnections() {
	diagram.children().forEach(function (child) {
		if (child.getType() === 'Connection') {
			child.redraw();
		}
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
