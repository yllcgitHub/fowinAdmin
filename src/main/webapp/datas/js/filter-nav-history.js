// by: xianghongai@gmail.com
$(document).ready(function () {
    var aPathname = location.pathname;
    var testPathname = aPathname;

    if (/history/.test(testPathname) && /live/.test(testPathname)) {
        $('.J_FilterNavHistory .item[data-nav=live]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/history/.test(testPathname) && /venue/.test(testPathname)) {
        $('.J_FilterNavHistory .item[data-nav=venue]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/history/.test(testPathname) && /activity/.test(testPathname)) {
        $('.J_FilterNavHistory .item[data-nav=activity]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/history/.test(testPathname) && /app/.test(testPathname)) {
        $('.J_FilterNavHistory .item[data-nav=app]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/history/.test(testPathname) && /vod/.test(testPathname)) {
        $('.J_FilterNavHistory .item[data-nav=vod]').addClass('active').siblings(".item").removeClass('active');
    }
});