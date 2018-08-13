package com.manage.controller.bam;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Page;
import com.manage.common.annotation.Controller;
import com.manage.controller.app.BaseController;
import com.manage.dao.model.Menu;

@Controller(controllerKey = "/bam/menu")
public class MenuController extends BaseController {
	
	/**
	 * 菜单列表 
	 */
	public void toListPage(){
		render("/jsp/menuList.jsp");
	}
	
	/**
	 * 菜单列表 
	 */
	public void toAddMenu(){
		render("/jsp/updateMenu.jsp");
	}
	
	/**
	 * 菜单列表 
	 */
	public void toUpdateMenu(){
		int menuId = getParaToInt("id");
		Menu menu = Menu.dao.findById(menuId);
		
		setAttr("menu", menu);
		render("/jsp/updateMenu.jsp");
	}
	
	/**
	 * 菜单列表 
	 */
	public void list(){
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		String menuName = getPara("name");
		if(menuName == null){
			menuName = "";
		}
		
		Page<Menu> pageList = Menu.dao.paginate(
														pageNumber, 
														pageSize, 
														"select * ", 
														"from menu where name like '%"+menuName+"%'" 
														);
		
		renderJson(pageList);
	}
	
	public void saveMenu(){

		Menu Menu = getModel(Menu.class,"menu");
		Menu.setUpdateTime(new Date());
		
		if(Menu.getId() == null) {
			Menu.setCreateTime(new Date());
			Menu.save();
		} else {
			Menu.update();
		}
		
		renderJson(super.succ("保存成功"));
	}

	/**
	 * 构建菜单树
	 */
	public void tree(){
		
		List<Map<String,Object>> menuMapList = new ArrayList<Map<String,Object>>();
		
		List<Menu> sysModuleList = Menu.dao.find("select * from menu where level=2");
		
		for (Menu sysModule : sysModuleList) {
				Map<String,Object> menuMap = new HashMap<String, Object>();
				menuMap.put("title", sysModule.getName());
				menuMap.put("icon", sysModule.getIcon());
				menuMap.put("spread", false);
				List<Menu> sysFunctionGroupList =  Menu.dao.find("select * from menu where pid=?", sysModule.getId());
				
				List<Map<String,Object>> sysFunctionGroupMapList =  new ArrayList<Map<String,Object>>();
				for (Menu sysFunctionGroup : sysFunctionGroupList) {
					Map<String,Object> sysFunctionGroupMap = new HashMap<String, Object>();
					sysFunctionGroupMap.put("title", sysFunctionGroup.getName());
					sysFunctionGroupMap.put("icon", sysFunctionGroup.getIcon());
//					String contextpath = ToolWeb.getContextPath(getRequest());
//					sysFunctionGroupMap.put("href", contextpath+sysFunctionGroup.getUrl());
					sysFunctionGroupMap.put("href", sysFunctionGroup.getUrl());
					sysFunctionGroupMapList.add(sysFunctionGroupMap);
				}
				menuMap.put("children", sysFunctionGroupMapList);
				menuMapList.add(menuMap);
		}
		renderJson(menuMapList);
	}
	
}
