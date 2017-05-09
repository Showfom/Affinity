(function ($) {
  var pageItemClass = 'page-item';
  var activeClass = 'active';
  
  var base = $('link[type*="rss+xml"]')
    .attr('href').replace(/\/(feed|rss)\/?$/i, '') || '';
  
  function arrow(text) {
    return $('<b>')
      .addClass('arrow ' + pageItemClass)
      .text(text);
  }

  function genPageUrl (page) {
    if (page <= 1) { return base + '/'; }
    return base + '/page/' + parseInt(page) + '/';
  }

  function pagination ($el, current, max) {
    function pageEl (page) {
      var r = $('<a>')
        .attr('href', genPageUrl(page))
        .addClass(pageItemClass)
        .text(page);

      if (page == current) {
        r.addClass(activeClass);
      }

      return r;
    }

    var sliderStart = Math.max(current - 2, 2);
    function updateSlider(delta) {
          sliderStart = Math.max(sliderStart + delta, 2);
      var sliderEnd   = Math.min(sliderStart + 4, max - 1);

      scrollContent.empty();
      for(var i = sliderStart; i <= sliderEnd; i++) {
        scrollContent.append(pageEl(i));
      }

      arrowLeft.toggle(sliderStart > 2);
      arrowRight.toggle(sliderEnd < max - 1);
    }

    var arrowLeft = arrow('<');
    var arrowRight = arrow('>');
    var scrollContent = $('<span>');

    $el.empty();
    $el.append(pageEl(1));
    $el.append(arrowLeft);
    $el.append(scrollContent);
    $el.append(arrowRight);
    if (max > 1) $el.append(pageEl(max));

    updateSlider(0);

    arrowLeft.click(function () {
      updateSlider(-5);
    });

    arrowRight.click(function () {
      updateSlider(5);
    });
  };

  $(function () {
    $('#content>.pagination').each(function () {
      var $self = $(this);
      pagination($self, $self.data('current'), $self.data('max'));
    });
  });
})(jQuery);

