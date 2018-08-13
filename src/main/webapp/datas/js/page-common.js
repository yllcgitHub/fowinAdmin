// 47.93.188.186:8280
// window.location.host

var dataHost = "47.93.188.186:8280";
var resUrlPathPrefix = "http://culturetv.hanyastar.com.cn/standard/nationalculturecloud";
var cultureMediaUrlPrefix = "http://culturetv.hanyastar.com.cn/standard/mp4/media_1500";


var urlPath;
var homePath;
var apiPath;
$(function(){  
	
	// 正式环境域名
	var prdDomain = "culturedc";
	// 测试环境ip地址
	var testIp = "47.93.188.186";
	
	var host = window.location.host;
	// 线上环境
	if(host.indexOf(prdDomain)>=0) {
		
		urlPath = "http://www.culturedc.cn/api/v1/encrypt";
		homePath = "http://www.culturedc.cn";
		apiPath = "http://api.culturedc.cn/national-culture-cloud-api";
		
	} 
	
	// 测试环境
	else if(host.indexOf(testIp)>=0) {
		
		urlPath = "http://47.93.188.186:8280/national-culture-cloud-h5/api/v1/encrypt";
		homePath = "http://47.93.188.186:8280/national-culture-cloud-h5";
		apiPath = "http://47.93.188.186:8380/national-culture-cloud-api";
		
	} 
	
	// 本地环境
	else {
		
		urlPath = "http://" + window.location.host + "/national-culture-cloud-h5/api/v1/encrypt";
		homePath = "http://" + window.location.host + "/national-culture-cloud-h5";
		apiPath = "http://" + window.location.host + "/national-culture-cloud-api";
		
	} 
	
} );


var hs = {
    makeQR: {
        qrRender: "canvas",
        isCanvasSupported: function () {
            $("body").append('<canvas id="J_TestCanvas"></canvas>');
            var elem = document.getElementById("J_TestCanvas");
            $("#J_TestCanvas").remove();
            return !!(elem.getContext && elem.getContext('2d'));
        },
        make: function ($qr) {
            if (!this.isCanvasSupported()) {
                this.qrRender = "table";
            }
            var $this = $qr;
            if ($this.find("canvas").length === 0 || $this.find("table").length === 0) {
                var qrText = $this.data("qrurl"),
                    qrWidth = $this.data("qrwidth"),
                    qrHeight = $this.data("qrheight");
                $this.qrcode({
                    render: this.qrRender,
                    width: qrWidth,
                    height: qrWidth,
                    text: qrText
                });

            }
        }
    },
    foldUnfold: function($ele) {
        var $this = $ele;
        var $parents = $this.parents(".fold-unfold");

        var isFold = $parents.hasClass("info-unfold");

        if (isFold) {
            $this.html("收起");
        } else {
            $this.html("展开");
        }

        $ele.on("click", function() {
            if (isFold) {
                $parents.addClass("info-fold").removeClass("info-unfold");
                $this.html("展开");
                isFold = false;
              } else {
                $this.html("收起");
                $parents.addClass("info-unfold").removeClass("info-fold");
                isFold = true;
            }
        });
    },
    xSwitchable: function (switchableCls, slideMode, nPerView, nPerGroup, autoPlay, nSpeed, bPagination, bLoop, bKeyboard, bMousewheel) {
        console.log("slide init");
        var $this = $(switchableCls),
            $switchableCon = $this.find('.swiper-container'),
            $switchablePrev = $this.find('.J_SlidePrev'),
            $switchableNext = $this.find('.J_SlideNext');

        var mySwitchable = $switchableCon.swiper({
            mode: slideMode,
            autoplayDisableOnInteraction: true,
            loop: bLoop,
            slidesPerView: nPerView,
            slidesPerGroup: nPerGroup,
            speed: nSpeed,
            autoplay: autoPlay,

            createPagination: bPagination,
            paginationClickable: true,
            pagination: $this.find('.swiper-pagination')[0],
            paginationElement: 'span',
            paginationElementClass: 'swiper-pagination-switch',
            paginationActiveClass: 'swiper-active-switch',
            paginationVisibleClass: 'swiper-visible-switch',

            keyboardControl: bKeyboard,
            mousewheelControl: bMousewheel
        });

        var $switchableNav = $this.find('.swiper-pagination');
        $switchableNav.children('.swiper-pagination-switch').hover(function () {
            mySwitchable.swipeTo($(this).index());
        });

        function setSwitchable(currentIndex) {
            var totalLength = swiper.slides.length;
            var currentIndex = $(this).index();
            // 总个数
            // 当前index
            // 每页显示多少个

            // console.log(totalLength / nPerView)
            // console.log(totalLength)
            // console.log(currentIndex);
        }

        if ($switchablePrev.exist()) {
            if ($(this).index() === 0 && !bLoop) {
                $switchablePrev.addClass("slide-switchable-disabled");
            }
            $switchablePrev.on({
                click: function () {
                    mySwitchable.swipePrev(false);
                },
                mouseenter: function () {
                    mySwitchable.stopAutoplay();
                },
                mouseleave: function () {
                    mySwitchable.startAutoplay();
                }
            });
        }

        if ($switchableNext.exist()) {

            $switchableNext.on({
                click: function () {
                    mySwitchable.swipeNext(false);
                    // 不是循环模式, index 不为0, prev 可用
                    $switchablePrev.removeClass("slide-switchable-disabled");
                },
                mouseenter: function () {
                    mySwitchable.stopAutoplay();
                },
                mouseleave: function () {
                    mySwitchable.startAutoplay();
                }
            });
        }
    }
};

$(document).ready(function () {

    // 元素是否存在
    $.fn.exist = function () {
        return this.length;
    };

    //加载导航页面
    $("#headeronly").load("common/headeronly.html");
    //加载导航页面
    $("#header").load("common/header.html");
    //加载底部页面
    $("#footer").load("common/footer.html");


    //加载底部页面
    if (!($(".footer-copyright").exist())) {
        $("#footer").append(
            '<div class="page-footer">' +
            '    <div class="section footer-copyright">' +
            '        <div class="section-wrapper">' +
            '            <div class="pure-u-1">' +
            '                <div class="column-inner">' +
            '                    主管：中华人民共和国文化部 &nbsp;&nbsp;&nbsp;&nbsp; 主办：文化部全国公共文化发展中心 &nbsp;&nbsp;&nbsp;&nbsp; Copyright &copy; <span id="J_CopyrightDate">2017</span> 京ICP备17047743号' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>' +
            '<div class="page-pendant">' +
            '    <!--<div class="pendant-inner pendant-qr popup-wrapper J_Popup J_Pendant" title="打开手机版">' +
            '        <div class="popup-item">' +
            '            <span class="icon"></span>' +
            '            <span class="info">下载<br>移动端</span>' +
            '        </div>' +
            '        <div class="popup-panel">' +
            '            <div class="popup-inner">' +
            '                <div class="qr-object J_QR" data-qrheight="100" data-qrwidth="100" data-qrurl="http://culturetv.hanyastar.com.cn/apk/CultureCloud-3-2017-8-30.apk"></div>' +
            '                <h6 class="title">扫码下载移动端</h6>' +
            '            </div>' +
            '        </div>' +
            '    </div>-->' +
            '    <div class="pendant-inner to-top J_Pendant J_ToTop">' +
            '        <div class="popup-item">' +
            '            <span class="icon"></span>' +
            '            <span class="info">返回<br>顶部</span>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );
    }

    // 根据 data-qr="要生成的字符" 生成二维码
    // 依赖 libs/qrcode/jquery.qrcode.min.js

    var qrRender = "canvas";

    function isCanvasSupported() {
        $("body").append('<canvas id="J_TestCanvas"></canvas>');
        var elem = document.getElementById("J_TestCanvas");
        $("#J_TestCanvas").remove();
        return !!(elem.getContext && elem.getContext('2d'));
    }
    if (!isCanvasSupported()) {
        qrRender = "table";
    }
    if ($(".J_QR").exist()) {
        // 可以多次处理
        $(".J_QR").each(function (index, element) {
            var $this = $(this);
            if ($this.find("canvas").length === 0 || $this.find("table").length === 0) {
                var qrText = $this.data("qrurl"),
                    qrWidth = $this.data("qrwidth"),
                    qrHeight = $this.data("qrheight");
                console.log(qrRender);
                $this.qrcode({
                    render: qrRender,
                    width: qrWidth,
                    height: qrWidth,
                    text: qrText
                });

            }
        });
    }

    $("#favAppList").on("mouseenter mouseleave", ".J_Popup", function () {
        var $this = $(this);
        var $qr = $this.find(".J_QR");
        if ($this.hasClass("popup-active")) {
            $this.removeClass("popup-active");
        } else {
            $this.addClass("popup-active");
            console.log(qrRender);
            if ($this.find(".J_QR:has(canvas)").length === 0 || $this.find("table").length === 0) {
                var qrText = $qr.data("qrurl"),
                    qrWidth = $qr.data("qrwidth"),
                    qrHeight = $qr.data("qrheight");
                $qr.qrcode({
                    render: qrRender,
                    width: qrWidth,
                    height: qrWidth,
                    text: qrText
                });
            }
        }
    });

    // 弹出
    $(".J_Popup").on({
        mouseenter: function () {
            $(this).addClass("popup-active");
        },
        mouseleave: function () {
            $(this).removeClass("popup-active");
        }
    });


    if ($(".J_ToTop").exist()) {
        $(".J_ToTop").removeClass("to-top-in");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 100) {
                $(".J_ToTop").addClass("to-top-in");
            } else {
                $(".J_ToTop").removeClass("to-top-in");
            }
        });

        $(".J_ToTop").on("click", function () {
            $("body,html").animate({
                scrollTop: 0
            }, 300);
            return false;
        });
    }

    $(".J_Pendant").on({
        mouseenter: function () {
            $(this).addClass("pendant-active");
        },
        mouseleave: function () {
            $(this).removeClass("pendant-active");
        }
    });

    // 站点版权年份
    if ($("#J_CopyrightDate").exist()) {
        $("#J_CopyrightDate").text(new Date().getFullYear());
    }

    // 弹出
    $(".J_Popup").on({
        mouseenter: function () {
            $(this).addClass("popup-active");
        },
        mouseleave: function () {
            $(this).removeClass("popup-active");
        }
    });

    // 自定义下拉选择项
    $(".J_Select").on({
        mouseenter: function () {
            $(this).addClass("xselect-unfold");
        },
        mouseleave: function () {
            $(this).removeClass("xselect-unfold");
        }
    });

    $(".xselect-item").on("click", function () {
        var $this = $(this);
        $this.parents(".J_Select").removeClass("xselect-unfold").find(".xselect-title").text($this.text());
    });

    // 区域选择
    var $regionHeader = $("#J_RegionHeader");
    $("#J_RegionHeaderInner .item a").on("click", function () {
        var text = $(this).text();
        $(this).addClass("selected").parent(".item").siblings(".item").children("a").removeClass("selected");
        $regionHeader.attr("title", text).text(text);

    });

    //倒计时
    if ($("#J_TimerNumToIndex").exist()) {
        var num = document.getElementById("J_TimerNumToIndex"),
            count = 8,
            timer = setInterval(function () {
                if (count <= 1) {
                    count = 0
                    window.location.href = '/';
                } else {
                    count--;
                }
                num.innerHTML = count;
            }, 1000);
    }

    // 模拟 退出操作提示
    $(".J_SignOut").on("click", function () {
        saveLocalCookieUserId("", "", "", "", "");
        saveUserVisitor();
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shade: 0.8,
            shadeClose: true,
            area: "550px",
            content: $("#J_ModalSignOutSuccess")
        });
        $(".page-header").find(".signinfo").addClass("hidden").end().find(".sign").removeClass("hidden");
    });

    // 关闭模态框
    $('.J_ModalDismiss').on("click", function () {
        layer.close(layer.index);
    });

    // 后台页面侧边栏导航激活
    var aPathname = location.pathname;
    var testPathname = aPathname;

    if (/index/.test(testPathname) || testPathname.length < 2) {
        $(".nav-menu .nav-item[data-nav=index]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /live/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=live]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /vod/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=vod]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /activity/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=activity]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /venue/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=venue]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /app/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=app]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/favorite/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=favorite]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else if (/channel/.test(testPathname) && /data/.test(testPathname)) {
        $(".nav-menu .nav-item[data-nav=analysis]").addClass("nav-item-active").siblings(".nav-item").removeClass("nav-item-active");
    } else {
        $(".nav-menu .nav-item").removeClass("nav-item-active");
    }

    if ($(".J_UserCenterSideNav").exist()) {
        // 最好能按需加载，放在用户中心的脚本中
        if (/user/.test(testPathname) && /info/.test(testPathname)) {
            $(".J_UserCenterSideNav .item[data-nav=info]").addClass("active").siblings(".item").removeClass("active");
        } else if (/user/.test(testPathname) && /password/.test(testPathname)) {
            $(".J_UserCenterSideNav .item[data-nav=password]").addClass("active").siblings(".item").removeClass("active");
        } else if (/user/.test(testPathname) && /activity/.test(testPathname)) {
            $(".J_UserCenterSideNav .item[data-nav=activity]").addClass("active").siblings(".item").removeClass("active");
        } else if (/user/.test(testPathname) && /venue/.test(testPathname)) {
            $(".J_UserCenterSideNav .item[data-nav=venue]").addClass("active").siblings(".item").removeClass("active");
        } else if (/user/.test(testPathname) && /history/.test(testPathname)) {
            $(".J_UserCenterSideNav .item[data-nav=history]").addClass("active").siblings(".item").removeClass("active");
        }
    }

    // TODO:每次页面加载进来延迟处理跟随条
    setTimeout(function () {
        $(".follow-bar").addClass("follow-bar-active");
    }, 100);

    // 导航栏鼠标跟随, 依赖common/xBar, 放置在正则匹配
    if ($(".J_Bar").exist()) {
        $(".J_Bar").xBar({
            navItemCls: ".nav-item", // 触发项类名
            barCls: ".follow-bar", // bar类名
            activeCls: "nav-item-active", // 激活时类名
            activeIndex: 0, // 默认激活第 n 项
            offsetT: -6, // 距顶部的微调偏移量，如有下边框时适度向下偏移
            offsetL: 0, // 距左侧的微调偏移量
            stretchW: 0 // bar 宽度微调
        });
    }
    $("#J_BackHomeNoNav").addClass("hidden");
    if (!($(".section-nav").exist())) {
        $("#J_BackHomeNoNav").removeClass("hidden");
    }
});
