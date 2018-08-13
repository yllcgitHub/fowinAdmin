// by: xianghongai@gmail.com
$(document).ready(function () {
    var aPathname = location.pathname;
    var testPathname = aPathname;

    if (/favorite/.test(testPathname) && /live/.test(testPathname)) {
        $('.J_FilterNavFavorite .item[data-nav=live]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/favorite/.test(testPathname) && /venue/.test(testPathname)) {
        $('.J_FilterNavFavorite .item[data-nav=venue]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/favorite/.test(testPathname) && /activity/.test(testPathname)) {
        $('.J_FilterNavFavorite .item[data-nav=activity]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/favorite/.test(testPathname) && /app/.test(testPathname)) {
        $('.J_FilterNavFavorite .item[data-nav=app]').addClass('active').siblings(".item").removeClass('active');
    }
    if (/favorite/.test(testPathname) && /vod/.test(testPathname)) {
        $('.J_FilterNavFavorite .item[data-nav=vod]').addClass('active').siblings(".item").removeClass('active');
    }
});