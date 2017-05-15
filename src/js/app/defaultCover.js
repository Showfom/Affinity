/* Set a default cover image if there's none (in partials/loop.hbs) */
(function (config) {
	var defImg = replaceVariable(config.defCoverImage);
	if (!defImg) return ;

	$('a.no-cover').each(function (i, el) {
		$(el)
			.removeClass('no-cover')
			.css({backgroundImage: 'url("' + defImg + '")'});
	});
})($.m_config);
