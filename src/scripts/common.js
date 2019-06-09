import $ from 'jquery';
import header from '../header.fragment.html';
import footer from '../footer.fragment.html';


export const LANG = setLang();


$(function () {
	$('header').html(header);
	$('footer').html(footer);
	$.get({url: './content/portfolio.json', cache: true}).done(function (response) {
		let appList = $('#appList');
		let libList = $('#libList');

		for (let app of response.apps) {
			appList.append(`<li class="menuItem"><a href="./project.html?project=${app}">${app}</a></li>`);
		}
		for (let lib of response.libs) {
			libList.append(`<li class="menuItem"><a href="./project.html?project=${lib}">${lib}</a></li>`);
		}
	});
});


function setLang() {
	let lang = window.sessionStorage.getItem('lang');

	if (lang === undefined || lang === null) {
		window.sessionStorage.setItem('lang', 'en');
		lang = 'en';
	}
	return lang;
}


export function showError() {
	$('main').html('<div class="error">The content you requested doesn\'t exist.</div>');
}
