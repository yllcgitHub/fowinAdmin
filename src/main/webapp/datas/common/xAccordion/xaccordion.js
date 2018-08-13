/*
 * xAccordion | Copyright xianghongai@gmail.com
 */
;
(function ($) {
    jQuery.fn.xAccordion = function (settings) {
        var config = {
            activeIndex: 1,
            eventType: 'click',
            collapsible: false, //是否都可折叠
            singleVisible: true, //是否仅一视图
            duration: 400,
            easing: 'swing',
            APanel: '.accordion-panel',
            AHeader: '.accordion-header',
            AContainer: '.accordion-container',
            APanelActiveCls: 'accordion-panel-active',
            AHeaderActiveCls: 'accordion-header-active',
            AHeaderDisabledCls: 'accordion-header-disabled',
            AContainerActiveCls: 'accordion-container-active',
            onSlideUpEnd: null,
            onSlideDownEnd: null
        };

        if (settings) jQuery.extend(config, settings);

        this.each(function () {

            var panelActiveCls = config.APanelActiveCls;
            var headerActiveCls = config.AHeaderActiveCls;
            var headerDisabledCls = config.AHeaderDisabledCls;
            var containerActiveCls = config.AContainerActiveCls;

            var $APanel = $(this).find(config.APanel);
            var $AHeader = $APanel.find(config.AHeader);
            var $AContainer = $APanel.find(config.AContainer);


            //是否全部展开，或者展开指定项，activeIndex all

            //singleVisible 仅一视图模式 开，只展示一个面板；
            //singleVisible 仅一视图模式 关，可激活多个面板；

            //collapsible 是否都可折叠 开，都可折叠，
            //collapsible 是否都可折叠 关，至少保留一个可视面板

            if (config.activeIndex == "all") {
                config.collapsible = true;
                config.singleVisible = false;
                $APanel.addClass(panelActiveCls);
                $APanel.find(config.AHeader).addClass(headerActiveCls);
                $APanel.find(config.AContainer).slideDown(config.duration, config.easing).addClass(containerActiveCls);
            } else {
                var nIndex = config.activeIndex - 1;
                $APanel.eq(nIndex).addClass(panelActiveCls).siblings().removeClass(panelActiveCls);
                $APanel.eq(nIndex).find(config.AHeader).addClass(headerActiveCls);
                $APanel.eq(nIndex).find(config.AContainer).slideDown(config.duration, config.easing).addClass(containerActiveCls);

                if (config.singleVisible && !config.collapsible) {
                    $APanel.eq(nIndex).find(config.AHeader).addClass(headerDisabledCls);
                }
            }

            $AHeader.on(config.eventType, function (e) {
                var $this = $(this);
                var $currentPanel = $this.parents(config.APanel);
                var $currentHeader = $currentPanel.find(config.AHeader);
                var $currentContainer = $currentPanel.find(config.AContainer);

                //当前激活
                if ($currentContainer.is(":visible")) {
                    //都可折叠 : 当前折叠
                    if (config.collapsible) {
                        $currentPanel.removeClass(panelActiveCls);
                        $currentHeader.removeClass(headerActiveCls);
                        $currentContainer.slideUp(config.duration, config.easing).removeClass(containerActiveCls);
                    }

                } else { //当前未激活
                    //仅一视图 : 其它面板都折叠
                    if (config.singleVisible) {
                        $currentPanel.addClass(panelActiveCls).siblings().removeClass(panelActiveCls);
                        $currentHeader.addClass(headerActiveCls);
                        $currentContainer.slideDown(config.duration, config.easing).addClass(containerActiveCls);
                        $currentPanel.siblings().find(config.AHeader).removeClass(headerActiveCls);
                        $currentPanel.siblings().find(config.AContainer).slideUp(config.duration, config.easing).removeClass(containerActiveCls);

                        if (!config.collapsible) {
                            $currentHeader.addClass(headerDisabledCls);
                            $currentPanel.siblings().find(config.AHeader).removeClass(headerDisabledCls);
                        }
                    } else {
                        //其它面板不受影响
                        $currentPanel.addClass(panelActiveCls);
                        $currentHeader.addClass(headerActiveCls);
                        $currentContainer.slideDown(config.duration, config.easing).addClass(containerActiveCls);
                    }
                }
            });
        });
        return this;
    };
})(jQuery);