'use strict';

export function getHash() {
	return Math.floor(Math.random() * new Date()).toString();
}
