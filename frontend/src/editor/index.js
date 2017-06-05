'use strict';

// entry point
// todo errors

require('./css/style.css');
let Gun = require('gun');
import {createStore} from 'redux';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import {clone} from './lib/tools';
import {addElement, removeElement, addConnection, removeConnection, move} from './actions';


var peers = ['http://localhost:8080/gun'];
var gun = Gun(peers);
var storage = gun.get('model');

var store;
var diagram = draw.classDiagram();

storage.val(function (data) {
	store = createStore(modelReducer, JSON.parse(data.fixtures));

	build();

	diagram.on('redraw', diagram.redrawConnections);
	diagram.on('rebuild', function (e) {
		store.dispatch({
			type: 'MOVE',
			payload: e.detail.node
		});
	});

	store.subscribe(() => {
		rebuild();
		storage.get('fixtures').put(JSON.stringify(store.getState()));
	})
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

		case 'REPLACE':
			return replaceStore(state, action.payload)

		default:
			return state;
	}
}

function replaceStore(state, action) {
	return clone(action);
}

function getModel () {
	return store.getState();
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
