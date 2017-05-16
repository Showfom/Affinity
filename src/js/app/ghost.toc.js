/*! ghost.toc for affinity | (c) Jixun | MIT License */
(function (config) {
	'use strict';

	var root = $('.content-post-body');
	var headings = $('h1,h2,h3,h4,h5,h6', root);
	if (headings.length === 0) {
		return ;
	}

	var i = 0;
	function getLv(e) {
		return parseInt(e.tagName[1]);
	}

	function strip (str) {
		return str.replace(/\s/g, '-');
	}

	function uniqueId (id) {
		var r = 'h-' + id;
		var i = 2;
		while (document.getElementById(r)) {
			r = id + '-' + i;
			i++;
		}
		return r;
	}

	function generateItem (el) {
		var $el = $(el);
		var a = $('<a>').html($el.html());
		var id = $el.attr('id');
		if (!id) {
			id = uniqueId(strip($el.text()));
			$('<span>').attr('id', id).prependTo($el);
		}

		a[0].href = '#' + id;
		return $('<li>').append(a);
	}

	function processLevel (tocs) {
		var heading = headings[i];
		if (!heading) {
			return tocs;
		}

		var level = getLv(heading);

		var currentLv;
		do {
			currentLv = getLv(heading);
			if (currentLv === level) {
				i++;
				tocs.append(generateItem(heading));
			} else if (currentLv < level) {
				// 回溯
				break;
			} else {
				// current > level
				// 寻找下一级
				tocs.append(processLevel($('<ul>')));
			}

			heading = headings[i];
		} while (i < headings.length);
		return tocs;
	}
	var tocRoot = processLevel($('<ul>'));

	root
		.prepend(
			$('<div>')
				.addClass('toc')
				.append(tocRoot)
				.prepend($('<b>').text(config.tocName))
		);

	fixTocScroll();
	/* if there's already hash prepended to the url, scroll to it. */

	function fixTocScroll () {
		var el = document.getElementById(location.hash.slice(1));
		if (el) {
			scrollTop($(el).position().top);
		}
	}

	function scrollTop (top) {
		// FIXME: only change one of the height.
		$('#content').scrollTop(top);
		$(window).scrollTop(top);
	}
})($.j.m_config);
