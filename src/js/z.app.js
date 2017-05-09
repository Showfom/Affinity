$(function() {
	var _default = {
		tocName: 'Contents'
	};
	var config = $.extend({}, _default, $('#theme-config').data());

	var defReplace = {
		rand: function () {
			return ~~(Math.random() * 10000000);
		},
		base: $.base
	};

	function replaceVariable (str, replacement) {
		var rules = $.extend({}, defReplace, replacement);
		return str.replace(/%(?:\{\s*(\w+)\s*\}|(\w+))/g, function (z, a, b) {
			var variable = a || b;
			var r = rules[variable];
			if (!r) return z;

			if ($.isFunction(r)) {
				return r(variable);
			}

			return r;
		});
	}

	/* Highlight all code blocks */
	$('pre').each(function(i, block) {
	  hljs.highlightBlock(block);
	});

	/* Add ToC to current page. */
	(function () {
		var root = $('.content-post-body');
		var headings = $('h1,h2,h3,h4,h5,h6', root);
		if (headings.length === 0) return ;

		var i = 0;
		function getLv(e) {
			return parseInt(e.tagName[1]);
		}

		function strip (str) {
			return str.replace(/[^a-zA-Z0-9-_]/g, '');
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
			var id = uniqueId($el.attr('id') || strip($el.text()));

			$('<span>').attr('id', id).prependTo($el);

			a[0].href = '#' + id;
			return $('<li>').append(a);
		}

		function processLevel (tocs) {
			var heading = headings[i];
			if (!heading) return tocs;

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
	})();

	/* Set a default cover image if there's none (in partials/loop.hbs) */
	(function () {
		var defImg = replaceVariable(config.defCoverImage);
		if (!defImg) return ;

		$('a.no-cover').each(function (i, el) {
			$(el)
				.removeClass('no-cover')
				.css({backgroundImage: 'url(' + defImg + ')'});
		});
	})();
});
