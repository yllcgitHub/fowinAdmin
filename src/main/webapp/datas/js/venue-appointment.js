/* 预约 */
$(".appointment-week-box a").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    $(this).parent().siblings().find("a").removeClass("active");
});