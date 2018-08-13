<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
							<div class="inputbox_yzm">
								<input id="vcode" name="vcode" placeholder="请输入验证码"/>
								<img id="validateCodeImg" src="${contextPath}/user/verifyCode" onclick="changeVerifyCode()">
								<p id="erorrMsg">${error_msg}</p>
							</div>
</body>
	<script>
		function changeVerifyCode(){  
			document.getElementById("validateCodeImg").src="${contextPath}/user/verifyCode?t="+Math.random();  
		}
	</script>
</html>