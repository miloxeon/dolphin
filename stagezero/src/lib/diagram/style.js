'use strict';

let merge = require('deepmerge');
import {convertStyle as styleConverter} from '../theme';
import {class_theme} from '../theme/model';
import {convertObject} from '../tools';

export function convertTheme(theme) {
	let merged_style = merge(class_theme, theme || {});
	let converted_style = convertObject(merged_style, styleConverter);
	
	return converted_style;
}
