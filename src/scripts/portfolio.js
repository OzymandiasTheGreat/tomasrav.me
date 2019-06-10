import $ from 'jquery';
import marked from 'marked';
import * as common from './common';


$(function () {
	let query = new URLSearchParams(top.location.search);
	let list = [];

	if (query.has('type')) {
		if (query.get('type') === 'apps') {
			list = common.PORTFOLIO.apps;
		} else if (query.get('type') === 'libs') {
			list = common.PORTFOLIO.libs;
		} else {
			common.showError();
		}
	} else {
		common.showError();
	}

	for (let project of list) {
		$.get(`./content/${project}/${common.LANG}.md`).done(function (response) {
			let blob = marked(response.replace('<div class="gallery"></div>', '').slice(0, 512));

			$('main').append(`<section class="project" id="${project}"><img src="" class="thumb"><article>${blob}<a class="more" href="./project.html?project=${project}">More</a></article></section>`);
			$.get(`./img/${project}/`).done(function (response) {
				let shot = response[Math.floor(Math.random() * response.length)];

				$(`#${project} > img.thumb`).attr('src', `./img/${project}/${shot.name}`);
			});
		});
	}
});
