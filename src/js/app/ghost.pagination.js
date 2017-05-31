/*! ghost.pagination for affinity | (c) Jixun | MIT License */
$(function () {
	'use strict';

  var pageItemClass = 'page-item';
  var activeClass = 'active';

  var base = $.base;

  $(document.body).on('click', 'a.' + pageItemClass, function (e) {
    if (e.target.getAttribute('href') === "#") {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  function pageItem (text, href) {
    return $('<a>')
      .attr('href', href || '#')
      .addClass(pageItemClass)
      .text(text);
  }

  function arrow(text) {
    return pageItem(text).addClass('arrow');
  }

  function genPageUrl (page) {
    if (page <= 1) { return base + '/'; }
    return base + '/page/' + parseInt(page) + '/';
  }

  function pagination ($el, current, max) {
    function pageEl (page) {
      var r = pageItem(page, genPageUrl(page));

      if (page === current) {
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

      arrowScrollLeft.toggle(sliderStart > 2);
      arrowScrollRight.toggle(sliderEnd < max - 1);
    }

    var arrowScrollLeft = arrow('←');  // « ◀ ← 👉($.j.m_emoji('F09F9188'))
    var arrowScrollRight = arrow('→'); // » ▶ → 👈($.j.m_emoji('F09F9189'))
    var scrollContent = $('<span>');

    $el.empty();
    if (current > 1) {
      $el.append(pageItem('‹', genPageUrl(1)));
    }
    $el.append(pageEl(1));
    $el.append(arrowScrollLeft);
    $el.append(scrollContent);
    $el.append(arrowScrollRight);
    if (max > 1) {
      $el.append(pageEl(max));

      if (current < max) {
        $el.append(pageItem('›', genPageUrl(current + 1)));
      }
    }

    updateSlider(0);

    arrowScrollLeft.click(function () {
      updateSlider(-4);
    });

    arrowScrollRight.click(function () {
      updateSlider(4);
    });
  }

  $(function () {
    $('#content>.pagination').each(function () {
      var $self = $(this);
      pagination($self, $self.data('current'), $self.data('max'));
    });
  });
});
