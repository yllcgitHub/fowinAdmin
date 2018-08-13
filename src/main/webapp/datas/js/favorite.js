/* 点击切换 */

$(".collect").click(function () {
    $(this).addClass("collect-act")
    $(this).children().remove("i.icon-collect");
    $(this).children("span.pull-left").html("已收藏")
})