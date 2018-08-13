/*
 * xBar | Copyright xianghongai@gmail.com
 */
;
(function ($) {
    jQuery.fn.xBar = function (settings) {
        var config = {
            navItemCls: '.nav-item', // 触发项类名
            barCls: ".follow-bar", // bar类名
            activeCls: "follow-bar-active", // 激活时类名
            activeIndex: 0, // 默认激活第 n 项
            offsetT: 0, // 距顶部的微调偏移量，如有下边框时适度向下偏移
            offsetL: 0, // 距左侧的微调偏移量
            stretchW: 0 // bar 宽度微调
        };

        if (settings) jQuery.extend(config, settings);

        // 设置Bar样式
        function BarStyle($navItem, $bar) {
            var barLeft = $navItem.position().left + config.offsetL;
            var barTop = $navItem.height() + config.offsetT;
            var barWidth = $navItem.width() + config.stretchW;
            $bar.css({
                'top': barTop,
                'left': barLeft,
                'width': barWidth
            })
        }

        this.each(function () {

            // 获取配置
            var navItemCls = config.navItemCls;
            var barCls = config.barCls;
            var activeCls = config.activeCls;
            var activeIndex = config.activeIndex;

            // 获取Dom
            var $this = $(this);
            var $navItem = $this.children(navItemCls);
            var $bar = $this.children(barCls);

            // 第一次加载初始化
            if ($navItem.hasClass(activeCls)) {
                activeIndex = $navItem.index($this.children('.' + activeCls));
            } else {
                $navItem.eq(activeIndex).addClass(activeCls);
            }

            var $itemActive = $this.children('.' + activeCls);

            BarStyle($itemActive, $bar);

            // 点击导航项时设置
            $navItem.on('click', function () {
                var $thisTemp = $(this);
                activeIndex = $navItem.index($thisTemp);
                $thisTemp.addClass(activeCls).siblings(navItemCls).removeClass(activeCls);
                BarStyle($thisTemp, $bar);
            });

            // 导航项进入和离开时设置
            $navItem.on({
                mouseenter: function () {
                    var $thisTemp = $(this);
                    $thisTemp.addClass(activeCls).siblings(navItemCls).removeClass(activeCls);
                    BarStyle($thisTemp, $bar);
                },
                mouseleave: function () {
                    var $thisTemp = $(this);
                    $thisTemp.removeClass(activeCls);
                    $navItem.eq(activeIndex).addClass(activeCls);
                    BarStyle($navItem.eq(activeIndex), $bar);
                }
            });
        });
        return this;
    };
})(jQuery);