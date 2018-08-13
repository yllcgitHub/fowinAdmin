package com.manage.service;

import com.jfinal.kit.Kv;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.SqlPara;
import com.manage.common.annotation.MyTxProxy;
import com.manage.dao.model.LogAccountFree;
import com.manage.dao.model.UserBase;

/**
 * 后台用户管理
 * @author hp
 *
 */
public class UserService {

	public static final UserService service = MyTxProxy.newProxy(UserService.class);

	
	/**
	 * 获取用户信息列表
	 * @param pageNumber
	 * @param pageSize
	 * @param cond
	 */
	public Page<UserBase> getUserList(int pageNumber, int pageSize, Kv cond) {
		SqlPara sqlPara = Db.getSqlPara("user.getUserList", cond);
		Page<UserBase> orderPage = UserBase.dao.paginate(pageNumber, pageSize, sqlPara);
		return orderPage;
		
	}
	
	/**
	 * 获取自由账户明细列表
	 */
	public Page<LogAccountFree> getAccountFreeList(int pageNumber, int pageSize, Kv cond) {
		SqlPara sqlPara = Db.getSqlPara("user.getAccountFreeList", cond);
		Page<LogAccountFree> orderPage = LogAccountFree.dao.paginate(pageNumber, pageSize, sqlPara);
		return orderPage;
	}
	
}
