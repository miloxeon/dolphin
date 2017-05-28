'use strict';

import {model as mock_model} from './fixtures';
import {class_theme} from './lib/theme/model';
import {draw} from './lib/classes';
import {dragController} from './lib/controllers';

let diagram = draw.classDiagram();
let model = Object.assign({}, mock_model);

function bindControllers(diagram) {
	diagram.children().forEach(function (child) {
		child.on('mouseup', function () {
			model = dragController(this, model);
			rebuild();
		});
	});
}

function build(model) {
	diagram.fromModel(model);
	bindControllers(diagram);
}

function rebuild() {
	diagram.clear();
	build(model);
}

//build(model);

diagram.rect(100, 100).move(100, 100).addClass('dolphin rect');
diagram.text('This is my text').move(200, 200).addClass('dolphin text');
diagram.line(100, 100, 500, 500).addClass('dolphin line');

console.log(diagram.children());