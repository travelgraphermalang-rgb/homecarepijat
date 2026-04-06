(function ($) {
    'use strict';

    $(function () {
        // Copy Code Block with "Copy Block" button
        $('.dominopost-copy-code-wrapper').each(function () {
            var $wrapper = $(this);
            var title = $wrapper.data('title') || 'code';

            var $header = $('<div class="dominopost-copy-header"></div>');
            var $title = $('<span class="dominopost-code-title"></span>').text(title);
            var $button = $('<button class="copy-button">Copy Block</button>');

            $header.append($title).append($button);
            $wrapper.prepend($header);

            $button.on('click', function () {
                var codeToCopy = $wrapper.find('pre code').text();
                navigator.clipboard.writeText(codeToCopy).then(function () {
                    $button.text('Copied!');
                    $button.addClass('copied');
                    setTimeout(function () {
                        $button.text('Copy Block');
                        $button.removeClass('copied');
                    }, 2000);
                }, function (err) {
                    console.error('Could not copy text: ', err);
                });
            });
        });

        // Modern TOC Toggle Functionality
        $('.dominopost-toc').each(function () {
            var $toc = $(this);
            var $header = $toc.find('h3');

            // Create header wrapper and toggle button
            if (!$toc.find('.dominopost-toc-header').length) {
                var $headerWrapper = $('<div class="dominopost-toc-header"></div>');
                var $toggleBtn = $('<button class="dominopost-toc-toggle">Hide</button>');

                // Wrap h3 and add toggle button
                $header.wrap($headerWrapper);
                $header.parent().append($toggleBtn);

                // Wrap content
                $toc.find('ul').first().wrap('<div class="dominopost-toc-content"></div>');
            }

            // Check if TOC should be collapsed by default
            if ($toc.data('default-collapsed') === true) {
                $toc.addClass('toc-collapsed');
                $toc.find('.dominopost-toc-toggle').text('Show');
            }

            // Toggle functionality
            $toc.on('click', '.dominopost-toc-toggle', function (e) {
                e.preventDefault();
                $toc.toggleClass('toc-collapsed');

                if ($toc.hasClass('toc-collapsed')) {
                    $(this).text('Show');
                } else {
                    $(this).text('Hide');
                }
            });

            // Show More Functionality for Long TOCs
            var $listItems = $toc.find('li');
            var limit = 15;

            if ($listItems.length > limit) {
                // Hide items beyond limit initially
                $listItems.slice(limit).addClass('dominopost-toc-hidden-item');

                // Add Show More Button
                var $showMoreContainer = $('<div class="dominopost-toc-show-more-container"><button class="dominopost-toc-show-more">Show More ▼</button></div>');
                $toc.find('.dominopost-toc-content').append($showMoreContainer);

                $showMoreContainer.on('click', '.dominopost-toc-show-more', function (e) {
                    e.preventDefault();
                    var $hidden = $toc.find('.dominopost-toc-hidden-item');
                    var $nextBatch = $hidden.slice(0, limit);

                    $nextBatch.fadeIn().removeClass('dominopost-toc-hidden-item');

                    // If no more hidden items, remove the button
                    if ($toc.find('.dominopost-toc-hidden-item').length === 0) {
                        $showMoreContainer.remove();
                    }
                });
            }
        });

        // Smooth Scrolling for TOC Links
        $('.dominopost-toc a[href^="#"]').on('click', function (e) {
            e.preventDefault();

            var target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 // 80px offset for fixed headers
                }, 600, 'swing'); // 600ms duration with swing easing
            }
        });
    });

})(jQuery);
