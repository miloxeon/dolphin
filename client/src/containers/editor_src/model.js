'use strict';

import {createStore} from 'redux';
import {addElement, removeElement, addConnection, removeConnection, moveElement} from './actions';
import {clone} from './lib/tools';

function createStoreFromSavedDiagram(diagram_string) {
	let blueprint;

	try {
		
		blueprint = JSON.parse(diagram_string);

	} catch (err) {

		blueprint = {
			elements: [],
			connections: []
		};

	}

	return createStore(reducer,  blueprint);	
}

function reducer(state, action) {
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
			return moveElement(state, action.payload);

		default:
			return state;
	}
}

export default createStoreFromSavedDiagram;
