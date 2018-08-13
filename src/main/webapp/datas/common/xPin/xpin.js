/*
 * xPin | Copyright xianghongai@gmail.com
 * Todo:debounce throttle
 */
;
(function ($) {
    jQuery.fn.xPin = function (settings) {
        var config = {
            targetActiveCls: 'pin-active', // 触发项类名或ID
            placeholderElement: ".pin-placeholder", // 结构下面还有其它结构，需要一个结构来支撑定位后“丢失”的空间
            offsetY: 0, // Y轴偏差，文档实时滚动位置 > 目标距离顶部位置 + Y轴偏差
            disabledTargetElement: ".pin-disabled" // 滚动到某位置, 释放/解除固定
        };

        if (settings) jQuery.extend(config, settings);

        var WINDOW_H = $(window).height();

        $(window).on('resize', function () {
            WINDOW_H = $(window).height();
        });


        this.each(function () {
            var $this = $(this);

            var targetTop = $this.offset().top;
            var $Placeholder = $(config.placeholderElement);
            var placeholderLength = $Placeholder.length;
            var $disabledTargetElement = $(config.disabledTargetElement);
            var disabledTargetElementLength = $disabledTargetElement.length;
            var disabledTargetClassTop = disabledTargetElementLength ? $disabledTargetElement.offset().top : WINDOW_H;
            var docBottom = 0;


            $(window).scroll(function () {
                var docTop = $(window).scrollTop(); //文档实时滚动顶部位置
                docBottom = disabledTargetElementLength ? docTop + WINDOW_H : WINDOW_H;

                // 文档实时滚动位置 > 目标距离顶部位置 + Y轴偏差, 并且, 文档实时底部位置 < 触发清除固定位置
                if (docTop > targetTop + config.offsetY && docBottom < disabledTargetClassTop) {
                    $this.addClass(config.targetActiveCls);
                    if (placeholderLength) {
                        $Placeholder.css({
                            'padding-bottom': config.offsetY
                        });
                    }
                } else {
                    $this.removeClass(config.targetActiveCls);
                    if (placeholderLength > 0) {
                        $Placeholder.css({
                            'padding-bottom': 0
                        });
                    }
                }

            });
        });
        return this;
    };
})(jQuery);