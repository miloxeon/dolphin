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
	disableWrongModelWarning();
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
					var editorState = JSON.parse(editorModel);
					store.setState(editorState);
				} catch (e) {
					enableWrongModelWarning();
				}
				break;

			default:
				throw new Error("Unknown model syncing strategy");
		}
	}
}

function enableWrongModelWarning() {
	var overlay = document.getElementById('overlay');
	if (overlay.hidden) {
		overlay.hidden = false;
	}
}

function disableWrongModelWarning() {
	var overlay = document.getElementById('overlay');
	if (!overlay.hidden) {
		overlay.hidden = true;
	}
}
