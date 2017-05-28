'use strict';

import {convertStyle} from '../theme';
import {class_theme} from '../theme/model';
import {convertObject} from '../tools';

let merge = require('deepmerge');

export function convertLineStyle(passed_style) {
	let merged_style = merge(class_theme, passed_style);
	let converted_style = convertObject(merged_style, convertStyle);

	return converted_style.line_style;
}
