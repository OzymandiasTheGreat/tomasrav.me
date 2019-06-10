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

	$('a#hamburger').click(function () {
		$('div.navMenu > ul').toggle();
	});
	$('div.menu').on('touchcancel touchend touchmove mouseup mouseleave mouseout', null, null, onTouchEnd);
	$('div.menu').on('touchstart contextmenu mousedown', null, 'ul.menuList', onTouchStart);
	$(document).on('click touchend', null, function (event) {
		if ($('a#hamburger').is(':visible')){
			let $target = $(event.target);
			let $menuBox = $('.menuBox');

			if (!$target.parents('div.navMenu').length && $menuBox.is(':visible')) {
				$menuBox.hide();
				$('.menuList').hide();
			}
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


let timer;
function onTouchStart(event) {
	let e = absorbEvent(event);
	timer = setTimeout(() => {
		$(e.target).siblings(e.data).toggle();
	}, 450);
	return false;
}

function onTouchEnd(event) {
	absorbEvent(event);
	clearTimeout(timer);
	return false;
}


export function absorbEvent(event) {
	let e = event || window.event;
	e.preventDefault && e.preventDefault();
	e.stopPropagation && e.stopPropagation();
	e.cancelBubble = true;
	e.returnValue = false;
	return e;
}


export function showError() {
	$('main').html('<div class="error">The content you requested doesn\'t exist.</div>');
}
