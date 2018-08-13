package com.manage.common.plugin;

import java.util.List;

import com.google.common.collect.Lists;
import com.jfinal.config.Routes;
import com.jfinal.log.Log4jLog;
import com.jfinal.plugin.IPlugin;
import com.manage.common.annotation.Controller;
import com.manage.controller.app.BaseController;
import com.manage.tool.ToolClass;


/**
* @Title: ControllerPlugin.java 
* @Package hanya.web.base.system.plugin 
* @Description: TODO(扫描Controller上的注解，绑定Controller和controllerKey) 
* @author xiaofu
* @date 2016年5月27日 上午11:32:02 
* @version V1.0
 */
public class ControllerPlugin implements IPlugin {

	private static Log4jLog log = Log4jLog.getLog(ControllerPlugin.class);
    
    private Routes me;

	public ControllerPlugin(Routes me){
		this.me = me;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public boolean start() {
		// 查询所有继承BaseController的类
		List<Class> controllerClasses = Lists.newArrayList();
//		controllerClasses.add(UserController.class);
		controllerClasses.addAll(ToolClass.getAllClassByInterface(BaseController.class));
		
		// 循环处理自动注册映射
		for (Class controller : controllerClasses) {
			// 获取注解对象
			Controller controllerBind = (Controller) controller.getAnnotation(Controller.class);
			if (controllerBind == null) {
				log.error(controller.getName() + "继承了BaseController，但是没有注解绑定映射路径");
				continue;
			}

			// 获取映射路径数组
			String[] controllerKeys = controllerBind.controllerKey();
			for (String controllerKey : controllerKeys) {
				controllerKey = controllerKey.trim();
				if(controllerKey.equals("")){
					log.error(controller.getName() + "注解错误，映射路径为空");
					continue;
				}
				// 注册映射
				me.add(controllerKey, controller);
				log.info("Controller注册： controller = " + controller + ", controllerKey = " + controllerKey);
			}
		}
		return true;
	}

	public boolean stop() {
		return true;
	}

	
}
