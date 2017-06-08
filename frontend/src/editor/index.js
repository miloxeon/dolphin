'use strict';

// entry point
// todo errors

require('./css/style.css');

import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import store from './model';

let diagram = draw.classDiagram();
rebuild(diagram);

function rebuild(diagram) {
	diagram.clear();
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

store.subscribe(function () {
	// rebuild diagram if something happens
	rebuild(diagram);
});

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('dragmove', function () {
			diagram.fire('redraw');
			diagram.redrawConnections();
		})

		child.on('dragend', function () {
			// change model on dragend
			store.dispatch({
				type: 'MOVE',
				payload: this
			});
		});
	});
}



let api = require('./api');

module.exports = api;
