package com.manage.controller.app;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.jfinal.aop.Before;
import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.manage.common.Cons;
import com.manage.common.annotation.Controller;
import com.manage.dao.model.UserBase;
import com.manage.tool.CommonConstant;
import com.manage.tool.DateFormat;
import com.manage.tool.ResultCode;
import com.manage.tool.ToolString;


/**
 * 用户管理 
 * @author hp
 *
 */
@Controller(controllerKey = "/user")
public class UserController extends BaseController {
	
	public void index() {
		render("/index.jsp");
	}

//	/**
//	 * 发送验证码
//	 */
//	public void sendSms(){
//		super.getResponse().addHeader("Access-Control-Allow-Origin","*");  
//		super.getResponse().addHeader("Access-Control-Allow-Methods","POST");  
//		super.getResponse().addHeader("Access-Control-Allow-Headers","x-requested-with,content-type"); 
//		
//		String phone = getPara("phone");
//		String resultCode = ResultCode.SUCCESS;
//		if(!StrKit.notBlank(phone)) {
//			resultCode = ResultCode.PARAM_IS_NULL;
//		} else {
//			Sms verSms = getModel(Sms.class);
//			String code = sms.generateString(); // 生成6为随机数
//			verSms.setPhone(phone);
//			verSms.setCreateTime(new Date());
//			verSms.setVerifyCode(code);  
//			verSms.setExpTime((new Date(new Date().getTime() + CommonConstant.smsExpTime))); // 5分钟
//			verSms.setStatus(1);
//			verSms.save();
//			System.out.println(sms.formatSendData(phone, CommonConstant.smsTitle, code));
//		}
//		renderJson(super.result(resultCode, null));
//	}
	
	
	/**
	 * 登录
	 */
	@Before(Tx.class)
	public void login() throws Exception{
		
		String phone = getPara("phone");
		String code = getPara("verCode"); 
		
		if(!StrKit.notBlank(phone) || !StrKit.notBlank(code)) {
			renderJson(super.result(ResultCode.PARAM_IS_NULL, null));
			return;
		}
		
//		//校验手机短信验证码
//		Sms sms = Sms.dao.findFirst("select * from sms where phone= ? and verify_code=? and status= ? ", phone, code, 1);
//		if(sms == null){
//			renderJson(super.result(ResultCode.VALIDATE_CODE_ERROR, null));
//			return;
//		}
		
//		//校验手机短信验证码是否已过期
//		if(sms.getExpTime().before(new Date())){
//			sms.setStatus(0);
//			sms.update();
//			renderJson(super.result(ResultCode.PHONE_IS_INVALIDATE, null));
//			return;
//		}
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		String currentTime = null;
		try {
		  currentTime = DateFormat.dateToString(new Date(), CommonConstant.DateFormat.YmdHHmmFormat);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		UserBase user = UserBase.dao.findFirst("select * from user_base where phone=? ", phone);
		if(user != null){
			//登录,通知前端,该手机号非第一次登录
			user.setLoginTimes(user.getLoginTimes() + 1);
			user.setUpdateTime(currentTime);
			user.update();
		} else {
			// 第一次登录,先注册
			UserBase lu = new UserBase();
			lu.setVipNo(this.getVipNo()); //生成vipNo
			lu.setPhone(phone);
			
			//获取推荐人编号,如果没有则不存
			String shareCode = getPara("invite");
			if(!ToolString.isNull(shareCode)){
				UserBase shareUser = UserBase.dao.findFirst("select * from user_base where shareCode=? " ,shareCode);	
				if (shareUser != null) {
					lu.setParentNo(shareUser.getVipNo());
				} else {
					renderJson(super.result(ResultCode.ERROR_SHARE_CODE, null));
					return;
				}
			}
			
			lu.setCreateTime(currentTime);
			lu.setLoginTimes(1);
			lu.setUpdateTime(currentTime);
			if(!lu.save()){
				throw new SQLException("第一次登录,系统注册失败");
			}
			
			//生成账户
//			AccountHda acc = new AccountHda();
//			acc.setVipNo(lu.getVipNo());
//			acc.setCreateTime(currentTime);
//			if(!acc.save()){
//				throw new SQLException("第一次登录,系统生成账户失败");
//			}
			
			user = UserBase.dao.findFirst("select * from user_base where phone=? ", phone);
	
		}
		
//		//操作成功后更新短信验证码状态
//		sms.setStatus(0);
//		sms.update();
		
		resultMap.put("user", user);
		super.getSession().setAttribute("user", user);
		renderJson(super.succ(resultMap));
	}
	
//	//绑定以太坊钱包地址
//	@Before(Tx.class)
//	public void bindEthAddr() throws Exception {
//		super.getResponse().addHeader("Access-Control-Allow-Origin", "*");
//		super.getResponse().addHeader("Access-Control-Allow-Methods", "POST");
//		super.getResponse().addHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
//
//		String vipNo = getPara("vipNo");
//		String ethAddr = getPara("ethAddr");
//		String currentTime = DateFormat.dateToString(new Date(),
//				CommonConstant.DateFormat.YmdHHmmFormat);
//
//		UserBase lu = UserBase.dao.findFirst(
//				"select * from user_base where vip_no=?", vipNo);
//		if (!ToolString.isNull(lu.getEthAddr())) {
//			renderJson(fail("该帐号已绑定钱包地址"));
//			return;
//		}
//
//		// 绑定钱包地址
//		lu.setEthAddr(ethAddr);
//		if (!lu.update()) {
//			throw new SQLException("绑定钱包地址失败");
//		}
//
//		AccountHda acc = AccountHda.dao.findFirst(
//				"select * from account_hda where vip_no=? ", lu.getVipNo());
//
//		// 发放初次绑定奖
//		if (acc.getFirstBonusTimes() <= 0) {
//			int oldNum = Integer.parseInt(acc.getNum());
//			int tradeNum = Integer.parseInt(Cons.BIND_ADDR_BONUS);;
//			int newNum = oldNum + tradeNum;
//
//			// 添加初次绑定奖流水
//			LogAccountHda lgAcc = new LogAccountHda();
//			lgAcc.setAccountId(acc.getAccountId());
//			lgAcc.setVipNo(lu.getVipNo());
//			lgAcc.setBeforeNum(String.valueOf(oldNum));
//			lgAcc.setTradeNum(String.valueOf(tradeNum));
//			lgAcc.setAfterNum(String.valueOf(newNum));
//			lgAcc.setTradeType("1"); // 交易类型 初次绑定奖
//			lgAcc.setCreateTime(currentTime);
//			lgAcc.setRemark("初次绑定奖");
//			if (!lgAcc.save()) {
//				throw new SQLException("添加初次绑定奖流水失败");
//			}
//
//			// 更新用户HDA代币数
//			acc.setNum(String.valueOf(newNum));
//			acc.setUpdateTime(currentTime);
//			acc.setFirstBonusTimes(acc.getFirstBonusTimes() + 1);
//
//			int bonusAmount = Integer.parseInt(acc.getBonusAmount()) + tradeNum; // 更新奖励总额
//			acc.setBonusAmount(String.valueOf(bonusAmount));
//			if (!acc.update()) {
//				throw new SQLException("更新用户HDA代币数失败");
//			}
//
//		}
//
//		renderJson(succ(null));
//	}
	
	
	//获取用户详情信息页数据
	public void getUserDetailData(){
		super.getResponse().addHeader("Access-Control-Allow-Origin","*");  
		super.getResponse().addHeader("Access-Control-Allow-Methods","POST");  
		super.getResponse().addHeader("Access-Control-Allow-Headers","x-requested-with,content-type"); 
		
		String vipNo = getPara("vipNo");
		Record record = Db
				.findFirst(
						"select a.shareNum, a.eth_addr ethAddr, a.shareCode, a.bonus_status, b.num from user_base a left join account_hda b on a.vip_no=b.vip_no where b.vip_no=? ",
						vipNo);

		int bonusStatus = record.get("bonus_status");
		if(bonusStatus == 0){
			record.set("num", "0");
		}
		
		String shareUrl = Cons.SHARE_URL + "?invite="+record.get("shareCode");
		record.set("shareUrl", shareUrl);
		renderJson(succ(record));
	}
	
	//提现
	public void withdrawCash(){
//		String vipNo = getPara("vipNo");
//		AccountHda acc = AccountHda.dao.findFirst("select * from account_hda where vip_no=?", vipNo);
//		acc.setStatus("1");  //更新为已提现状态
//		acc.update();
//		renderJson(succ(null));
	}
	
	
	/**
	 * 登出
	 */
	public void loginOut(){
		super.getSession().removeAttribute("phone");
		renderJson(super.result(ResultCode.SUCCESS, null));
	}
	
	//生成vipNo
	private String getVipNo() {
		Record record = Db.findFirst("select getVipNo() vipNo from dual ");
		return record.getStr("vipNo");
	}
	
//	//生成推荐码
//	private String getShareCode(){
//		String shareCode = "TMT" + ToolString.getStringRandom(6);
//		UserBase lu = UserBase.dao.findFirst("select 1 from user_base where shareCode=? ", shareCode);
//	    if(lu != null){
//	    	 return getShareCode();
//	    } else {
//	    	 return shareCode;
//	    }
//	}
}
