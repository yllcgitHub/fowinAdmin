package com.manage.tool;

public class ResultCode {

	public static String SUCCESS = "0000"; // 成功

	// 1000-1999页面错误提示
	public static String LOGIN_ERROR = "1001";						//错误信息：登陆工号或密码不正确
	public static String LOGIN_LOCK = "1002";						//错误信息：登陆工号被锁定
	public static String VALIDATE_CODE_ERROR = "1003";						//错误信息：验证码不正确
	public static String AUTHORITY_ERROR = "1004";						//错误信息：无权限，请更换账号登陆
	public static String LOGOUT_ERROR = "1005";						//错误信息：工号登出异常

	// 2000-3999业务数据异常
	public static String USER_CHECKVERTIFY_INVALID = "2001"; // 验证码错误
	public static String USER_NAME_IS_EXIST = "2002"; // 用户名已注册
	public static String PHONE_IS_EXIST = "2003"; // 电话号码已注册
	public static String PHONE_OR_PASSWORD_ERROR = "2004"; // 用户名或者密码错误
	public static String ORDER_IS_EXIST = "2005"; // 无法重复提交
	public static String ORDER_IS_OVER = "2006"; // 提交失败，认购已结束
	public static String USER_IS_FREEZE = "2007"; // 登陆失败，用户已冻结
	public static String APPLYNUM_TOO_MUCH = "2008"; // 提交失败，认购数量超出范围
	public static String CURRENCYADDRESS_IS_EXIST = "2009"; // 以太坊地址已经存在
	public static String BANK_CARD_IS_ONLY = "2010"; // 只能添加一張銀行卡
	public static String BANK_CARD_IS_EXIST = "2011"; // 该银行卡号已存在
	public static String APPLY_IS_PASS = "2012"; // 申请已经通过审核, 无法修改
	public static String USERNAME_IS_ERROR = "2013"; // 账号名只能为字母与数字
	public static String ETHADDRESS_IS_ERROR = "2014"; // 以太坊地址只能为字母与数字
	public static String PHONE_IS_ERROR = "2015"; // 电话号码格式错误
	public static String SYNBACK_IS_ERROR = "2016"; // 综合回馈点只能输入数字
	public static String SYNBACKADDRESS_IS_ERROR = "2017"; // 综合回馈点只能输入数字
	public static String USERNAME_OR_PHONE_IS_ERROR = "2018"; // 账号与电话号码不匹配
	public static String PASS_WORD_IS_EXIST  = "2019"; // 已设置密码
	public static String VALIDATE_CODE_IS_SEND  = "2020"; // 验证码已发送
	public static String VALIDATE_CODE_TOO_OFTEN  = "2021"; // 30秒内不能重复发送
	public static String PHONE_IS_NO_REG = "2022"; // 手机号未注册
	public static String PHONE_IS_FREEZE = "2023"; // 手机号已冻结
	public static String PHONE_IS_INVALIDATE = "2024"; //验证码已失效
	public static String ERROR_SHARE_CODE="2025"; //无效的邀请码
	
	
	// 公共错误
	public static String SYSTEM_IS_ERROR = "9999"; // 系统错误
	public static String PARAM_IS_NULL = "9998"; // 必填参数为空
	public static String PARAM_IS_INVALID = "9997"; // 参数无效
	public static String PHONE_FORMAT_ERROR = "9996"; // 手机号码格式错误
	public static String SIGN_IS_ERROR  = "9995"; // 签名错误
	public static String PARAM_IS_NULL_SIMPLIFIED  = "9994"; // 必填参数为空
	public static String PARAM_IS_INVALID_SIMPLIFIED = "9993"; // 参数无效
	public static String SYSTEM_IS_ERROR_SIMPLIFIED = "9993"; // 系统错误

	public static String getDescription(String codeID) {
		String codeDesc = null;
		if (codeID.equalsIgnoreCase(SUCCESS))
			codeDesc = "操作成功";
		
		else if (codeID.equalsIgnoreCase(USER_CHECKVERTIFY_INVALID))
			codeDesc = "驗證碼錯誤";
		else if (codeID.equalsIgnoreCase(USER_NAME_IS_EXIST))
			codeDesc = "用戶名已存在";
		else if (codeID.equalsIgnoreCase(PHONE_IS_EXIST))
			codeDesc = "電話號碼已註冊";
		else if (codeID.equalsIgnoreCase(PHONE_OR_PASSWORD_ERROR))
			codeDesc = "用戶名或者密碼錯誤";
		else if (codeID.equalsIgnoreCase(ORDER_IS_EXIST))
			codeDesc = "無法重複提交";
		else if (codeID.equalsIgnoreCase(USER_IS_FREEZE))
			codeDesc = "登陸失敗，用戶已凍結";
		else if (codeID.equalsIgnoreCase(ORDER_IS_OVER))
			codeDesc = "提交失敗，認購已結束";
		else if (codeID.equalsIgnoreCase(APPLYNUM_TOO_MUCH))
			codeDesc = "提交失敗，認購數量超出範圍";
		else if (codeID.equalsIgnoreCase(CURRENCYADDRESS_IS_EXIST))
			codeDesc = "以太坊地址已存在";
		else if (codeID.equalsIgnoreCase(BANK_CARD_IS_ONLY))
			codeDesc = "只能添加一張銀行卡";
		else if (codeID.equalsIgnoreCase(BANK_CARD_IS_EXIST))
			codeDesc = "該銀行卡號已存在";
		else if (codeID.equalsIgnoreCase(APPLY_IS_PASS))
			codeDesc = "申请已经通过审核, 无法修改";
		else if (codeID.equalsIgnoreCase(USERNAME_IS_ERROR))
			codeDesc = "账号名只能为字母与数字";
		else if (codeID.equalsIgnoreCase(ETHADDRESS_IS_ERROR))
			codeDesc = "以太坊地址只能为字母与数字";
		else if (codeID.equalsIgnoreCase(SYNBACKADDRESS_IS_ERROR))
			codeDesc = "综合回馈点地址只能为字母与数字";
		else if (codeID.equalsIgnoreCase(PHONE_IS_ERROR))
			codeDesc = "电话号码格式错误";
		else if (codeID.equalsIgnoreCase(SYNBACK_IS_ERROR))
			codeDesc = "综合回馈点只能输入数字和小数点";
		else if (codeID.equalsIgnoreCase(USERNAME_OR_PHONE_IS_ERROR))
			codeDesc = "账号与电话号码不匹配";
		else if (codeID.equalsIgnoreCase(PASS_WORD_IS_EXIST))
			codeDesc = "该账号已设置密码";
		else if (codeID.equalsIgnoreCase(VALIDATE_CODE_IS_SEND))
			codeDesc = "验证码已发送";
		else if (codeID.equalsIgnoreCase(VALIDATE_CODE_TOO_OFTEN))
			codeDesc = "30秒内不能重复发送";
		
		else if (codeID.equalsIgnoreCase(SYSTEM_IS_ERROR_SIMPLIFIED))
			codeDesc = "系统错误，请联系维护人员处理";
		else if (codeID.equalsIgnoreCase(PARAM_IS_NULL_SIMPLIFIED))
			codeDesc = "必填参数为空";
		else if (codeID.equalsIgnoreCase(PARAM_IS_INVALID_SIMPLIFIED))
			codeDesc = "参数无效，输入不合法";
		else if (codeID.equalsIgnoreCase(PARAM_IS_INVALID))
			codeDesc = "參數無效，輸入不合法";
		else if (codeID.equalsIgnoreCase(PARAM_IS_NULL))
			codeDesc = "必填參數為空";
		else if (codeID.equalsIgnoreCase(SYSTEM_IS_ERROR))
			codeDesc = "系統錯誤，請聯繫維護人員處理";
		else if (codeID.equalsIgnoreCase(PHONE_FORMAT_ERROR))
			codeDesc = "手機號碼格式錯誤";
		else if (codeID.equalsIgnoreCase(SIGN_IS_ERROR))
			codeDesc = "签名错误";
		else if (codeID.equalsIgnoreCase(VALIDATE_CODE_ERROR))
			codeDesc = "手机验证码错误";
		else if (codeID.equalsIgnoreCase(PHONE_IS_NO_REG))
			codeDesc = "手机号未注册";
		else if (codeID.equalsIgnoreCase(PHONE_IS_FREEZE))
			codeDesc = "手机号已冻结";
		else if (codeID.equalsIgnoreCase(PHONE_IS_INVALIDATE))
			codeDesc = "验证码已失效";
		else if (codeID.equalsIgnoreCase(ERROR_SHARE_CODE))
			codeDesc = "无效的邀请码";
		else
			codeDesc = "系統錯誤，請聯繫維護人員處理。錯誤信息：未知錯誤。解決方法：請提交維護人員處理。";
		return codeDesc;
	}
}
