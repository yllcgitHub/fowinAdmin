package com.manage.common;

import javax.servlet.http.HttpSession;

import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.manage.controller.app.UserController;
import com.manage.controller.bam.HomeController;
import com.manage.dao.model.User;

public class AuthInterceptor implements com.jfinal.aop.Interceptor{
	
	String[] passActionKey = new String[] { 
			"/system", 
			"/bam/user/login",
			"/system/toLogin",
			"/user/sendSms",
			"/user/loginOut"
			};

	@Override
	public void intercept(Invocation inv) {
		HttpSession session = inv.getController().getSession();
		Controller controller = inv.getController();
		
		// 不需要拦截的ActionKey
		for (String key : passActionKey) {
			if (key.equals(inv.getActionKey())) {
				inv.invoke();
				return;
			}
		}
		
		// 前端不被拦截
		String controllerPath = controller.getClass().getResource("").getFile();
		
		String appPath = UserController.class.getResource("").getFile();
		if(controllerPath.equals(appPath)){
			inv.invoke();
			return;
		}
		
		// 登录后台系统时不被拦截
		String sysPath = HomeController.class.getResource("").getFile();
		
		User admin = (User)session.getAttribute("admin");
		
		if (admin != null && controllerPath.equals(sysPath)) {
			inv.invoke();
			return;
		}
		
		
		// 后台登录失效并调用后台接口时,强制退出到后台登录界面
		if (admin == null && controllerPath.equals(sysPath)) {
			inv.getController().redirect(com.manage.common.Cons.SERVER_DOMAIN + "/system/toLogin");
			return;
		}
	}

}
