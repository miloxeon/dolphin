'use strict';

export function Store(initial_state) {
	this.state = initial_state || {};
	this.getState = getState;
	this.setState = setState;
	this.onUpdate = function () {}
}

function getState() {
	return this.state;
}

function setState(new_state) {
	this.state = new_state;
	this.onUpdate();
}
