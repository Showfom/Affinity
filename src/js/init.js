(function () {
	var style = document.createElement('style');
  document.body.appendChild(style);

  var base = $('link[type*="rss+xml"]')
    .attr('href').replace(/\/(feed|rss)\/?$/i, '') || '';

  $.base = base;

	var defReplace = {
		rand: function () {
			return ~~(Math.random() * 10000000);
		},
		base: $.base
	};

  var _default = {
  	tocName: 'Contents'
  };

  $.j = {
    m_replaceVariable: function (str, replacement) {
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
  	},

    m_config: $.extend({}, _default, $('#theme-config').data()),

    m_addStyle: function (styleText) {
      style.textContent += styleText;
    }
  };
})();
