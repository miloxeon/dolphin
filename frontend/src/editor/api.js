'use strict';

import store from './model';

function getModel() {
	return store.getState();
}

function addElement(blueprint) {
	store.dispatch({
		type: 'ADD_ELEMENT',
		payload: blueprint
	});
}

function removeElement(id) {
	store.dispatch({
		type: 'REMOVE_ELEMENT',
		payload: id
	});
}

function addConnection(blueprint) {
	store.dispatch({
		type: 'ADD_CONNECTION',
		payload: blueprint
	});
}

function removeConnection(id){
	store.dispatch({
		type: 'REMOVE_CONNECTION',
		payload: id
	});
}

module.exports = {
	getModel,
	addElement,
	removeElement,
	addConnection,
	removeConnection
}
