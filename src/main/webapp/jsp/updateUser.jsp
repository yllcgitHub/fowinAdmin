<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>编辑用户</title>

</head>
<body>
	<form class="layui-form" id="userFrom" method="post">
		<input type="hidden" name="userBase.id" value="${updateUser.id}" id="userId" />

		<div class="layui-form-item">
			<label class="layui-form-label">手机号:</label>
			<div class="layui-input-block">
				<input type="text" name="userBase.phone" lay-verify="required"  
				<c:if test="${updateUser.phone !=null}">disabled="disabled"</c:if>
					autocomplete="off" placeholder="请输入手机号" class="layui-input" value="${updateUser.phone }"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">身份证号:</label>
			<div class="layui-input-block">
				<input type="text" name="userBase.id_card"
					 lay-verify="required"  autocomplete="off" placeholder="请输入身份证号" class="layui-input" value="${updateUser.idCard}"/>
			</div>
		</div>
		
		<div class="layui-form-item">
			<label class="layui-form-label">用户姓名:</label>
			<div class="layui-input-block">
				<input type="text" name="userBase.real_name"
					 lay-verify="required"  autocomplete="off" placeholder="请输入用户姓名" class="layui-input" value="${updateUser.realName}"/>
			</div>
		</div>	
		
		<div class="layui-form-item">
			<label class="layui-form-label">分红比例:</label>
			<div class="layui-input-block">
				<input type="text" name="userBase.share_bonus_rate"
				   lay-verify="required"  autocomplete="off" placeholder="请输入分红比例" class="layui-input" value="${updateUser.shareBonusRate}"/>
			</div>
		</div>		
		
		<div class="layui-form-item">
			<label class="layui-form-label">锁仓币总数:</label>
			<div class="layui-input-block">
				<input type="text" name="userBase.lock_num"
				   lay-verify="required"  autocomplete="off" placeholder="请输入锁仓币总数" class="layui-input" value="${updateUser.lockNum}"/>
			</div>
		</div>					
		
<!-- 	  <div class="layui-form-item"> -->
<!-- 	    <label class="layui-form-label">用户状态:</label> -->
<!-- 	    <div class="layui-input-block"> -->
<!-- 	      <select name="user.status" lay-verify="required"> -->
<!-- 	        <option value=""></option> -->
<%-- 	        <option value="1" <c:if test="${updateUser.status eq '1' }">selected=selected</c:if> >已启用</option> --%>
<%-- 	        <option value="0"  <c:if test="${updateUser.status eq '0' }">selected=selected</c:if>  >已冻结</option> --%>
<!-- 	      </select> -->
<!-- 	    </div> -->
<!-- 	  </div>	 -->

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