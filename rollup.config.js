import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import iife from 'rollup-plugin-iife';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy-glob';
import html from 'rollup-plugin-html';

module.exports = {
	input: ['src/scripts/index.js', 'src/scripts/portfolio.js', 'src/scripts/project.js'],
	output: {
		dir: 'dist/assets/',
		format: 'es',
		chunkFileNames: '[name].js',
		sourcemap: true,
	},
	manualChunks: {
		bundle: ['jquery', 'marked', 'magnific-popup', 'src/scripts/common'],
	},
	plugins: [
		resolve(),
		commonjs(),
		html(),
		terser({
			mangle: false,
			ie8: true,
			sourcemap: true,
		}),
		babel({exclude: 'node_modules/**'}),
		iife({
			sourcemap: true,
		}),
		copy([
			{files: 'src/!(*.fragment).html', dest: 'dist'},
			{files: 'src/styles/{*.css,*.css.map}', dest: 'dist/assets'},
			{files: 'src/content/**', dest: 'dist/content'},
			{files: 'src/img/**', dest: 'dist/img'},
			{files: 'node_modules/normalize.css/normalize.css', dest: 'dist/assets/'},
			{files: 'node_modules/magnific-popup/dist/magnific-popup.css', dest: 'dist/assets/'},
		]),
	],
};
