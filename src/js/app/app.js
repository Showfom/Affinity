(function(document, body, $j, config) {
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

	/* Setup default font if request */
	(function () {
		var font = config.font;
		if (!font) return ;
		var defaultFontFamily = getComputedStyle(body).fontFamily;
		style.textContent += $j.m_replaceVariable('body{font-family:%f,%d}', {
			f: font,
			d: defaultFontFamily
		});
	})();

	if (style.textContent.length > 0) {
		$(body).append(style);
	}
})(document, document.body, $j, $.j.m_config);
