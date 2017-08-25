'use strict';

export function Store(initial_state) {
	this.state = initial_state || {};
	this.getState = getState;
	this.setState = setState;
	this.subscribe = subscribe;
	this.setState_silent = setState_silent;
	this.__onUpdate__ = [];
}

function getState() {
	return this.state;
}

function setState(new_state) {
	this.setState_silent(new_state);
	this.state = new_state;
	this.__onUpdate__.forEach(function (callback) {
		callback();
	});
}

function setState_silent(new_state) {
	this.state = new_state;
}

function subscribe(callback) {
	this.__onUpdate__.push(callback);
}
