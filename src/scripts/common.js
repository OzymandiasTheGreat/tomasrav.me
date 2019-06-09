import $ from 'jquery';
import header from '../header.fragment.html';
import footer from '../footer.fragment.html';
import strings from '../strings.json';
import portfolio from '../portfolio.json';


export const LANG = setLang();
export const STRINGS = strings;
export const PORTFOLIO = portfolio;


$(function () {
	let $header = $('header').html(header);
	let $footer = $('footer').html(footer);

	if (LANG === 'en') {
		$header.find('#about').text(STRINGS.en.about);
		$header.find('#apps').text(STRINGS.en.apps);
		$header.find('#libs').text(STRINGS.en.libs);
		$footer.find('p.copyright.attr-flags').html(STRINGS.en.credit_flags);
	} else {
		$header.find('#about').text(STRINGS.lt.about);
		$header.find('#apps').text(STRINGS.lt.apps);
		$header.find('#libs').text(STRINGS.lt.libs);
		$footer.find('p.copyright.attr-flags').html(STRINGS.lt.credit_flags);
	}

	let appList = $('#appList');
	let libList = $('#libList');
	for (let app of PORTFOLIO.apps) {
		appList.append(`<li class="menuItem"><a href="./project.html?project=${app}">${app}</a></li>`);
	}
	for (let lib of PORTFOLIO.libs) {
		libList.append(`<li class="menuItem"><a href="./project.html?project=${lib}">${lib}</a></li>`);
	}
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
