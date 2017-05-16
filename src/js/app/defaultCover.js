/* Set a default cover image if there's none (in partials/loop.hbs) */
(function ($j, config) {
	'use strict';

	var defImg = $j.m_replaceVariable(config.defCoverImage);
	if (!defImg) {
		return ;
	}

	$('a.no-cover').each(function (i, el) {
		$(el)
			.removeClass('no-cover')
			.css({backgroundImage: 'url("' + defImg + '")'});
	});
})($.j, $.j.m_config);
