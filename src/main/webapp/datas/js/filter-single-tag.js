// by: xianghongai@gmail.com
$(function () {
    // 点击标签，激活当前标签，其它同级标签移除样式
    $(".J_FilterSingleTag .item").on("click", function () {
        $(this).addClass("active").siblings(".item").removeClass("active");
    });

    var bUnfold = $(".module-filter-nav-extra").hasClass("filter-nav-fold");
    var $filterNavFold = $(".J_FilterNavFold");

    if (!bUnfold) {
        $filterNavFold.html("收起");
    } else {
        $filterNavFold.html("展开");

    }

    $filterNavFold.on("click", function () {
        if (bUnfold) {
            $(this).html("收起").parent(".module-filter-nav").addClass("filter-nav-unfold").removeClass("filter-nav-fold");
            bUnfold = false;
        } else {
            $(this).html("展开").parent(".module-filter-nav").addClass("filter-nav-fold").removeClass("filter-nav-unfold");
            bUnfold = true;
        }

    });
});
