    var isShowAnalysisButton = true;
    $(function () {
        if(isShowAnalysisButton){//是否为特殊账号打开数据分析按钮
            $('.data-analysis-button').show();
        }else{
            $('.data-analysis-button').hide();
        }
        $(window).on('scroll', throttle(scrollHandler, 200));//滚动事件控制返回顶部按钮显隐
        $('.return-top-button').on('click',function(){
            $('body,html').animate({scrollTop:0},200);
        })
    })
    /**
     * 频率控制函数， fn执行次数不超过 1 次/delay
     * @param fn{Function}     传入的函数
     * @param delay{Number}    时间间隔
     * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
     *                         如果想忽略结束边界上的调用则传入 {trailing:false},
     * @returns {Function}     返回调用函数
     */
    function throttle(fn, delay, options) {
        var wait = false;
        if (!options) options = {};
        return function () {
            var that = this,
                args = arguments;
            if (!wait) {
                if (!(options.leading === false)) {
                    fn.apply(that, args);
                }
                wait = true;
                setTimeout(function () {
                    if (!(options.trailing === false)) {
                        fn.apply(that, args);
                    }
                    wait = false;
                }, delay);
            }
        }
    }

    function scrollHandler() {
        if ($(this).scrollTop() >= 300) {
            $('.return-top-button').show();
        }else{
            $('.return-top-button').hide();
        }

    }