'use strict';

// entry point

require('./css/style.css');
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {clone} from './lib/tools';
import {Store} from './store';

let diagram = draw.classDiagram();
let model = clone(mock_model);
let store = new Store(model);
store.subscribe(rebuild);

rebuild();

diagram.on('redraw', diagram.redrawConnections);
diagram.on('rebuild', function (e) {
	let new_state = move(store.getState(), e.detail.node);
	store.setState(new_state);
});

function rebuild() {
	diagram.clear();
	diagram.fromModel(store.getState());
}

module.exports = {
	store
}
