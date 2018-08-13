<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<title>后台管理系统-登录</title>
		<meta charset="utf-8">
		<base href="${contextPath}/">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" href="res/layui/css/layui.css" media="all" />
		<link rel="stylesheet" href="res/css/login.css" />
        <link rel="stylesheet" href="res/css/global.css" media="all">
	</head>
	<body class="beg-login-bg">
		<div class="beg-login-box">
			<div class="shengda-logo"></div>
			<div class="beg-login-main">
				<form action="bam/user/login" class="layui-form" method="post">
					<div class="layui-form-item">
						<label class="beg-login-icon icon-login">
                      	  <i class="layui-icon"></i>
                   		 </label>
						<input type="text" name="login_name"  lay-verify="login_name" autocomplete="off" placeholder="这里输入登录名" value="${login_name }" class="layui-input">
						${loginNameMsg}  
					</div>
					<div class="layui-form-item">
						<label class="beg-login-icon icon-password">
                        <i class="layui-icon"></i>
                    </label>
						<input type="password" name="login_pwd" lay-verify="login_pwd" autocomplete="off" placeholder="这里输入密码" value="" class="layui-input">
						${passwordMsg}
					</div>
					<div class="layui-form-item">
<!-- 						<div class="beg-pull-left beg-login-remember"> -->
<!-- 							<label>一周内自动登录</label> -->
<!-- 							<input type="checkbox" name="rememberme" value="1" lay-skin="switch" checked title="记住帐号"> -->
<!-- 						</div> -->
<!-- 						<div class="beg-pull-right"> -->
<!-- 							<a class="forget-pass" href="javascript:;">忘记密码?</a> -->
<!-- 						</div> -->
						<div class="beg-clear"></div>
						<div class="">
							<button class="layui-btn layui-btn-primary" lay-submit lay-filter="login">
                            登&nbsp;&nbsp;录
                       		 </button>
						</div>
					</div>
				</form>
			</div>
<!-- 			<footer>
				<p>HanYa Star © www.hanyastar.cn</p>
			</footer> -->
		</div>
		<script type="text/javascript" src="res/layui/layui.js"></script>
		<script>
			function getQueryString(name) {
				var url=decodeURI(location.href);
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return decodeURI(r[2]);
				return null;
			};
			layui.use(['layer', 'form'], function() {
				var layer = layui.layer,
					$ = layui.jquery,
					form = layui.form();
					form.verify({
						login_name: function(value){
						    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
						      return '用户名不能有特殊字符';
						    }
						    if(/(^\_)|(\__)|(\_+$)/.test(value)){
						      return '用户名首尾不能出现下划线\'_\'';
						    }
						  }
						  ,login_pwd: [
						    /^[\S]{6,20}$/
						    ,'密码必须6到20位，且不能出现空格'
						  ] 
						});  
					form.on('submit(login)',function(data){
					return true;
				});
					var login_name_errmsg = getQueryString("login_name_errmsg");
					if(login_name_errmsg != null && login_name_errmsg != undefined){
						parent.layer.msg(login_name_errmsg);
					}
			});
		</script>
	</body>

</html>