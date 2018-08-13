package com.manage.service;

import com.jfinal.kit.Kv;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.SqlPara;
import com.manage.common.annotation.MyTxProxy;
import com.manage.dao.model.User;
import com.manage.dao.model.UserBase;

/**
 * 后台用户管理
 * @author hp
 *
 */
public class UserService {

	public static final UserService service = MyTxProxy.newProxy(UserService.class);

	
	/**
	 * 抄码员获取订单列表
	 * @param pageNumber
	 * @param pageSize
	 * @param cond
	 */
	public Page<UserBase> getUserList(int pageNumber, int pageSize, Kv cond) {
		SqlPara sqlPara = Db.getSqlPara("user.getUserList", cond);
		Page<UserBase> orderPage = UserBase.dao.paginate(pageNumber, pageSize, sqlPara);
		return orderPage;
		
	}

}
