import $ from 'jquery';
import marked from 'marked';
import 'magnific-popup';
import * as common from './common';


$(function () {
	let query = new URLSearchParams(top.location.search);

	if (query.has('project')) {
		let project = query.get('project');

		$.get(`./content/${project}/${common.LANG}.md`).done(function (response) {
			$('main').html(marked(response));

			if (response.includes('<div class="gallery"></div>')) {
				let gallery = $('div.gallery');

				$.get(`./img/${project}/`).done(function (response) {
					$.each(response, function () {
						if (this.type === 'file') {
							let shot = `./img/${project}/${this.name}`;
							gallery.html(gallery.html() + `<a href="${shot}" class="popup"><img class="thumb" src="${shot}" alt="${project}"></a>`);
						}
					});
					$('a.popup').magnificPopup({
						type: 'image',
						gallery: {enabled: true},
					});
				});
			}
		}).fail(function () {
			common.showError();
		});
	} else {
		common.showError();
	}
});
