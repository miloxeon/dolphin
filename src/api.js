'use strict';

function getModel(store) {
	return store.getState();
}

function addElement(store, blueprint) {
	store.dispatch({
		type: 'ADD_ELEMENT',
		payload: blueprint
	});
}

function removeElement(store, id) {
	store.dispatch({
		type: 'REMOVE_ELEMENT',
		payload: id
	});
}

function addConnection(store, blueprint) {
	store.dispatch({
		type: 'ADD_CONNECTION',
		payload: blueprint
	});
}

function removeConnection(store, id) {
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
};
