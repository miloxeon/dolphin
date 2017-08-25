'use strict';

// entry point

require('./css/style.css');
import {createStore} from 'redux';
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {clone} from './lib/tools';
import {reducer} from './reducer';

let diagram = draw.classDiagram();
let model = clone(mock_model);
let store = createStore(reducer, model);

rebuild();
store.subscribe(rebuild);

diagram.on('redraw', diagram.redrawConnections);

diagram.on('rebuild', function (e) {
	store.dispatch({
		type: 'MOVE',
		payload: e.detail.node
	});
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
