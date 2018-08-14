package com.manage.controller.bam;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.kit.Kv;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.manage.common.ExportUtils;
import com.manage.common.annotation.Controller;
import com.manage.common.envm.CommnTypeUtils.LoginType;
import com.manage.common.vo.LogAccFreeVo;
import com.manage.common.vo.UserVo;
import com.manage.controller.app.BaseController;
import com.manage.dao.model.AccountFree;
import com.manage.dao.model.AccountLock;
import com.manage.dao.model.LogAccountFree;
import com.manage.dao.model.Menu;
import com.manage.dao.model.User;
import com.manage.dao.model.UserBase;
import com.manage.service.UserService;
import com.manage.tool.CommonConstant;
import com.manage.tool.DateFormat;
import com.manage.tool.Md5Util;
import com.manage.tool.ToolString;


@Controller(controllerKey = "/bam/user")
public class AdminUserController extends BaseController {
	
	public void toListPage(){
		
		render("/jsp/userList.jsp");
	}
	
	public void toAccFreeList(){
		render("/jsp/accountFreeList.jsp");
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
	 *自由账户明细 
	 */
	public void accFreeList(){
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		
		String vipNo = getPara("vipNo");
		
		Kv cond = Kv.create();
		cond.set("vipNo", vipNo);
		
		Page<LogAccountFree> pageList =null;
		try {
			pageList = UserService.service.getAccountFreeList(pageNumber, pageSize, cond);
		}catch(Exception e) {
			e.printStackTrace();
		}
		renderJson(pageList);
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
	 * 跳转至分红释放页面
	 */
	public void toShareBonusRelease(){
		render("/jsp/shareBonusRelease.jsp");
	}
	
	
	/**
	 * 跳转至锁仓释放页面
	 */
	public void toLockRelease(){
		render("/jsp/lockRelease.jsp");
	}
	
	/**
	 * 分红释放
	 */
	@Before(Tx.class)
	public void shareBonusRelease() throws Exception {
		Date currentDate = new Date();
		String createTime = DateFormat.dateToString(currentDate, CommonConstant.DateFormat.DatetimeFormat);
		String shareBonusAmountStr = getRequest().getParameter("shareBonusAmount"); //锁仓币释放比例
		if(ToolString.isNull(shareBonusAmountStr)){
			renderJson(super.fail("分红金额不能为空"));
			return;
		}
		
		UserBase uc = UserBase.dao.findFirst("select sum(share_bonus_rate) allShareRate from user_base ");
		double allShareRate = uc.getDouble("allShareRate");
		if(allShareRate > 1){
			renderJson(super.fail("用户总分红比例大于1,无法分配"));
			return;
		}
		
		BigDecimal shareBonusAmount = new BigDecimal(shareBonusAmountStr);  // 分红金额
		
		// 获取所有用户分红比例
		List<UserBase> userList = UserBase.dao.find("select * from user_base");
		
		// 按用户分红比例分配
		for(UserBase user : userList){
			String vipNo = user.getVipNo();
			
			BigDecimal shareRate = new BigDecimal(user.getShareBonusRate()); // 用户分红比例
			
			// 获取用户锁仓账户信息
			AccountFree accFre = AccountFree.dao.findFirst(" select * from account_free where vip_no=? ", user.getVipNo());
			
			BigDecimal releaseNum = shareBonusAmount.multiply(shareRate); // 释放额度
			
			// 增加自由账户余额
			BigDecimal beforeFreeBalance = new BigDecimal(accFre.getFreeBalance()); //释放前自由账户余额
			String afterFreeBalance =  ToolString.BALANCE_FORMAT.format(beforeFreeBalance.add(releaseNum)); // 释放后自由账户余额
			accFre.setFreeBalance(afterFreeBalance);
			accFre.setUpdateTime(currentDate);
			if(!accFre.update()){
				throw new SQLException("增加自由账户余额失败");
			}
			
			// 添加用户自由账户明细
			LogAccountFree logAccount = new LogAccountFree();
			logAccount.setVipNo(vipNo);
			logAccount.setCreateTime(currentDate);
			logAccount.setBeforeBalance( ToolString.BALANCE_FORMAT.format(beforeFreeBalance));
			logAccount.setTradeBalance( ToolString.BALANCE_FORMAT.format(releaseNum));
			logAccount.setAfterBalance(afterFreeBalance);
			logAccount.setTradeType(CommonConstant.TradeType.LOCK_RELEASE);
			logAccount.setLogType(CommonConstant.LogType.IN);
			logAccount.setRemark("分红释放");
			if (!logAccount.save()) {
				throw new SQLException("增加自由账户明细失败");
			}
		}
		
		renderJson(succ(null));
	}
	
	/**
	 * 锁仓释放
	 * @throws SQLException 
	 */
	@Before(Tx.class)
	public void lockRelease() throws Exception{
		Date currentDate = new Date();
		String createTime = DateFormat.dateToString(currentDate, CommonConstant.DateFormat.DatetimeFormat);
		String lockReleaseRateStr = getRequest().getParameter("lockReleaseRate"); //锁仓币释放比例
		if(ToolString.isNull(lockReleaseRateStr)){
			renderJson(super.fail("释放比例不能为空"));
			return;
		}
		
		BigDecimal lockReleaseRate = new BigDecimal(lockReleaseRateStr);
		
		if(Double.parseDouble(lockReleaseRateStr) > 1){
			renderJson(super.fail("释放比例不能大于1"));
			return;
		}
		
		// 获取所有用户锁仓币总数
		List<UserBase> userList = UserBase.dao.find("select * from user_base");
		
		// 以用户锁仓币总数为基数按比例释放锁仓币到用户的自由账户
		for(UserBase user : userList){
			BigDecimal lockNum = new BigDecimal(user.getLockNum()); // 用户锁仓币总数
			
			String vipNo = user.getVipNo();
			
			// 获取用户锁仓账户信息
			AccountLock accLok = AccountLock.dao.findFirst(" select * from account_lock where vip_no=? ", user.getVipNo());
			
			if (Double.parseDouble(accLok.getLockBalance()) == 0) {
				continue; 
			}
			
			// 扣除锁仓账户余额
			BigDecimal releaseNum = lockNum.multiply(lockReleaseRate); // 释放额度
			ToolString.BALANCE_FORMAT.format(releaseNum); // 释放额度
			BigDecimal beforeLockBalance = new BigDecimal(accLok.getLockBalance()); //释放前锁仓账户余额
			
			// 如果释放后的锁仓账户余额小于等于0,则全部释放
			BigDecimal afterLockBalanceNum = beforeLockBalance.subtract(releaseNum);
			if(Double.parseDouble(String.valueOf(afterLockBalanceNum)) <= 0){
				afterLockBalanceNum = new BigDecimal(0);
				releaseNum = beforeLockBalance;
			}
			
			String afterLockBalance = ToolString.BALANCE_FORMAT.format(beforeLockBalance.subtract(releaseNum)); // 释放后锁仓账户余额
			accLok.setUpdateTime(currentDate);
			accLok.setLockBalance(afterLockBalance);
			if(!accLok.update()){
				throw new SQLException("扣除锁仓账户余额失败");
			}
			
			// 获取用户自由账户信息
			AccountFree accFre = AccountFree.dao.findFirst(" select * from account_free where vip_no=? ", user.getVipNo());
			
			// 增加自由账户余额
			BigDecimal beforeFreeBalance = new BigDecimal(accFre.getFreeBalance()); //释放前自由账户余额
			String afterFreeBalance =  ToolString.BALANCE_FORMAT.format(beforeFreeBalance.add(releaseNum)); // 释放后自由账户余额
			accFre.setFreeBalance(afterFreeBalance);
			accFre.setUpdateTime(currentDate);
			if(!accFre.update()){
				throw new SQLException("增加自由账户余额失败");
			}
			
			// 添加用户自由账户明细
			LogAccountFree logAccount = new LogAccountFree();
			logAccount.setVipNo(vipNo);
			logAccount.setCreateTime(currentDate);
			logAccount.setBeforeBalance( ToolString.BALANCE_FORMAT.format(beforeFreeBalance));
			logAccount.setTradeBalance( ToolString.BALANCE_FORMAT.format(releaseNum));
			logAccount.setAfterBalance(afterFreeBalance);
			logAccount.setTradeType(CommonConstant.TradeType.LOCK_RELEASE);
			logAccount.setLogType(CommonConstant.LogType.IN);
			logAccount.setRemark("锁仓释放");
			if (!logAccount.save()) {
				throw new SQLException("增加自由账户明细失败");
			}
			
		}
		
		renderJson(succ(null));
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
		
		String phone = getPara("phone");
		
		Kv cond = Kv.create();
		cond.set("phone", phone);
		
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
	
	@Before(Tx.class)
	public void saveUser() throws Exception{
		Date createTime = new Date();
		
		UserBase userBase = getModel(UserBase.class);
		userBase.setUpdateTime(createTime);
		String vipNo = this.getVipNo();
		if(userBase.getId() == null) {
			// 添加用户基础信息
			userBase.setCreateTime(createTime);
			userBase.setStatus(1);
			userBase.setVipNo(vipNo);
			userBase.setLockNum(ToolString.BALANCE_FORMAT.format(new BigDecimal(userBase
					.getLockNum())));
			
			if (!userBase.save()) {
				throw new SQLException("添加用户基础信息失败");
			}
			
			// 添加用户登录信息
			User user = new User();
			String password = Md5Util.encode("123456");
			user.setPassword(password);
			user.setType(LoginType.USER);
			user.setUserName(userBase.getPhone());
			user.setPhone(userBase.getPhone());
			user.setCreateTime(createTime);
			if (!user.save()) {
				throw new SQLException("添加用户登录信息失败");
			}
			
			// 添加用户锁仓账户
			AccountLock accLock = new AccountLock();
			accLock.setVipNo(vipNo);
			accLock.setCreateTime(createTime);
			accLock.setLockBalance(ToolString.BALANCE_FORMAT.format(new BigDecimal(userBase.getLockNum())));
			if (!accLock.save()) {
				throw new SQLException("添加用户锁仓账户失败");
			}
			
			// 添加用户自由账户
			AccountFree accFree = new AccountFree();
			accFree.setVipNo(vipNo);
			accFree.setCreateTime(createTime);
//			accFree.setFreeBalance(ToolString.BALANCE_FORMAT.format(userBase.getLockNum()));
			if (!accFree.save()) {
				throw new SQLException("添加用户自由账户失败");
			}
			
		}  else {
			userBase.update();
		}
		renderJson(super.succ("保存成功"));
	}
	
	public void exportsAccFree() throws Exception{
		//获取要导出的数据
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		
		String phone = getPara("phone");
		
		Kv cond = Kv.create();
		cond.set("phone", phone);
		
		Page<LogAccountFree> pageList =null;
		try {
			pageList = UserService.service.getAccountFreeList(pageNumber, Integer.MAX_VALUE, cond);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		List<LogAccFreeVo> volist = new ArrayList<LogAccFreeVo>();
		for(LogAccountFree logAccFree :  pageList.getList()){
			LogAccFreeVo vo = new LogAccFreeVo();
			vo.setVipNo(logAccFree.getVipNo());
			vo.setBeforeBalance(logAccFree.getBeforeBalance());
			vo.setTradeBalance(logAccFree.getTradeBalance());
			vo.setAfterBalance(logAccFree.getAfterBalance());
			vo.setType(logAccFree.getRemark());
			vo.setCreateTime(DateFormat.dateToString(logAccFree.getCreateTime(), CommonConstant.DateFormat.DatetimeFormat));
			volist.add(vo);
		}
		
		if (ToolString.isNull(volist) || volist.size() <= 0) {
			LogAccFreeVo vo = new LogAccFreeVo();
			volist.add(vo);
		}

		//导出
		ExportUtils.export(super.getRequest(), super.getResponse(), volist,"自由账户明细", "account_free_bill");
		renderNull();
	}
	
	
	public void exports() throws Exception{
		//获取要导出的数据
		int pageSize = super.getPcPageSize();
		int pageNumber = super.getPageNumber();
		
		String phone = getPara("phone");
		
		Kv cond = Kv.create();
		cond.set("phone", phone);
		
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
			vo.setIdCard(user.getIdCard());
			vo.setUserName(user.getRealName());
			vo.setShareBonusRate(user.getShareBonusRate());
			vo.setLockNum(user.getLockNum());
			vo.setLockBalance(user.getStr("lock_balance"));
			vo.setFreeBalance(user.getStr("free_balance"));
			vo.setCreateTime(DateFormat.dateToString(user.getCreateTime(), CommonConstant.DateFormat.DatetimeFormat));
			volist.add(vo);
		}
		
		if (ToolString.isNull(volist) || volist.size() <= 0) {
			UserVo vo = new UserVo();
			volist.add(vo);
		}

		//导出
		ExportUtils.export(super.getRequest(), super.getResponse(), volist,"用户信息", "user_bill");
		renderNull();
	}
	
	
	//生成vipNo
	private String getVipNo() {
		Record record = Db.findFirst("select getVipNo() vipNo from dual ");
		return record.getStr("vipNo");
	}
}
