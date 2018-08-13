/**
 * Created by ipqhjjybj on 14-3-7.
 */
;(function($){

    var $bottomScrollLoading;
    $.fn.bottomScrollLoading = function(settings){
        return this.each(function(){
            $bottomScrollLoading.init($(this), settings);
        });
    };
    $bottomScrollLoading = $.bottomScrollLoading = {
        init: function(outer, settings){
            this.appendTo = settings.appendTo | $("body");
            this.outer = outer;                 //这是滚动的视图
            this.range = settings.range || -700; //距下边界长度/单位px
            this.maxnum = settings.maxnum || 20; //设置加载最多次数
            this.ajaxData = settings.ajaxData || {};
            this.isLoading = false;
            this.num = 1;
            if ('undefined' === typeof this.ajaxData.dataType || !$.inArray(this.ajaxData.dataType, ('html', 'json'))) {
                this.ajaxData.dataType = 'html';
            }

            this.tmp_success = this.ajaxData.success;
            this.ajaxData.success = function(ret){

                sl = $bottomScrollLoading;
                sl.isLoading = false;
                $("#ipq_loading").remove();

                if('function' === typeof sl.tmp_success){
                    sl.tmp_success(ret);
                }
            }
            $(this.outer).scroll(function(){
                var sl = $bottomScrollLoading;
                var scrollPos = $(this).scrollTop();
                var totalHeight = parseFloat($(sl.outer).height()) + parseFloat(scrollPos);
                if( (false === sl.isLoading) && ( $(document).height()-sl.range) <= totalHeight  && sl.num <= sl.maxnum){
                    sl.isLoading = true;
                    $("#content").append("<img id='ipq_loading' style='height: 60px; width: 60px; margin: 0 auto; margin-top: -60px; margin-left: 45%' src='/img/loading.gif'>");
                    sl.sendRequest();
                    sl.num = sl.num + 1;

                }
            });
        },
        sendRequest:function(){
            $.ajax(this.ajaxData);
        }
    }
})(jQuery);