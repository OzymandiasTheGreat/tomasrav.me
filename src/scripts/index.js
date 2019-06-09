import $ from 'jquery';
import marked from 'marked';
import * as common from './common';

$(function () {
	if (common.LANG === 'lt') {
		$('#statusCaption').text('Statusas');
		$('#contactCaption').text('Susisiekime');
	}

	$.get(`./content/index/status-${common.LANG}.txt`).done(function (response) {
		$('#status').text(response);
	});

	$.get(`./content/index/bio-${common.LANG}.md`).done(function (response) {
		$('#bio').html(marked(response));
	});
});
