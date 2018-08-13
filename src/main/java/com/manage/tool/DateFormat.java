package com.manage.tool;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormat {

	public static final SimpleDateFormat DatetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static final SimpleDateFormat SlashYmdHmsFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	public static final SimpleDateFormat YmdHHmmFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	public static final SimpleDateFormat SimpleYmdFormatChinese = new SimpleDateFormat("yyyy年MM月dd日");
	public static final SimpleDateFormat SimpleYmdFormat = new SimpleDateFormat("yyyy-MM-dd");
	public static final SimpleDateFormat DatetimesFormat = new SimpleDateFormat("yyyyMMddHHmmss");

	public static String dateToString(Date date, String type) throws Exception {
		switch (type) {
		case CommonConstant.DateFormat.DatetimeFormat:
			return DatetimeFormat.format(date);
		case CommonConstant.DateFormat.SlashYmdHmsFormat:
			return SlashYmdHmsFormat.format(date);
		case CommonConstant.DateFormat.YmdHHmmFormat:
			return YmdHHmmFormat.format(date);
		case CommonConstant.DateFormat.SimpleYmdFormatChinese:
			return SimpleYmdFormatChinese.format(date);
		case CommonConstant.DateFormat.SimpleYmdFormat:
			return SimpleYmdFormat.format(date);
		case CommonConstant.DateFormat.DatetimesFormat:
			return DatetimesFormat.format(date);
		default:
			return null;
		}
	}

	public static Date stringToDate(String strDate, String type)
			throws Exception {
		switch (type) {
		case CommonConstant.DateFormat.DatetimeFormat:
			return DatetimeFormat.parse(strDate);
		case CommonConstant.DateFormat.SlashYmdHmsFormat:
			return SlashYmdHmsFormat.parse(strDate);
		case CommonConstant.DateFormat.YmdHHmmFormat:
			return YmdHHmmFormat.parse(strDate);
		case CommonConstant.DateFormat.SimpleYmdFormatChinese:
			return SimpleYmdFormatChinese.parse(strDate);
		case CommonConstant.DateFormat.SimpleYmdFormat:
			return SimpleYmdFormat.parse(strDate);
		case CommonConstant.DateFormat.DatetimesFormat:
			return DatetimesFormat.parse(strDate);
		default:
			return new Date();
		}
	}
}
