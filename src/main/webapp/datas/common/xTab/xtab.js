/*
 * xTab | Copyright xianghongai@gmail.com
 */
;
(function ($) {
    jQuery.fn.xTab = function (settings) {
        var config = {
            activeIndex: 0,
            eventType: 'click',
            tabNav: '.tab-nav',
            tabTrigger: '.tab-trigger',
            tabContainer: '.tab-container',
            tabPanel: '.tab-panel',
            tabTriggerActiveCls: 'tab-trigger-active',
            tabPanelActiveCls: 'tab-panel-active'
        };

        if (settings) jQuery.extend(config, settings);

        this.each(function (index, element) {
            var $this = $(this);
            var $tabNav = $this.find(config.tabNav);
            var $tabTrigger = $tabNav.find(config.tabTrigger);
            var $tabContainer = $this.find(config.tabContainer);
            var $tabPanel = $tabContainer.find(config.tabPanel);
            //default
            $tabTrigger.eq(config.activeIndex).addClass(config.tabTriggerActiveCls).siblings(config.tabTrigger).removeClass(config.tabTrigger);
            $tabPanel.eq(config.activeIndex).addClass(config.tabPanelActiveCls).siblings(config.tabPanel).removeClass(config.tabPanelActiveCls);
            //event
            $tabTrigger.on(config.eventType, function () {
                var $thisTemp = $(this);
                $thisTemp.addClass(config.tabTriggerActiveCls).siblings(config.tabTrigger).removeClass(config.tabTriggerActiveCls);

                $tabPanel.eq($tabTrigger.index($thisTemp)).addClass(config.tabPanelActiveCls).siblings(config.tabPanel).removeClass(config.tabPanelActiveCls);
            });
        });
        return this;
    };
})(jQuery);