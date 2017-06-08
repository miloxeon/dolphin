'use strict';

import {createStore} from 'redux';
import {addElement, removeElement, addConnection, removeConnection, moveElement} from './actions';
import {clone} from './lib/tools';

let fixtures = clone(require('./fixtures'));

function reducer(state = fixtures, action) {
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

export default createStore(reducer);
