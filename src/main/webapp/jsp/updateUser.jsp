<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>用户列表</title>

</head>
<body>
	<form class="layui-form" id="userFrom" method="post">
		<input type="hidden" name="user.id" value="${updateUser.id}" id="userId" />

		<div class="layui-form-item">
			<label class="layui-form-label">用户名:</label>
			<div class="layui-input-block">
				<input type="text" name="user.user_name" lay-verify="required"  
				<c:if test="${updateUser.userName !=null}">disabled="disabled"</c:if>
					autocomplete="off" placeholder="请输入用户名" class="layui-input" value="${updateUser.userName }"/>
			</div>
		</div>
		
		<c:if test="${updateUser.id == null }">
			<div class="layui-form-item">
				<label class="layui-form-label">密码:</label>
				<div class="layui-input-block">
					<input type="text" name="user.password"
						lay-verify="required" autocomplete="off" placeholder="请输入密码" class="layui-input" value=""/>
				</div>
			</div>
		</c:if>
		
<!-- 		<div class="layui-form-item"> -->
<!-- 			<label class="layui-form-label">手机号:</label> -->
<!-- 			<div class="layui-input-block"> -->
<!-- 				<input type="text" name="user.phone" -->
<%-- 					lay-verify="phone" autocomplete="off" placeholder="请输入手机号" class="layui-input" value="${updateUser.phone}"/> --%>
<!-- 			</div> -->
<!-- 		</div> -->
		
	  <div class="layui-form-item">
	    <label class="layui-form-label">用户状态:</label>
	    <div class="layui-input-block">
	      <select name="user.status" lay-verify="required">
	        <option value=""></option>
	        <option value="1" <c:if test="${updateUser.status eq '1' }">selected=selected</c:if> >已启用</option>
	        <option value="0"  <c:if test="${updateUser.status eq '0' }">selected=selected</c:if>  >已冻结</option>
	      </select>
	    </div>
	  </div>	

		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" type="button" lay-submit lay-filter="saveBtn">保存</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
			</div>
		</div>

	</form>
</body>
</html>
<script>
	var localHref = window.location.href;
	var contextPath = localHref;

	// 监听提交
	form.on('submit(saveBtn)', function(data) {
		
		var url = '${contextPath}/bam/user/saveUser';
		$.post(url, data.field, function(result) {
			if (result.status != "0") {
			}
			layer.closeAll();
			layer.msg(result.msg);
		});
		
		return false;
	});

	form.render();

</script>