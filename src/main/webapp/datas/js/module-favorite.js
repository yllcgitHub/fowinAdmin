// by: xianghongai@gmail.com
$(document).ready(function () {
    // 收藏icon，鼠标经过提示操作
    $(".J_ModuleFavorite").on({
        mouseenter: function () {
            $(this).addClass("module-favorite-hover");
        },
        mouseleave: function () {
            $(this).removeClass("module-favorite-hover");
        }
    });
    $(".J_ModuleFavorite").on("click", function () {
        var $this = $(this);
        var $text = $this.find(".J_FavoriteToggle");
        if ($this.hasClass("module-favorite-active")) {
            $this.removeClass("module-favorite-active");
            $text.html("加入收藏");
        } else {
            $this.addClass("module-favorite-active");
            $text.html("取消收藏");
        }
    });

    // 收藏按钮
    $(".J_ModuleFavoriteExtra").on({
        mouseenter: function () {
            if ($(this).hasClass("module-favorite-extra-active")) {
                $(this).find(".J_FavoriteExtraToggle").html("取消收藏");
            }
        },
        mouseleave: function () {
            if ($(this).hasClass("module-favorite-extra-active")) {
                $(this).find(".J_FavoriteExtraToggle").html("已收藏");
            }
        }
    });
    $(".J_ModuleFavoriteExtra").on("click", function () {    	
        var $this = $(this);
        var $text = $this.find(".J_FavoriteExtraToggle");
        if ($this.hasClass("module-favorite-extra-active")) {
            $this.removeClass("module-favorite-extra-active");
            $text.html("收藏");
        } else {
            $this.addClass("module-favorite-extra-active");
            $text.html("已收藏");
        }
    });

    // 特色应用收藏
    $(".J_ModuleFavoriteAPP").on("click", function () {
        var $this = $(this);
        var $text = $this.find(".J_ModuleFavoriteAPPToggle");
        if ($this.hasClass("module-favorite-app-active")) {
            $this.removeClass("module-favorite-app-active");
            $text.html("收藏");
        } else {
            $this.addClass("module-favorite-app-active");
            $text.html("已收藏");
        }
    });

    $(".J_ModuleVodList").addClass("module-vod-list-fold");

    $(".J_VodListFold").on("click", function () {
        var $this = $(this);
        var $parent = $this.parents(".J_ModuleVodList");
        if ($parent.hasClass("module-vod-list-fold")) {
            $parent.removeClass("module-vod-list-fold").addClass("module-vod-list-unfold");
            $this.html("收起");
        } else {
            $parent.removeClass("module-vod-list-unfold").addClass("module-vod-list-fold");
            $this.html("展开");
        }
    });

    $(".J_ModuleVodDetail").addClass("module-vod-detail-fold");

    $(".J_VodDetailFold").on("click", function () {
        var $this = $(this);
        var $parent = $this.parents(".J_ModuleVodDetail");
        if ($parent.hasClass("module-vod-detail-fold")) {
            $parent.removeClass("module-vod-detail-fold").addClass("module-vod-detail-unfold");
            $this.html("收起");
        } else {
            $parent.removeClass("module-vod-detail-unfold").addClass("module-vod-detail-fold");
            $this.html("更多");
        }
    });
});
