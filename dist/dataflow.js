'use strict';

var editor = ace.edit("editor");
editor.setTheme("ace/theme/github");
editor.getSession().setMode("ace/mode/json");
editor.$blockScrolling = Infinity;

var store = dolphin.store;

// diagram comes first
syncModels("diagram -> editor");


// create data flow
editor.on("change", function (e) {
	syncModels("editor -> diagram");
});

store.subscribe(function () {
	syncModels("diagram -> editor");
});


function syncModels(strategy) {
	var diagramModel = JSON.stringify(store.getState(), null, "\t");
	var editorModel = editor.getValue();

	if (diagramModel !== editorModel) {
		switch (strategy) {
			case "diagram -> editor":
				editor.setValue(diagramModel);
				break;

			case "editor -> diagram":
				try {
					store.setState(JSON.parse(editorModel));
				} catch (e) {}
				break;

			default:
				throw new Error("Unknown model syncing strategy");
		}
	}
}
