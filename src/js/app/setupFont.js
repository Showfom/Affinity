/* Setup default font if request */
(function ($j, config) {
	'use strict';
  
  var font = config.font;
  if (!font) {
    return ;
  }
  var defaultFontFamily = getComputedStyle(document.body).fontFamily;
  $j.m_addStyle ($j.m_replaceVariable('body{font-family:%f,%d}', {
    f: font,
    d: defaultFontFamily
  }));
})($.j, $.j.m_config);
