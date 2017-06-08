'use strict';

function getModel(store) {
	return function () {
		return store.getState();
	}
}

function addElement(store) {
	return function (blueprint) {
		store.dispatch({
			type: 'ADD_ELEMENT',
			payload: blueprint
		});
	}
}

function removeElement(store) {
	return function (id) {
		store.dispatch({
			type: 'REMOVE_ELEMENT',
			payload: id
		});
	}
}

function addConnection(store) {
	return function (blueprint) {
		store.dispatch({
			type: 'ADD_CONNECTION',
			payload: blueprint
		});
	}
}

function removeConnection(store) {
	return function (id) {
		store.dispatch({
			type: 'REMOVE_CONNECTION',
			payload: id
		});
	}
}

module.exports = function (store) {
	let methods = {
		getModel,
		addElement,
		removeElement,
		addConnection,
		removeConnection
	};

	let called_methods = {};

	for (let key in methods) {
		called_methods[key] = methods[key](store);
	}

	return called_methods;
}
