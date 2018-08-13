<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>后台管理</title>
<%@ include file="/jsp/commJSCSS.jsp" %> 
</head>
<body>
	<div class="layui-layout layout-admin">
		<div class="header bg-gradient-9">
			<div class="layui-main">
				<div class="admin-login-box">
					<a href="${contextPath}/datas/img/home_icon.png"> 
					</a>
				</div>
				<!--模块分组菜单-->
				<div class="beg-layout-main beg-layout-menu" id="menu">
					<ul class="layui-nav beg-layout-nav" lay-filter="topnavside">
					<c:forEach  var="sysModuleGroup" items="${sysModuleGroupList }" varStatus="status">
					<!-- 默认第一个选中 -->
					   <c:if test="${(status.index == 0)}">
					   <li class="layui-nav-item layui-this" value="${sysModuleGroup.id }">
							<a href="javascript:;">
								<i class="${sysModuleGroup.icon }" aria-hidden="true"></i> <cite>${sysModuleGroup.name }</cite>
							</a>
						</li>
					   </c:if>
					 <c:if test="${(status.index > 0)}">
					   <li class="layui-nav-item" value="${sysModuleGroup.id }">
							<a href="javascript:;">
								<i class="${sysModuleGroup.icon }" aria-hidden="true"></i> <cite>${sysModuleGroup.name }</cite>
							</a>
						</li>
					   </c:if>
					</c:forEach>
					</ul>

				</div>
				<!-- 登录个人信息 -->
				<ul class="layui-nav admin-header-item">
					<li class="layui-nav-item" id="gobackBtn">
					<a href="system/index"><i class="fa fa-home fa-6" style=" display: block;text-align: center; margin-top: 15px; font-size: 26px;" aria-hidden="true"></i><cite style="display:block;margin-top:-3px;line-height:30px;">返回首页</cite></a>
					</li>
					
					<li class="layui-nav-item">
					<a href="javascript:;"
						class="admin-header-user"> <img src="res/images/0.jpg" /> <span>${userName}</span>
					</a>
						<dl class="layui-nav-child">
							<dd>
								<a href="javascript:userInfo();"><i class="fa fa-user-circle"
									aria-hidden="true"></i> 个人信息</a>
							</dd>
							<dd>
								<a href="javascript:chgPassword();"><i class="fa fa-gear"
									aria-hidden="true"></i> 修改密码</a>
							</dd>
							<dd>
								<a href="bam/user/logout"><i class="fa fa-sign-out"
									aria-hidden="true"></i> 注销</a>
							</dd>
						</dl></li>
				</ul>
				<!-- 处理手机UI -->
				<ul class="layui-nav admin-header-item-mobile">
					<li class="layui-nav-item"><a href="system/logout"><i
							class="fa fa-sign-out" aria-hidden="true"></i> 注销</a></li>
				</ul>
			</div>
		</div>
		<!-- 左边导航 -->
		<div class="layui-side layui-bg-black" id="admin-side">
			<div class="layui-side-scroll" id="admin-navbar-side"
				lay-filter="side" data-id=${contextPath}>
			</div>
		</div>

		<div class="layui-body"
			style="bottom: 0; border-left: solid 1px #e0e0e0;" id="admin-body">
			<div class="admin-side-toggle">
				<i class="fa fa-bars" aria-hidden="true"></i>
			</div>
			<div class="layui-tab admin-nav-card layui-tab-brief"
				lay-filter="admin-tab">
				<ul class="layui-tab-title">
					<li class="layui-this"><i class="fa fa-dashboard"
						aria-hidden="true"></i> <cite>${tabName }</cite></li>
				</ul>
				<!-- 内容展示区 begin -->
				<div class="layui-tab-content"
					style="min-height: 150px; padding: 5px 0 0 0;">
					<div class="layui-tab-item layui-show">
						<iframe id="rightiframe" src="${tourl}"></iframe>
					</div>
				</div>
				<!-- 内容展示区 end -->
			</div>
		</div>
		<!-- footer begin -->
		<div class="layui-footer footer footer-demo" id="admin-footer">
			<div class="layui-main">
				<p>
<!-- 					2018 &copy; <a href="#">http://www.starlinkunion.cn/</a> admin -->
				</p>
			</div>
		</div>

		<div class="site-tree-mobile layui-hide">
			<i class="layui-icon">&#xe602;</i>
		</div>
		<div class="site-mobile-shade"></div>
		<!-- footer end -->
	</div>
	<script type="text/javascript" src="${contextPath}/res/js/index.js"></script>
	<script type="text/javascript" src="${contextPath}/res/js/ajaxPage.js"></script>
	<script type="text/javascript">
	var c = $('#admin-navbar-side').data('id');
	var langCookieKey="selectlangauge";
	$(function(){
		var selectlangtype=getCookie(langCookieKey);
		if (typeof(selectlangtype) == "undefined"){ 
			//默认设置中文
			setCookie(langCookieKey,1,7);
			selectlangtype=getCookie(langCookieKey);
		}
		setlangauge(selectlangtype);
		setGoBackBtn();
	});
	function setGoBackBtn(){
		var tourl = GetQueryString("tourl");
		if(null==tourl){
		$("#gobackBtn").hide();
		}else{
		$("#gobackBtn").show();
		}
	}

	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	function setlangauge(langtype){
		var cookielangtype=getCookie(langCookieKey);
		if (langtype!=cookielangtype) {
			//询问框
			layer.confirm('您确定需要切换语言吗？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
				changelangauge(langtype,1);
			}, function(){
			  return;
			});
		}else{
			changelangauge(langtype,0);
			return;
		}
	};
	
	function changelangauge(langtype,isClose){
		$("#selectedLangImg").attr("src","res/images/lang"+langtype+"_32.png");
		if (langtype==1) {
			$("#selectedLangText").html("&nbsp;简体中文");
		}
		if (langtype==2) {
			$("#selectedLangText").html("&nbsp;English(英语)");
		}
		if (langtype==3) {
			$("#selectedLangText").html("&nbsp;Монгол(蒙语)");
		}
		if (langtype==4) {
			$("#selectedLangText").html("&nbsp;русский(俄语)");
		}
		if (langtype==5) {
			$("#selectedLangText").html("Tiếng Việt(越南语)");
		}
		setCookie(langCookieKey,langtype,7);
		if (isClose==1) {
		//关闭所有TAB标签
		layui.config({
		base: 'res/layui/plugins/'
		}).use(['element', 'tab'], function() {
			var element = layui.element(),
				$ = layui.jquery,
				tab = layui.tab({
					elem: '.admin-nav-card' //设置选项卡容器
				});
			tab.closeAll();
		});
		layer.msg('语言切换成功!', {icon: 1});
		document.getElementById('rightiframe').contentWindow.location.reload(true);
		}
	};
	
	function userInfo() {
		$.ajax({
			url : "system/user/toUserInfo",
			type : "post",
			async : false,
			success : function(result) {//返回数据根据结果进行相应的处理  
				if(result.msg== undefined || result.msg== 'undefined'){
					layer.open({
						type : 1,
						title : '用户信息',
						content : result,
						//btn : [ '保存', '取消' ],
						area : [ '800px', '680px' ],
						maxmin : true,
						end : function() {
							refresh();
						},
						full : function(elem) {
							var win = window.top === window.self ? window
									: parent.window;
						}
					});
				}else{
					layer.msg(result.msg);
				}
				
			}
		});
	};
	function chgPassword()
	{
		$.ajax({
			url : "system/user/toChangeUserPwd",
			type : "post",
			async : false,
			success : function(result) {//返回数据根据结果进行相应的处理  
				if(result.msg== undefined || result.msg== 'undefined'){
					layer.open({
						type : 1,
						title : '修改密码',
						content : result,
						//btn : [ '保存', '取消' ],
						area : [ '400px', '300px' ],
						maxmin : true,
						end : function() {
						},
						full : function(elem) {
							var win = window.top === window.self ? window
									: parent.window;
						}
					});
				}else{
					layer.msg(result.msg);
				}
				
			}
		});
	}
	</script>
	<div id="titleClickMenu"
		class="layui-layer-page layui-layer-dir layer-anim"
		style="color: #009688; z-index: 19891015; display: none; position: fixed; background: #fff;">
		<div class="layui-layer-content">
			<ul class="layui-layer-wrap" style="display: block;">
				<li id="closeAll"><a href="javascript:void(0);"><i
						style="color: #009688; line-height: 26px;"
						class="fa fa-times-circle-o"></i><cite>关闭全部</cite></a></li>
				<li id="closeOther"><a href="javascript:void(0);"><i
						style="color: #009688; line-height: 26px;"
						class="fa fa-times-circle"></i><cite>关闭其他</cite></a></li>
			</ul>
		</div>
	</div>
</body>
</html>