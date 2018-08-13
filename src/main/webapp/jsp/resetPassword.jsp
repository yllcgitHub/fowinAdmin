<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>更新代理授信额度</title>

</head>
<body>
	<form class="layui-form" id="userFrom" method="post">
		<input type="hidden" name="user.id" value="${user.id}" id="userId" />

		<div class="layui-form-item">
			<label class="layui-form-label">新密码:</label>
			<div class="layui-input-block">
				<input type="text" name="user.password" placeholder="请输入新密码" class="layui-input" />
			</div>
		</div>
		
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" type="button" lay-submit lay-filter="saveBtn">提交</button>
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
		
		var url = '${contextPath}/bam/user/resetPassword';
		
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