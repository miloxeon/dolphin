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
			diagram.fire('redraw');
		})

		child.on('dragend', function () {
			diagram.fire('rebuild', {
				new_model: moveController(this, model)
			});
		});
	});
}

diagram.on('redraw', diagram.redrawConnections);

diagram.on('rebuild', function (e) {
	model = e.detail.new_model;
	rebuild();
});

function build(model) {
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build(model);
}

build(model);
