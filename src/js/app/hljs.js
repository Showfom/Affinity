/* Highlight all code blocks */
$('pre').each(function(i, block) {
	'use strict';
  
  /* globals hljs:false */
  hljs.highlightBlock(block);
});
