(function () {
  var base = $('link[type*="rss+xml"]')
    .attr('href').replace(/\/(feed|rss)\/?$/i, '') || '';

  $.base = base;

  var _default = {
  	tocName: 'Contents'
  };
  $.m_config = $.extend({}, _default, $('#theme-config').data());
})();