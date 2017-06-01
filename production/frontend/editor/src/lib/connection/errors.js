'use strict';

export function checkBlueprint(blueprint) {
	if (!blueprint.from.id || !blueprint.to.id || !blueprint.id)
		return new TypeError("Blueprint error: some of id's are missing");
}

export function checkElement(element) {
	if (!element)
		return new TypeError("Element error: element is missing");
}

export function checkPos(pos) {
	if (!pos.x || !pos.y) 
		return new TypeError("Position error: coordinates are missing");
}

export function checkBbox(bbox) {
	if (!bbox)
		return new TypeError("Position error: bbox is missing or can't be computed");
}

export function checkLineFunction(foo) {
	if (!foo)
		throw new Error("Function error: line function is missing");
}

export function checkAddress(address) {
	if (!address.element || !address.socket) 
		return new TypeError("Position error: address element or socket are missing");
}

export function checkCoordinates(a, b) {
	if (!a || !b)
		return new Error('Coordinates error: start point or end point or both are missing');
}

export function checkType(type) {
	if (!type)
		throw new TypeError("Connection type is missing, default type load failed");
}

export function checkLine(line) {
	if (!line)
		throw new Error("Internal error: Connection line is missing");
}

export function checkSockets(sockets) {
	if (!sockets ||
		!sockets[0] ||
		!sockets[1] || 
		sockets.length > 2) 
		throw new Error("Wrong sockets: " + sockets);
}
