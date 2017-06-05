'use strict';

// entry point
// todo errors

require('./css/style.css');
import {createStore} from 'redux';
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection} from './actions';

let diagram = draw.classDiagram();
let model = clone(mock_model);
let store = createStore(modelReducer);

build();

diagram.on('redraw', diagram.redrawConnections);

diagram.on('rebuild', function (e) {
	store.dispatch({
		type: 'ALTER_MODEL',
		payload: e.detail.new_model
	})
	rebuild();
});

module.exports = {
	addElement: _addElement,
	removeElement: _removeElement,
	addConnection: _addConnection,
	removeConnection: _removeConnection,
	getModel
}
 
function _addElement(blueprint) {
	store.dispatch({
		type: 'ADD_ELEMENT',
		payload: blueprint
	});
}

function _removeElement(id) {
	store.dispatch({
		type: 'REMOVE_ELEMENT',
		payload: id
	});
}

function _addConnection(blueprint) {
	store.dispatch({
		type: 'ADD_CONNECTION',
		payload: blueprint
	});
}

function _removeConnection(id) {
	store.dispatch({
		type: 'REMOVE_CONNECTION',
		payload: id
	});
}


function modelReducer(state = model, action) {
	switch (action.type) {

		case 'ADD_ELEMENT':
			return addElement(state, action.payload);

		case 'REMOVE_ELEMENT':
			return removeElement(state, action.payload);

		case 'ADD_CONNECTION':
			return addConnection(state, action.payload);

		case 'REMOVE_CONNECTION':
			return removeConnection(state, action.payload);

		case 'ALTER_MODEL':
			return alterModel(state, action.payload);

		default:
			return state;
	}
}

function getModel () {
	return store.getState();
}

function alterModel(model, new_model) {
	return clone(new_model);
}

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

function build() {
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build();
}
