/* Automatically convert multiline `code` to a full `pre` block. */
$(function () {
    /* globals hljs */
    'use strict';
    var processedFlag = 'js-hljs';

    function renderCode () {
        $('code:not(.hljs,.'+ processedFlag +')').each(function (i, el) {
            var $el = $(el);
            var html = $el.html();
            var render = false;

            if ($el.parent().is('pre')) {
                render = true;
            } else if (html.indexOf('\n') !== -1) {
                $('<pre>')
                    .insertBefore($el)
                    .append($el);
                $el.html(html.trim());
                render = true;
            }

            if (render) {
                hljs.highlightBlock(el);
            }

            $el.addClass(processedFlag);
        });
    }

    renderCode();
    setTimeout(renderCode, 5000);

    // if current tab is active, re-scan for un-processed code tags.
    // In-case of isso loading comments slowly.
    var renderHandle;
    var prevType;
    $(window).on("blur focus", function(e) {
        if (prevType !== e.type) {
            switch (e.type) {
                case "blur":
                    clearInterval(renderHandle);
                    break;
                case "focus":
                    setInterval(renderCode, 15000);
                    break;
            }
        }

        prevType = e.type;
    });
});