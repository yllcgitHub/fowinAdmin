package com.manage.controller.bam;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.jfinal.kit.Kv;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Page;
import com.manage.common.ExportUtils;
import com.manage.common.annotation.Controller;
import com.manage.common.envm.CommnTypeUtils.LoginType;
import com.manage.common.vo.UserVo;
import com.manage.controller.app.BaseController;
import com.manage.dao.model.Menu;
import com.manage.dao.model.User;
import com.manage.dao.model.UserBase;
import com.manage.service.UserService;
import com.manage.tool.Md5Util;
import com.manage.tool.ToolString;


@Controller(controllerKey = "/bam/user")
public class AdminUserController extends BaseController {
	
	public void toListPage(){
		
		render("/jsp/userList.jsp");
	}
	
	public void toAddUser(){
		String id = getPara("id");
		if(StrKit.notBlank(id)){
			User user = User.dao.findById(id);
			setAttr("updateUser", user);
		}
		render("/jsp/updateUser.jsp");
	}
	
	
	/**
	 * 后台管理员登录
	 */
	public void login(){
		String username = getPara("login_name");
		String password = getPara("login_pwd");
		password = Md5Util.encode(password);
		
		User user = User.dao.findFirst("select password, type, user_name from user where  user_name=? ", username);
		if(user == null){
			setAttr("loginNameMsg", "用户名不存在");
			super.render("/jsp/login.jsp");
			return ;
		}
		if(!LoginType.BAM.equals(user.getType())){
			setAttr("loginNameMsg", "请用管理员身份登录");
			super.render("/jsp/login.jsp");
			return ;
		}
		if( !password.equals(user.getPassword())) {
			setAttr("passwordMsg", "密码错误");
			super.render("/jsp/login.jsp");
			return ;
		}
		
		super.getSession().setAttribute("admin", user);
		setAttr("userName", user.getUserName());
		List<Menu> menuList = Menu.dao.find("select * from menu where level=1");
		
		setAttr("sysModuleGroupList", menuList);
		setAttr("tourl", "bam/user/toListPage");
		setAttr("tabName", "用户主页");
		//其它用户跳转
		render("/jsp/index.jsp");
	}
	
	public void logout(){
		super.getSession().removeAttribute("admin");
		render("/jsp/login.jsp");
	}
	
	/**
	 * 跳转至修改密码页面
	 */
	public void toResetPassword(){
		String id = getPara("id");
		if(StrKit.notBlank(id)){
			User user = User.dao.findById(id);
			setAttr("user", user);
		}
		render("/jsp/resetPassword.jsp");
	}
	
	/**
	 * 修改密码
	 */
	public void resetPassword(){
		User user = getModel(User.class, "user");
		int id = user.getId();
		String password = user.getPassword();
		User userDb = User.dao.findById(id);
		userDb.setPassword(Md5Util.encode(password));
		userDb.update();
		renderJson(super.succ("修改成功"));
	}
	
	public void userList(){
		
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		
		String shareCode = getPara("shareCode");
		String phone = getPara("phone");
		String parentShareCode = getPara("parentShareCode");
		
		Kv cond = Kv.create();
		cond.set("shareCode", shareCode);
		cond.set("phone", phone);
		cond.set("parentShareCode", parentShareCode);
		
		Page<UserBase> pageList =null;
		try {
			pageList = UserService.service.getUserList(pageNumber, pageSize, cond);
		}catch(Exception e) {
			e.printStackTrace();
		}
		renderJson(pageList);
		
	}
	
	public void deleteUser(){
		int userId = getParaToInt("id");
		User.dao.deleteById(userId);
		renderJson(super.succ("保存成功"));
	}
	

	public void saveUser(){
		User user = getModel(User.class);
		user.setUpdateTime(new Date());
		if(user.getId() == null) {
			String password = user.getPassword();
			password = Md5Util.encode(password);
			user.setPassword(password);
			user.setCreateTime(new Date());
			user.setType(LoginType.USER);
			user.setStatus(1);
			user.save();
		} else {
			user.update();
		}
		renderJson(super.succ("保存成功"));
	}
	
	
	public void exports(){
		//获取要导出的数据
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		
		String shareCode = getPara("shareCode");
		String phone = getPara("phone");
		String parentShareCode = getPara("parentShareCode");
		
		Kv cond = Kv.create();
		cond.set("shareCode", shareCode);
		cond.set("phone", phone);
		cond.set("parentShareCode", parentShareCode);
		
		Page<UserBase> pageList =null;
		try {
			pageList = UserService.service.getUserList(pageNumber, Integer.MAX_VALUE, cond);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		List<UserVo> volist = new ArrayList<UserVo>();
		for(UserBase user :  pageList.getList()){
			UserVo vo = new UserVo();
			vo.setVipNo(user.getVipNo());
			vo.setPhone(user.getPhone());
			vo.setParentNo(user.getParentNo());
			vo.setParentShareCode(user.getStr("parentShareCode"));
			vo.setShareCode(user.getShareCode());
			vo.setShareNum(user.getShareNum().toString());
			vo.setEthAddr(user.getEthAddr());
			vo.setCreateTime(user.getCreateTime());
			vo.setNum(user.getStr("num"));
			vo.setBonusStatus(user.getBonusStatus()==0 ? "已发" : "未发");
			volist.add(vo);
		}
		
		if (ToolString.isNull(volist) || volist.size() <= 0) {
			UserVo vo = new UserVo();
			volist.add(vo);
		}

		//导出
		ExportUtils.export(super.getRequest(), super.getResponse(), volist,"用户基本信息", "user_bill");
		renderNull();
	}
}
