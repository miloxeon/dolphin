var gulp = require('gulp'),
	concat = require('gulp-concat'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(),
	webpack = require('gulp-webpack');

var path_to_css = './src/css/style.css';
var path_to_js = './src/base.js';

gulp.task('css', function () {
	return gulp.src(path_to_css)
		.pipe(concat('style.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./'));
});

gulp.task('js', function () {
	return gulp.src(path_to_js)
    	.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./js'));
});

gulp.task('watch', ['default'], function () {
	browserSync.init({
		server: {
			baseDir: './',
			index: 'index.html'
		}
	});
	gulp.watch(path_to_css, ['css']);
	gulp.watch('./src/**/*.js', ['js']);
	gulp.watch('./src/*').on('change', browserSync.reload);
	// gulp.watch('./js/*').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'js']);
