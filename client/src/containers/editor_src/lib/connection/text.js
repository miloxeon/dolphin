'use strict';

import config from '../config';
// todo errors
export function setRichText(rich_text) {
	// set connection's rich text: labels, roles, indicators...
	this.richText = rich_text;
	this.redraw();
	return this;
}

export function displayLineText(isReverse = false) {
	let path = this.connectionLine;
	let richText = this.richText;

	let offset_upper = parseInt(config['offset-upper']);
	let offset_lower = parseInt(config['offset-lower']);

	if (path.length() > config['line-min-length']) {
		// text at the middle
		this.showAll();

		if (this.actionLabel) {
			updateLabel(this.actionLabel, path, 'middle', isReverse);
		} else {
			this.actionLabel = displayLabel(
				this,
				richText.text,
				'dolphin_text dolphin_line_text dolphin_line_action',
				offset_upper,
				'middle');
		}

		// role at the start

		if (this.startRole) {
			updateLabel(this.startRole, path, 'start', isReverse);
		} else {
			this.startRole = displayLabel(
				this,
				richText.from.role,
				'dolphin_text dolphin_line_text dolphin_line_role',
				offset_upper,
				'start', isReverse);
		}
		
		// indicator at the start
		if (this.startIndicator) {
			updateLabel(this.startIndicator, path, 'start', isReverse);

		} else {
			this.startIndicator = displayLabel(
				this,
				richText.from.indicator,
				'dolphin_text dolphin_line_text dolphin_line_indicator',
				offset_lower,
				'start', isReverse);
		}
		
		// role at the end
		if (this.endRole) {
			updateLabel(this.endRole, path, 'end', isReverse);

		} else {
			this.endRole = displayLabel(
				this,
				richText.to.role,
				'dolphin_text dolphin_line_text dolphin_line_role',
				offset_upper,
				'end', isReverse);
		}

		// indicator at the end
		if (this.endIndicator) {
			updateLabel(this.endIndicator, path, 'end', isReverse);

		} else {
			this.endIndicator = displayLabel(
				this,
				richText.to.indicator,
				'dolphin_text dolphin_line_text dolphin_line_indicator',
				offset_lower,
				'end', isReverse);
		}
	} else {
		this.hideAll();
	}

	return this;
}

function computeOffset(part, all, position) {
	let path_length = all.length();
	let padding = 10;

	switch (position) {
		case 'start':
			return padding;

		case 'middle':
			// magic
			return '50%';

		case 'end':
			return path_length - part - padding;

		default:
			// err
	}
}

function reverseAlignment(alignment, isReverse) {
	switch (alignment) {
		case 'start':
			return !isReverse ? 'start' : 'end';

		case 'middle':
			return 'middle';

		case 'end':
			return !isReverse ? 'end' : 'start';
	}
}

function displayLabel(context, label_text, classes, offset, alignment, isReverse) {
	let label_width;
	let label = context.text(function (add) {
		let t = add.tspan(label_text).dy(offset)
		label_width = t.bbox().w;
	}).addClass(classes);

	label.path(context.connectionLine.array())
		.textPath().attr({
		'startOffset': computeOffset(label_width, context.connectionLine, reverseAlignment(alignment, isReverse)),
		'spacing': 'auto'
	});
	return label;
}

function updateLabel(label, path, alignment, isReverse) {
	label.textPath().attr('startOffset', computeOffset(label.bbox().w, path, reverseAlignment(alignment, isReverse)))
	return label.plot(path.array());
}