'use strict';

import {element_blueprints, connection_blueprints} from './fixtures';
import {draw} from './lib/classes';

let diagram = draw.classDiagram();

element_blueprints.forEach(function (blueprint) {
	console.log(diagram.classDiagramNode(blueprint));
});

// connection_blueprints.forEach(function (blueprint) {
// 	diagram.connection(blueprint);
// });
// 
