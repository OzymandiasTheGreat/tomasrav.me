import $ from 'jquery';
import M from 'materialize-css';
import Cookies from 'js-cookie';

$(function () {
	if (Cookies.get('gdpr') !== 'ok') {
		const gdpr = M.Modal.init($('.gdpr.modal'), {
			opacity: 0.75,
			dismissible: false,
		})[0];
		$('#gdpr-ok').click(() => Cookies.set('gdpr', 'ok', { expires: 365 }));
		gdpr.open();
	}
	$('.english').click(() => {
		Cookies.set('language', 'en', { expires: 365 });
		window.location.reload(true);
	});
	$('.lithuanian').click(() => {
		Cookies.set('language', 'lt', { expires: 365 });
		window.location.reload(true);
	});
	$('table').addClass('responsive-table')
		.addClass('highlight');
	$('.dropdown-trigger').dropdown({
		hover: true,
		coverTrigger: false,
		constrainWidth: false,
	});
	$('.sidenav').sidenav();
	$('.collapsible').collapsible();
	$('i.expander').click(function(event) {
		event.preventDefault();
	});

	if (window.location.pathname.startsWith('/project/')) {
		const gallery = $('.gallery');
		const project = gallery.attr('id');

		$.get(`/img/${project}/`).done(function(response) {
			if (response.length) gallery.html('<div id="screenShots" class="carousel grey lighten-2"></div>');
			for (let img of response) {
				if (img.type === 'file') {
					const index = response.indexOf(img);
					$('#screenShots').append(`<a id="img-${index}" class="carousel-item modal-trigger" href="#lightbox"><img src="/img/${project}/${img.name}"></a>`);
					$(`#img-${index}`).click(function() {
						$('#lightbox-content').attr('src', this.children[0].src);
					});
				}
			}
			M.Carousel.init($('.carousel'), {
				numVisible: 0,
				indicators: true,
			});
			$('body').append(`
				<div id="lightbox" class="modal">
					<div class="modal-content">
						<i class="modal-close fas fa-times"></i>
						<img id="lightbox-content" src="">
					</div>
				</div>
			`);
			M.Modal.init($('.modal:not(.gdpr)'), {
				startingTop: '0',
				endingTop: '4%',
			});
		});
	}

	if (['/applications', '/libraries'].includes(window.location.pathname)) {
		$('.card-image-placeholder').each(function() {
			const project = this.id;
			console.log(project);

			$.get(`/img/${project}/`).done((response) => {
				const img = response[Math.floor(Math.random() * response.length)];
				console.log(img);

				if (img.type === 'file') {
					$(this).removeClass('hide')
						.addClass('card-image')
						.prepend(`<img src="/img/${project}/${img.name}" alt="${project}">`)
						.siblings('.card-content')
						.children('.card-title')
						.addClass('hide');
				}
			});
		});
	}
});
