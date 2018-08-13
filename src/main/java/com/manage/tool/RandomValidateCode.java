package com.manage.tool;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomValidateCode {

	/**
	   *   产生字母及数字的随机字符串
	   *   @param   length   int
	   *   随机字符串长度
	   *   @return   String
	   *   随机字符串
	   */
	public static String randomString(int length) {
	    String randomValidateCode = "";
	    int random;
	    char[] letters = initLetters();

	    for (int i = 0; i < length; i++) {
	    	random = ( (int) (Math.random() * 100) % 62);
	    	randomValidateCode += letters[random];
	    }

	    return randomValidateCode;
	}

	/**
	   *   内部方法，产生字母数组及数字数组
	   *   @return   char[]
	   */
	private static char[] initLetters() {
	    char[] ca = new char[62];
	    for (int i = 0; i < 10; i++) {
	    	ca[i] = (char) (48 + i);
		}
	    for (int i = 10; i < 36; i++) {
	    	ca[i] = (char) (55 + i);
	    }
	    for (int i = 36; i < 62; i++) {
	    	ca[i] = (char) (61 + i);
	    }
	    return ca;
	}
	
	/**
	   *   产生随机数字
	   *   @param   
	   *   随机字符串长度
	   *   @return   String
	   *   随机字符串
	   */
	public static int randomNumber(int length) {
	    int randomValidateNum = 0;
	    randomValidateNum = ( (int) (Math.random() * 100) % 10);

	    return randomValidateNum;
	}
	
	/*
	 *   生成随机电子票
	 *   @param   length   long
	 *   电子票套餐Id
	 *   @return   String
	 *   生成随机电子票 
	 */
	public String createRandomTicket (String orderNumber) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String randomTicket = "";
		//设置随机码长度为8位
		String randomValidateCode = randomString(8);
		randomTicket = format.format(new Date()) + randomValidateCode + "_" +  orderNumber;
		
		return randomTicket;
	}
	
	/*
	 *   生成随机码
	 *   @param 
	 *   @return String
	 *   生成随机码
	 */
	public String createRandomNumber () {
		String randomValidateCode = "";
		//设置随机码长度为1位
		int randomValidateNum = randomNumber(1);
		if (randomValidateNum > 0) {
			randomValidateCode = randomString(randomValidateNum);
		}
		randomValidateCode = randomValidateNum + randomValidateCode;
		return randomValidateCode;
		
//		int sumRandomCount = 0;
//		StringBuilder sb = new StringBuilder();
//		
//		//获取随机数
//		for (int k=0;k<arrayStr.length;k++) {
//			System.out.println(arrayStr[k]);
//			String randomValidateCode = "";
//			//设置随机码长度为1位
//			int randomValidateNum = randomNumber(1);
//			sumRandomCount = sumRandomCount + randomValidateNum;
//			if (randomValidateNum > 0) {
//				randomValidateCode = randomString(randomValidateNum);
//			}
//			randomValidateCode = arrayStr[k] + randomValidateNum + randomValidateCode;
//			sb.append(randomValidateCode);
//		}
//		
//		System.out.println(sb.toString());
//		
//		return sb.toString();
	}
	
	/*
	 *   生成随机码
	 *   @param 
	 *   @return String
	 *   生成随机码
	 */
	public String createRandomCode (String randomPara) {
		String randomValidateCode = "";
		//获取随机数字
		int randomValidateNum = randomNumber(1);
		//获取10位随机码
		String randomCode = randomString(10);
		
		randomValidateCode = randomValidateNum + randomCode.substring(0,randomValidateNum) 
			+ randomPara + randomCode.substring(randomValidateNum + 1);
		
		return randomValidateCode;
	}
	
	/**
	   *   产生随机数字
	   *   @param   
	   *   随机字符串长度
	   *   @return   String
	   *   随机字符串
	   */
	public static String createRandomNumber(int length) {
		String randomValidateCode = "";
		int random;
		//获取随机数字
		for (int i = 0; i < length; i++) {
	    	random = randomNumber(1);
	    	randomValidateCode += random;
	    }
		
		return randomValidateCode;
	}
	
	
	/**
	 * 获取两个自然数之间的整数
	 * @param length
	 * @param end
	 * @return
	 */
	public static int createRandomNumber(int min, int max) {
		Random random = new Random();
		int s = random.nextInt(max)%(max-min+1) + min;
		return s;
	}
}
