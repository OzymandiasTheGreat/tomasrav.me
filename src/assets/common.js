import $ from 'jquery';
import M from 'materialize-css';
import Cookies from 'js-cookie';

$(function () {
	if (Cookies.get('gdpr') !== 'ok') {
		const gdpr = M.Modal.init($('.modal'), {
			opacity: 0.75,
			dismissible: false,
		})[0];
		$('#gdpr-ok').click(() => Cookies.set('gdpr', 'ok'));
		gdpr.open();
	}
	$('.english').click(() => {
		Cookies.set('language', 'en');
		window.location.reload(true);
	});
	$('.lithuanian').click(() => {
		Cookies.set('language', 'lt');
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
});
