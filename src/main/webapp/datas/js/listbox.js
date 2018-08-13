/* 点击切换 */
$(".filtrate-name .list").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
});

$(".collect").click(function () {
    $(this).addClass("collect-act")
    $(this).children().remove("i.icon-collect");
    $(this).children("span.pull-left").html("已收藏")
})

$(".filtrate-name span").click(function () {
    $(this).parent().addClass("zhank")
    $(this).html("收起")
})

var bUnfold = false;
$(".J_Stretch").on("click", function () {
    if (!bUnfold) {
        $(this).html("收起").parent(".J_StretchWrapper").addClass("unfold");
        bUnfold = true;
    }else {
        $(this).html("展开").parent(".J_StretchWrapper").removeClass("unfold");
        bUnfold = false;
    }

});