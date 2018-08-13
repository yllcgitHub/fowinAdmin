package com.manage.controller.bam;

import java.util.List;

import com.manage.common.annotation.Controller;
import com.manage.common.envm.CommnTypeUtils.LoginType;
import com.manage.controller.app.BaseController;
import com.manage.dao.model.Menu;
import com.manage.dao.model.User;

@Controller(controllerKey = "/system")
public class HomeController extends BaseController {
	
	/**
	 * 系统首页
	 */
		public void index()
		{
			User loginSysUser = (User) super.getSession().getAttribute("admin");
			if ( loginSysUser == null || !LoginType.BAM.equals(loginSysUser.getType())) {
				render("/jsp/login.jsp");
			} else {
				setAttr("userName", loginSysUser.getUserName());
				List<Menu> menuList = Menu.dao.find("select * from menu where level=1");
				
				setAttr("sysModuleGroupList", menuList);
				setAttr("tourl", "bam/user/toListPage");
				setAttr("tabName", "用户主页");
				//其它用户跳转
				render("/jsp/index.jsp");
			}
		}
		
		/**
		 * 跳转至登录页面
		 */
		public void toLogin(){
			render("/jsp/login.jsp");
		}

}
