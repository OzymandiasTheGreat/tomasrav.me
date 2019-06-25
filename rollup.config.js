/* eslint-disable no-sync,no-process-env */
import path from 'path';
import fs from 'fs';
// import fastGlob from 'fast-glob';
import truncate from 'voca/truncate';


import entryGlob from 'rollup-plugin-entry-glob';
import iife from 'rollup-plugin-iife';
// import buble from 'rollup-plugin-buble';
// import { terser } from 'rollup-plugin-terser';
import posthtml from 'rollup-plugin-posthtml-multi';
// import postcss from 'rollup-plugin-postcss';
import imagemin from 'rollup-plugin-imagemin';
import browsersync from 'rollup-plugin-browsersync';
import progress from 'rollup-plugin-progress';
import notify from 'rollup-plugin-notify';
import filesize from 'rollup-plugin-filesize';


import htmlModules from 'posthtml-modules';
import htmlExpressions from 'posthtml-expressions';
import markdown from 'posthtml-markdown';
import highlight from 'posthtml-highlight';
import htmlnano from 'htmlnano';


import serveJSON from 'express-serve-json-dir';
import cookieParser from 'cookie-parser';
import negotiator from 'express-negotiator';

import pkg from './package.json';
import content from './src/content.json';
import locale from './src/locale.json';


const githubUser = 'OzymandiasTheGreat';
// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV === 'development';
const src = (...args) => path.resolve(path.join('src/', ...args));
const dest = (...args) => path.resolve(path.join('dist/', ...args));
// eslint-disable-next-line consistent-return
const onWarn = (warning, warn) => {
	if (warning.code === 'EMPTY_BUNDLE') {
		return null;
	}
	warn(warning);
};

const styles = [
	{
		src: 'https://fonts.googleapis.com/icon?family=Material+Icons',
		sri: '',
	},
	{
		src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
		sri: 'sha256-OweaP/Ic6rsV+lysfyS4h+LM6sRwuO3euTYfr6M124g=',
	},
	{
		src: 'https://fonts.googleapis.com/css?family=Fira+Mono|Fira+Sans+Condensed:500,500i|Merriweather:300,300i&display=swap&subset=latin-ext',
		sri: '',
	},
	{
		src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/atom-one-dark.min.css',
		sri: 'sha256-GA29iW/iYj9FcuQQktvW45pRzHvZeFfgeFvA4tGVjpM=',
	},
];
const scripts = [
	{
		src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
		sri: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
	},
	{
		src: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
		sri: 'sha256-U/cHDMTIHCeMcvehBv1xQ052bPSbJtbuiw4QA9cTKz0=',
	},
	{
		src: 'https://kit.fontawesome.com/b5ef1f1427.js',
		sri: 'sha384-7cupKsyf1krt0hPaFhz7o347RIzmECgbuiiOTe+NbIi9eA5z8RSNuYFdTDgRTZHH',
	},
];
const configureHtml = () => {
	const buttons = {
		license: (project) => ({
			img: `https://img.shields.io/github/license/${githubUser}/${project}.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAGYQAABmEBMnbZNQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIvSURBVCiRbVLPaxNBGH0zO7ubdpOaVJIWpWLb1YuaUDxYKGgR%2FBOKgtp6UQ9eijcFD6JeRfBQREHQgEopSC7qPyBeAtbuISmhTWtKiTFNNtkf2d3ZXU8pSfCd5pv53vve%2BxiCHpxcODMuxcRHVGRniUiiICQMPW7wTqD5Dn%2By%2FUGrdntJ93B6aWZRGGHLo%2BlxCIro9gpy05Ma6%2FvwzM7z0lstCwACAKi3MjeHjyv3R88fc6kk%2BBgAlQRfmTjiB6Z%2FcWQ6rh%2BsVzWiLqhJMRX%2Fmpw74Q0S%2Fofa999Sa699hREl%2BjCRGaOD1ozSAQAgpo72WU%2BcSxHfdB8wISKkWVR2DkktV6r9qOzbpnUHAKyq8SY1OzHGRiQXAFhMdqjMZigVWbR3WqtUDy29s1hZ3dyrrG7u2bpzo1Wqh32ZRRqlIcI%2Bm%2BABCDOsbkmYYQU8GEhKCIMXWADk7pUyGadOo%2FNifl69V0vWqDfMXsam433iAecW445fChyeoTLjACAnFSc2lbi069WvhiGGElOJOfmooh%2BSbE8M7FCjTos%2Fa2g1oVfRqVuGaLg5yeSfnLpl9r41tD%2FU7dhP6e7axpZTsz%2BbZV0GgJAH1DO9nWKu2C7mim3P9HZCHlAAMHeaktvsrJU%2FFsoUAErvfj7WN%2F9%2Ba2xUI%2B3t5hC3%2Bcrhrmy%2BYmw1hxu%2FqhG9ePDl%2Fd1XrwuFwmTfrtTr6Vl1KZNFzx8GQNSlTPbUtfQFAMjn85fz%2BfztfyApBRLO%2BpmRAAAAAElFTkSuQmCC&style=for-the-badge`,
			alt: 'License',
			lnk: `https://github.com/${githubUser}/${project}/blob/master/LICENSE`,
		}),
		githubRelease: (project) => ({
			img: `https://img.shields.io/github/release-pre/${githubUser}/${project}.svg?logo=github&style=for-the-badge`,
			alt: 'Latest Release',
			lnk: `https://github.com/${githubUser}/${project}/releases`,
		}),
		githubStars: (project) => ({
			img: `https://img.shields.io/github/stars/${githubUser}/${project}.svg?logo=github&style=for-the-badge`,
			alt: 'Github Stars',
			lnk: `https://github.com/${githubUser}/${project}`,
		}),
		githubDL: (project) => ({
			img: `https://img.shields.io/github/downloads/${githubUser}/${project}/total.svg?logo=github&style=for-the-badge`,
			alt: 'Github Downloads',
			lnk: `https://github.com/${githubUser}/${project}/releases`,
		}),
		githubIssues: (project) => ({
			img: `https://img.shields.io/github/issues-raw/${githubUser}/${project}.svg?logo=github&style=for-the-badge`,
			alt: 'Github Issues',
			lnk: `https://github.com/${githubUser}/${project}/issues`,
		}),
		pypiDL: (project) => ({
			img: `https://img.shields.io/pypi/dm/${project}.svg?logo=python&style=for-the-badge`,
			alt: 'PyPI Downloads',
			lnk: `https://pypi.org/project/${project}/`,
		}),
		npmDL: (project) => ({
			img: `https://img.shields.io/npm/dt/${project}.svg?logo=npm&style=for-the-badge`,
			alt: 'NPM Downloads',
			lnk: `https://www.npmjs.com/package/${project}`,
		}),
	};
	const outputPage = (subdir, name, lang) => path.resolve(dest(subdir, `${name}.${lang}.html`));
	const template = {
		index: src('templates', 'index.html'),
		project: src('templates', 'project.html'),
		listing: src('templates', 'listing.html'),
	};
	const options = (include, extract, plugins = []) => ({
		include,
		extract,
		plugins,
	});
	const plugins = (file, locals) => [
		htmlModules({ from: file }),
		htmlExpressions({
			locals,
		}),
		markdown({
			gfm: true,
			breaks: true,
			smartLists: true,
			smartypants: true,
			tables: true,
			langPrefix: 'language-',
		}),
		highlight(),
		htmlnano({
			removeEmptyAttributes: false,
		}),
	];
	const templates = [];
	for (let [lang, strings] of Object.entries(locale)) {
		templates.push(options(template.index, outputPage('', 'index', lang), plugins(template.index, {
			styles,
			scripts,
			title: strings.about,
			status: fs.readFileSync(src(`content/index/status.${lang}.txt`)).toString(),
			blurb: fs.readFileSync(src(`content/index/blurb.${lang}.md`)).toString(),
			cv: fs.readFileSync(src(`content/index/cv.${lang}.md`)).toString(),
			...strings,
		})));

		const appCards = [];
		const libCards = [];
		for (let [ app, data ] of Object.entries(content.project.application)) {
			const badges = [];
			const content = fs.readFileSync(src(`content/projects/${app}/${lang}.md`)).toString();
			for (let [name, include] of Object.entries(data.buttons)) {
				if (include) badges.push(buttons[name](app));
			}
			templates.push(options(template.project, outputPage('project', app, lang), plugins(template.project, {
				styles,
				scripts,
				title: app,
				content,
				badges,
				...strings,
			})));
			appCards.push({
				title: app,
				blurb: truncate(content, 512),
			});
		}
		for (let [ lib, data ] of Object.entries(content.project.library)) {
			const badges = [];
			const content = fs.readFileSync(src(`content/projects/${lib}/${lang}.md`)).toString();
			for (let [name, include] of Object.entries(data.buttons)) {
				if (include) badges.push(buttons[name](lib));
			}
			templates.push(options(template.project, outputPage('project', lib, lang), plugins(template.project, {
				styles,
				scripts,
				title: lib,
				content,
				badges,
				...strings,
			})));
			libCards.push({
				title: lib,
				blurb: truncate(content, 512),
			});
		}

		templates.push(options(template.listing, outputPage('', 'applications', lang), plugins(template.listing, {
			styles,
			scripts,
			title: strings.apps,
			cards: appCards,
			...strings,
		})));
		templates.push(options(template.listing, outputPage('', 'libraries', lang), plugins(template.listing, {
			styles,
			scripts,
			title: strings.libs,
			cards: libCards,
			...strings,
		})));
	}
	return {
		watch: isDev,
		importPath: src('templates'),
		options: templates,
	};
};


module.exports = {
	external: [...Object.keys(pkg.dependencies)],
	input: [
		src('assets', '*.js'),
		src('templates', '*.html'),
		// src('templates', 'index.html'),
		`!${src('templates', 'modules', '*.html')}`,
		src('img', '**', '*.{png,gif,svg,jpg,jpeg}'),
	],
	output: {
		dir: dest('assets'),
		format: 'es',
		globals: {
			'jquery': '$',
			'materialize-css': 'M',
		},
		sourcemap: isDev,
	},
	onwarn: onWarn,
	plugins: [
		entryGlob({
			exclude: [src('assets', '*.js')],
			fileName: 'assets',
		}),
		iife({
			sourcemap: isDev,
		}),
		posthtml(configureHtml()),
		imagemin({
			disable: isDev,
			fileName: '[name][extname]',
			publicPath: dest(),
			preserveTree: src(),
		}),
		isDev && browsersync({
			watch: true,
			watchEvents: ['change', 'add', 'addDir'],
			server: dest(),
			startPath: '/index',
			middleware: [
				serveJSON(dest()),
				cookieParser(),
				negotiator({
					root: dest(),
					cookieName: 'language',
				}),
			],
			plugins: ['bs-console-qrcode'],
			open: false,
			browsers: ['firefox'],
			ui: false,
			online: true,
			logLevel: 'warn',
		}),
		progress(),
		notify(),
		filesize(),
	],
};
