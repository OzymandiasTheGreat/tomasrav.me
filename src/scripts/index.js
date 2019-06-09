import $ from 'jquery';
import marked from 'marked';
import * as common from './common';

$(function () {
	if (common.LANG === 'en') {
		$('#statusCaption').text(common.STRINGS.en.status);
		$('#contactCaption').text(common.STRINGS.en.contact);
	} else {
		$('#statusCaption').text(common.STRINGS.lt.status);
		$('#contactCaption').text(common.STRINGS.lt.contact);
	}

	$.get(`./content/index/status-${common.LANG}.txt`).done(function (response) {
		$('#status').text(response);
	});

	$.get(`./content/index/bio-${common.LANG}.md`).done(function (response) {
		$('#bio').html(marked(response));
	});
});
