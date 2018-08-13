/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */
layui.config({
	base: 'res/layui/plugins/'
}).use(['element', 'layer', 'navbar', 'tab'], function() {
	var element = layui.element(),
		$ = layui.jquery,
		layer = layui.layer,
		navbar = layui.navbar(),
		tab = layui.tab({
			elem: '.admin-nav-card' //设置选项卡容器
		});
	//iframe自适应
	$(window).on('resize', function() {
		var $content = $('.admin-nav-card .layui-tab-content');
		$content.height($(this).height() - 147);
		$content.find('iframe').each(function() {
			$(this).height($content.height());
		});
	}).resize();

	//设置navbar
	var	contextPath = $('#admin-navbar-side').data('id');
	if(contextPath){
		localStorage.setItem("contextPath",contextPath);
	} else {
		contextPath = localStorage.getItem("contextPath");
	}
	
	navbar.set({
		elem: '#admin-navbar-side',
		/*data: navs
		cached:true,*/
		url: contextPath + '/bam/menu/tree'
	});
	//渲染navbar
	navbar.render();
	//监听点击事件
	navbar.on('click(side)', function(data) {
		//layer.msg(tab.exists(data.field.title)+";data.title:"+data.field.title);
		var i =0;
		if(tab.exists(data.field.title)==-1){
			i = show_loading_layer(); 
		}
		var result = tab.tabAdd(data.field);
		if(result==1){
			close_loading_layer(i);
		}
	});
	 //监听导航点击
	
	element.on('nav(topnavside)', function(elem){
		var topvalue = elem[0];
		//var group_zhcn_name=elem.text();
		var module_group_id = topvalue.value;
	    //console.log("module_group_id:"+module_group_id);
	  //设置navbar
		navbar.set({
			elem: '#admin-navbar-side',
			/*data: navs
			cached:true,*/
			url: contextPath +'/bam/menu/tree?module_group_id='+module_group_id
		});
		//渲染navbar
		navbar.render();
		//监听点击事件
		navbar.on('click(side)', function(data) {
			var i =0;
			if(tab.exists(data.field.title)==-1){
				i = show_loading_layer(); 
			}
			var result = tab.tabAdd(data.field);
			if(result==1){
				close_loading_layer(i);
			};
		});
	  });
	$('.admin-side-toggle').on('click', function() {
		var sideWidth = $('#admin-side').width();
		if(sideWidth === 200) {
			$('#admin-body').animate({
				left: '0'
			}); //admin-footer
			$('#admin-footer').animate({
				left: '0'
			});
			$('#admin-side').animate({
				width: '0'
			});
		} else {
			$('#admin-body').animate({
				left: '200px'
			});
			$('#admin-footer').animate({
				left: '200px'
			});
			$('#admin-side').animate({
				width: '200px'
			});
		}
	});
	function show_loading_layer(){  
        return layer.load(2, {shade: false,scrollbar: false, time:10000}); //0代表加载的风格，支持0-2
        //layer.msg('加载中，请稍候...', {icon: 16,shade: [0.5, '#AAAAAA'],scrollbar: false, time:100}) ;  
    }  
    function close_loading_layer(index){  
        layer.close(index);  
    }  
	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade');
	treeMobile.on('click', function() {
		$('body').addClass('site-mobile');
	});
	shadeMobile.on('click', function() {
		$('body').removeClass('site-mobile');
	});
});
document.oncontextmenu = function(){
	 window.event.returnValue=false;  
	 return false;
};
/**
 * 右键菜单dom
 */
//鼠标抬起如果有右击菜单隐藏它
document.onmouseup = function(event) {
	var menu = $("#titleClickMenu");
	if(menu) {
		 if(event.button !=2){
			 menu.hide();
		 }
	}
};
