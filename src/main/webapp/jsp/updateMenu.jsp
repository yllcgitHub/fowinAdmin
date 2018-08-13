<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>更新菜单</title>

</head>
<body>
	<form class="layui-form" id="menuFrom" method="post">
		<input type="hidden" name="menu.id" value="${menu.id}" id="menuId" />

		<div class="layui-form-item">
			<label class="layui-form-label">菜单名称:</label>
			<div class="layui-input-block">
				<input type="text" name="menu.name" lay-verify="menuName"  
					autocomplete="off" placeholder="请输入菜单名称" class="layui-input" value="${menu.name }"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">菜单URL</label>
			<div class="layui-input-block">
				<input type="text" name="menu.url"
					lay-verify="required" autocomplete="off" placeholder="请输入菜单url" class="layui-input" value="${menu.url}"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">菜单父ID:</label>
			<div class="layui-input-block">
				<input type="text" name="menu.pid"
					lay-verify="required" autocomplete="off" placeholder="请输入菜单父ID" class="layui-input" value="${menu.pid}"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">菜单等级:</label>
			<div class="layui-input-block">
				<input type="text" name="menu.level"
					lay-verify="required" autocomplete="off" placeholder="请输入菜单等级" class="layui-input" value="${menu.level}"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">菜单ICON:</label>
			<div class="layui-input-block">
				<input type="text" name="menu.icon"
					lay-verify="required" autocomplete="off" placeholder="请输入菜单ICON" class="layui-input" value="${menu.icon}"/>
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
		
		var url = '${contextPath}/bam/menu/saveMenu';
		
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
