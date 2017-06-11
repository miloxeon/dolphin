'use strict';

// entry point
// todo errors

require('./css/style.css');
let api = require('./api');
import styles from './css/style.js';
import {draw} from './lib/classes';
import {moveController} from './lib/controllers';
import createStoreFromSavedDiagram from './model';
import {download} from './lib/download';
let fixtures = JSON.stringify(require('./fixtures'));
let Mousetrap = require('mousetrap');

let diagram = draw.classDiagram();
let store;

let altKeyDown;

Mousetrap.bind('alt', function () {
	altKeyDown = true;
}, 'keydown');

Mousetrap.bind('alt', function () {
	altKeyDown = false;
}, 'keyup');

function loadDiagram(diagram_string) {
	diagram.clear();
	store = createStoreFromSavedDiagram(diagram_string);
	rebuild(diagram);

	store.subscribe(function () {
		// rebuild diagram if something happens
		rebuild(diagram);
	});
}

function rebuild(diagram) {
	diagram.clear();
	diagram.fromModel(store.getState());
	bindControllers(diagram);
}

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		
		child.on('click', function (e) {
			if (child.getType() == 'Connection' || child.getType() == 'DiagramNode') {
				diagram.fire('clicked', {
					child
				});
			}
		});

		child.on('dragstart', function (e) {
			if (child.getType() == 'Connection' || child.getType() == 'DiagramNode') {
				diagram.fire('clicked', {
					child
				});
			}
		});

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

	diagram.on('clicked', function (e) {
    	let child = e.detail.child;
    	if (altKeyDown) {
			if(child.getType() == 'DiagramNode') {
		      api.removeElement(store, child.blueprint.id)
		    } else {
		      api.removeConnection(store, child.blueprint.id)
		    }
    	}
	});
}

function exportDiagram() {
	let str = draw.svg();
	let place_for_style = str.search(/>/);

	let style = '<style>' + styles + '</style>';
	let new_str = str.slice(0, place_for_style + 1) + style + str.slice(place_for_style + 1);
	return download(new_str, 'Dolphin_Diagram', 'image/svg+xml');
}

function downloadDiagram() {
	return download(JSON.stringify(store.getState()), 'Dolphin Diagram.dd', 'application/json');
}

module.exports = Object.assign({}, api, {
	exportDiagram,
	downloadDiagram,
	loadDiagram,
	fixtures,
	diagram,
	store
});
