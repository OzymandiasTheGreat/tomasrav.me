import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import iife from 'rollup-plugin-iife';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-glob';
import html from 'rollup-plugin-html';
import json from 'rollup-plugin-json';

module.exports = {
	input: ['src/scripts/index.js', 'src/scripts/portfolio.js', 'src/scripts/project.js'],
	output: {
		dir: 'dist/assets/',
		format: 'es',
		chunkFileNames: '[name].js',
		sourcemap: false,
	},
	manualChunks: {
		bundle: ['jquery', 'marked', 'magnific-popup', 'src/scripts/common'],
		polyfill: ['@babel/polyfill', 'core-js'],
	},
	plugins: [
		resolve(),
		commonjs(),
		json(),
		html(),
		terser({
			mangle: false,
			ie8: true,
			sourcemap: false,
		}),
		babel({exclude: 'node_modules/**'}),
		iife({
			sourcemap: false,
		}),
		copy([
			{files: 'src/!(*.fragment).html', dest: 'dist'},
			{files: 'src/styles/*.css', dest: 'dist/assets'},
			{files: 'src/content/**', dest: 'dist/content'},
			{files: 'src/img/**', dest: 'dist/img'},
			{files: 'node_modules/@fortawesome/fontawesome-free/webfonts/*', dest: 'dist/assets/webfonts'},
			{files: 'node_modules/normalize.css/normalize.css', dest: 'dist/assets/'},
			{files: 'node_modules/magnific-popup/dist/magnific-popup.css', dest: 'dist/assets/'},
		]),
	],
};
