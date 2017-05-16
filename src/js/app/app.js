(function(document, body, config) {
	var style = document.createElement('style');

	var defReplace = {
		rand: function () {
			return ~~(Math.random() * 10000000);
		},
		base: $.base
	};

	function scrollTop (top) {
		// FIXME: only change one of the height.
		$('#content').scrollTop(top);
		$(window).scrollTop(top);
	}

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

	/* Setup default font if request */
	(function () {
		var font = config.font;
		if (!font) return ;
		var defaultFontFamily = getComputedStyle(body).fontFamily;
		style.textContent += replaceVariable('body{font-family:%f,%d}', {
			f: font,
			d: defaultFontFamily
		});
	})();

	if (style.textContent.length > 0) {
		$(body).append(style);
	}
})(document, document.body, $.j.m_config);
