(function () {
  'use strict';

  var style = document.createElement('style');
  document.body.appendChild(style);

  var base = $('link[type*="rss+xml"]')
    .attr('href').replace(/\/(feed|rss)\/?$/i, '') || '';

  $.base = base;

  /**
   * The default replacement rules, including:
   * - rand: random number generator
   * - base: blog base url
   */
  var defReplace = {
    rand: function () {
      return Math.floor(Math.random() * 10000000);
    },
    base: $.base
  };

  /**
   * Default configurations
   */
  var _default = {
    tocName: 'Contents',
    tocComments: 'Comments',
    defCoverImage: ''
  };

  /**
   * Theme extension methods
   */
  $.j = {
    /**
     * A simple string template(variable replacement) function.
     * 
     * @param  {string} str         Source string
     * @param  {object} replacement Variable replacement rules
     */
    m_replaceVariable: function (str, replacement) {
      var rules = $.extend({}, defReplace, replacement);
      return str.replace(/%(?:\{\s*(\w+)\s*\}|(\w+))/g, function (z, a, b) {
        var variable = a || b;
        var r = rules[variable];
        if (!r) {
          return z;
        }

        if ($.isFunction(r)) {
          return r(variable);
        }

        return r;
      });
    },

    /**
     * The configuration.
     */
    m_config: $.extend({}, _default, $('#theme-config').data()),

    /**
     * Inject style text to an existing style tag in current page.
     * @param  {string} styleText the cssText to be injected.
     */
    m_addStyle: function (styleText) {
      style.textContent += styleText;
    },

    /**
     * Decode emoji unicodes to emoji string.
     * @param {string} [args] string of encoded emoji
     * 
     * encode: encodeURIComponent(str).replace(/%/g, '')
     */
    m_emoji: function m_emoji () {
      return decodeURIComponent(Array.prototype.reduce.call(arguments, function (acc, item) {
        return acc + item.replace(/../g, function(z) {
          return '%' + z;
        });
      }, ''));
    }
  };
})();
