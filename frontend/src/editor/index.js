'use strict';

// entry point
// todo errors

require('./css/style.css');
import {createStore} from 'redux';
import {model as mock_model} from './fixtures';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone, getRawId} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection} from './actions';

var store;
var diagram = draw.classDiagram();

function init(model) {
	store = createStore(modelReducer, model);

	build();
	store.subscribe(rebuild);

	diagram.on('redraw', diagram.redrawConnections);
	diagram.on('rebuild', function (e) {
		store.dispatch({
			type: 'MOVE',
			payload: e.detail.node
		});
	});
}

module.exports = {
	addElement: _addElement,
	removeElement: _removeElement,
	addConnection: _addConnection,
	removeConnection: _removeConnection,
	getModel,
	init
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


function modelReducer(state, action) {
	switch (action.type) {

		case 'ADD_ELEMENT':
			return addElement(state, action.payload);

		case 'REMOVE_ELEMENT':
			return removeElement(state, action.payload);

		case 'ADD_CONNECTION':
			return addConnection(state, action.payload);

		case 'REMOVE_CONNECTION':
			return removeConnection(state, action.payload);

		case 'MOVE':
			return move(state, action.payload);

		default:
			return state;
	}
}

function getModel () {
	return store.getState();
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

function build() {
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build();
}
