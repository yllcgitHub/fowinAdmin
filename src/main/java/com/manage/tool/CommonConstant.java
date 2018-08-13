package com.manage.tool;

public class CommonConstant {

	public static int smsExpTime = 300000; // 300000 短信超时时间，5分钟
	public static String smsTitle = "【traxia】";

	public static class DateFormat {
		public static final String DatetimeFormat = "DATETIME";
		public static final String SlashYmdHmsFormat = "yyyy/MM/dd HH:mm:ss";
		public static final String YmdHHmmFormat = "yyyy-MM-dd HH:mm";
		public static final String SimpleYmdFormatChinese = "yyyy年MM月dd日";
		public static final String SimpleYmdFormat = "yyyy-MM-dd";
		public static final String DatetimesFormat = "yyyyMMddHHmmss";
	}

	public static class PLATFORM {
		public static final String TEST_PLATFORM = "test";
	}

	public static class PID {
		public static final String TEST_PLATFORM = "test123";
	}

	public static class P_CODE {
		public static final String TEST_PLATFORM = "test456";
	}
	
	public static class TradeType {
		public final static int LOCK_RELEASE = 1;  // 锁仓释放
		public final static int SHARE_BONUS_RELEASE = 2; // 分红释放
		public final static int WITHDRAW = 3;  // 提现
	}
	
	public static class LogType {
		public final static String IN = "in";
		public final static String OUT = "out";
	}
}
