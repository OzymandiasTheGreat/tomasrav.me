import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import iife from 'rollup-plugin-iife';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-glob';
import html from 'rollup-plugin-html';
import json from 'rollup-plugin-json';
import progress from 'rollup-plugin-progress';

module.exports = {
	input: ['src/scripts/index.js', 'src/scripts/portfolio.js', 'src/scripts/project.js'],
	output: {
		dir: 'build/assets/',
		format: 'es',
		chunkFileNames: '[name].js',
		sourcemap: true,
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
			sourcemap: true,
		}),
		babel({exclude: 'node_modules/**'}),
		iife({
			sourcemap: true,
		}),
		copy([
			{files: 'src/!(*.fragment).html', dest: 'build'},
			{files: 'src/styles/{*.css,*.css.map}', dest: 'build/assets'},
			{files: 'src/content/**', dest: 'build/content'},
			{files: 'src/img/**', dest: 'build/img'},
			{files: 'node_modules/@fortawesome/fontawesome-free/webfonts/*', dest: 'build/assets/webfonts'},
			{files: 'node_modules/normalize.css/normalize.css', dest: 'build/assets/'},
			{files: 'node_modules/magnific-popup/dist/magnific-popup.css', dest: 'build/assets/'},
		]),
		progress(),
	],
};
