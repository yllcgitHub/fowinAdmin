<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>分红释放</title>

</head>
<body>
	<form class="layui-form" id="userFrom" method="post">
		
		<div class="layui-form-item">
			<label class="layui-form-label">分红金额:</label>
			<div class="layui-input-block">
				<input type="text" name="shareBonusAmount"
				   lay-verify="required" id="shareBonusAmount" autocomplete="off" placeholder="请输入分红金额" class="layui-input"/>
			</div>
		</div>					
		

		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" type="button" lay-submit lay-filter="saveBtn">开始释放</button>
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
		var reg = /^(-?\d+)(\.\d+)?$/;
		var shareBonusAmount = $("#shareBonusAmount").val();
		if (!reg.test(shareBonusAmount)) {
			alert("请输入正确分红金额")
			return false;
		}
		
		parent.layer.confirm('分红金额'+shareBonusAmount+',确认要释放吗？', {
			btn : [ '确认', '取消' ], //按钮
			shade : false
		}, function() {
			var url = '${contextPath}/bam/user/shareBonusRelease';
			$.post(url, data.field, function(result) {
				if (result.message == "fail") {
					layer.closeAll();
					layer.msg(result.data);
				} else {
					layer.closeAll();
					layer.msg(result.msg);	
				}
			});
			
			return false;
		});

	});

	form.render();

</script>