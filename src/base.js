'use strict';

// entry point

require('./css/style.css');
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {clone, getRawId} from './lib/tools';
import {Store} from './store';

let diagram = draw.classDiagram();
let model = clone(mock_model);
let store = new Store(model);
store.onUpdate = rebuild;

rebuild();

diagram.on('redraw', diagram.redrawConnections);
diagram.on('rebuild', function (e) {
	let new_state = move(store.getState(), e.detail.node);
	store.setState(new_state);
});

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
		})

		child.on('dragend', function () {

			diagram.fire('rebuild', {
				node: this
			});
		});
	});
}

function rebuild() {
	diagram.clear();
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

function move(model, node) {
	let new_model = clone(model);
	let node_id = getRawId(node.attr('id'));
	let new_coords = {
		x: node.x(),
		y: node.y()
	}
	
	new_model.elements.forEach(function (elem) {
		if (elem.id === node_id) {
			elem.position = new_coords;
		}
	});

	return new_model;
}

module.exports = {
	store
}
