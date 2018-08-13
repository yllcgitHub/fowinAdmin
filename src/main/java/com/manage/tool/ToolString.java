package com.manage.tool;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;

import com.google.zxing.WriterException;
import com.jfinal.kit.StrKit;

/**
* @Title: ToolString.java 
* @Package hanya.web.base.system.tools 
* @Description: TODO(字符串处理工具类) 
* @author xiaofu   
* @date 2016年5月27日 上午11:39:23 
* @version V1.0
 */
public abstract class ToolString {

	@SuppressWarnings("unused")
	private static Logger log = Logger.getLogger(ToolString.class);

	/**
	 * 常用正则表达式
	 */
	public final static String regExp_integer_1 = "^\\d+$"; // 匹配非负整数（正整数 + 0）
	public final static String regExp_integer_2 = "^[0-9]*[1-9][0-9]*$"; // 匹配正整数
	public final static String regExp_integer_3 = "^((-\\d+) ?(0+))$"; // 匹配非正整数（负整数  + 0）
	public final static String regExp_integer_4 = "^-[0-9]*[1-9][0-9]*$"; // 匹配负整数
	public final static String regExp_integer_5 = "^-?\\d+$"; // 匹配整数

	public final static String regExp_float_1 = "^\\d+(\\.\\d+)?$"; // 匹配非负浮点数（正浮点数 + 0）
	public final static String regExp_float_2 = "^(([0-9]+\\.[0-9]*[1-9][0-9]*) ?([0-9]*[1-9][0-9]*\\.[0-9]+) ?([0-9]*[1-9][0-9]*))$"; // 匹配正浮点数
	public final static String regExp_float_3 = "^((-\\d+(\\.\\d+)?) ?(0+(\\.0+)?))$"; // 匹配非正浮点数（负浮点数 + 0）
	public final static String regExp_float_4 = "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*) ?([0-9]*[1-9][0-9]*\\.[0-9]+) ?([0-9]*[1-9][0-9]*)))$"; // 匹配负浮点数
	public final static String regExp_float_5 = "^(-?\\d+)(\\.\\d+)?$"; // 匹配浮点数

	public final static String regExp_letter_1 = "^[A-Za-z]+$";// 匹配由26个英文字母组成的字符串
	public final static String regExp_letter_2 = "^[A-Z]+$";// 匹配由26个英文字母的大写组成的字符串
	public final static String regExp_letter_3 = "^[a-z]+$";// 匹配由26个英文字母的小写组成的字符串
	public final static String regExp_letter_4 = "^[A-Za-z0-9]+$";// 匹配由数字和26个英文字母组成的字符串
	public final static String regExp_letter_5 = "^\\w+$";// 匹配由数字、26个英文字母或者下划线组成的字符串

	public final static String regExp_email = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$"; // 匹配email地址
	
	public final static String regExp_url_1 = "^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$"; // 匹配url
	public final static String regExp_url_2 = "[a-zA-z]+://[^\\s]*"; // 匹配url
		
	public final static String regExp_chinese_1 = "[\\u4e00-\\u9fa5]"; // 匹配中文字符
	public final static String regExp_chinese_2 = "[^\\x00-\\xff]"; // 匹配双字节字符(包括汉字在内)

	public final static String regExp_line = "\\n[\\s ? ]*\\r"; // 匹配空行：

	public final static String regExp_html_1 = "/ <(.*)>.* <\\/\\1> ? <(.*) \\/>/"; // 匹配HTML标记
	public final static String regExp_startEndEmpty = "(^\\s*) ?(\\s*$)"; // 匹配首尾空格

	public final static String regExp_accountNumber = "^[a-zA-Z][a-zA-Z0-9_]{4,15}$"; //匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
	
	public final static String regExp_telephone = "\\d{3}-\\d{8} ?\\d{4}-\\d{7}"; //匹配国内电话号码，匹配形式如 0511-4405222 或 021-87888822 
	
	public final static String regExp_qq = "[1-9][0-9]{4,}"; // 腾讯QQ号, 腾讯QQ号从10000开始
	
	public final static String regExp_postbody = "[1-9]\\d{5}(?!\\d)"; // 匹配中国邮政编码
	
	public final static String regExp_idCard = "\\d{15} ?\\d{18}"; // 匹配身份证, 中国的身份证为15位或18位

	public final static String regExp_ip = "\\d+\\.\\d+\\.\\d+\\.\\d+";//IP
	
	public final static String regExp_lan_ip ="^((192\\.168|172\\.([1][6-9]|[2]\\d|3[01]))(\\.([2][0-4]\\d|[2][5][0-5]|[01]?\\d?\\d)){2}|10(\\.([2][0-4]\\d|[2][5][0-5]|[01]?\\d?\\d)){3})$";//局域网IP
	
	/**
	 * 字符编码
	 */
	public final static String encoding = "UTF-8";
	/**
	  *  判断某个字符串是否存在于数组中
	  *  @param stringArray 原数组
	  *  @param source 查找的字符串
	  *  @return 是否找到
	  */
	public static boolean contains(String[] stringArray, String source) {
	  // 转换为list
	  List<String> tempList = Arrays.asList(stringArray);
	  
	  // 利用list的包含方法,进行判断
	  if(tempList.contains(source)){
		  
		  return true;
	  } else {
		  
		  return false;
	  }
	 }

	/**
	 * Url Base64编码
	 * 
	 * @param data
	 *            待编码数据
	 * @return String 编码数据
	 * @throws Exception
	 */
	public static String encode(String data) throws Exception {
		// 执行编码
		byte[] b = Base64.encodeBase64URLSafe(data.getBytes(encoding));

		return new String(b, encoding);
	}

	/**
	 * Url Base64解码
	 * 
	 * @param data
	 *            待解码数据
	 * @return String 解码数据
	 * @throws Exception
	 */
	public static String decode(String data) throws Exception {
		// 执行解码
		byte[] b = Base64.decodeBase64(data.getBytes(encoding));

		return new String(b, encoding);
	}

	/**
	 * URL编码（utf-8）
	 * 
	 * @param source
	 * @return
	 */
	public static String urlEncode(String source) {
		String result = source;
		try {
			result = java.net.URLEncoder.encode(source, encoding);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据内容类型判断文件扩展名
	 * 
	 * @param contentType
	 *            内容类型
	 * @return
	 */
	public static String getFileExt(String contentType) {
		String fileExt = "";
		if ("image/jpeg".equals(contentType))
			fileExt = ".jpg";
		else if ("audio/mpeg".equals(contentType))
			fileExt = ".mp3";
		else if ("audio/amr".equals(contentType))
			fileExt = ".amr";
		else if ("video/mp4".equals(contentType))
			fileExt = ".mp4";
		else if ("video/mpeg4".equals(contentType))
			fileExt = ".mp4";
		return fileExt;
	}

	/**
	 * 获取bean名称
	 * 
	 * @param bean
	 * @return
	 */
	public static String beanName(Object bean) {
		String fullClassName = bean.getClass().getName();
		String classNameTemp = fullClassName.substring(fullClassName.lastIndexOf(".") + 1, fullClassName.length());
		return classNameTemp.substring(0, 1) + classNameTemp.substring(1);
	}
	
	public final static Pattern referer_pattern = Pattern.compile("@([^@^\\s^:]{1,})([\\s\\:\\,\\;]{0,1})");//@.+?[\\s:]

	/**
	 * 首字母转小写
	 * @param s
	 * @return
	 */
	public static String toLowerCaseFirstOne(String s) {
        if(Character.isLowerCase(s.charAt(0)))
            return s;
        else
            return (new StringBuilder()).append(Character.toLowerCase(s.charAt(0))).append(s.substring(1)).toString();
    }
	
	/**
	 * 首字母转大写
	 * @param s
	 * @return
	 */
    public static String toUpperCaseFirstOne(String s) {
        if(Character.isUpperCase(s.charAt(0)))
            return s;
        else
            return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
    }
    /**
     * 正则表达式验证
     * @param sourseStr
     * @param regExp
     * @return
     */
    public static boolean regExp(String sourseStr,String regExp){
    	  Pattern p = Pattern.compile(regExp);
    	  Matcher m = p.matcher(sourseStr); 
          return  m.matches();
    }
    
	public static void main(String[] args){
		System.out.println(regExp("192.168.100.12", regExp_lan_ip));
		System.out.println(regExp("172.22.100.21", regExp_lan_ip));
		System.out.println(regExp("172.22.8.14", regExp_lan_ip));
		System.out.println(regExp("222.247.54.78", regExp_lan_ip));
	}
	
	
	/**
	 * 得到合适的区域列表
	 * @Title: getSuitableArea 
	 * @Description: TODO(这里用一句话描述这个方法的作用) 
	 * @param @param areaid    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public static String getSuitableArea(String areaid){
		if(StrKit.notBlank(areaid)){
			return "";
		}else{
			int length = areaid.trim().length();
			if(length==2){//省份，返回的是省
				return "%,"+areaid+",%";
			}else if(length==4){//市
				return "%,"+areaid.substring(0, 2)+",%,"+areaid+",%";
			}else if(length==6){//区
				return "%,"+areaid.substring(0, 2)+",%,"+areaid.substring(0, 4)+",%,"+areaid+",%";
			}
			return "";
		}
	}
	
	public static String getOrderByField(int orderByField) {
        String result = null;
        switch (orderByField) {
        case 1:  
            result = "logic.access_num";
            break;  
            
            default:
                break;
        }
        return result;
    }
	
	/**
	 * 替换网址
	 * @param url
	 * @return
	 */
	public static String replaceUrl(String url,String bos,String oss){
		if(url != null && !url.equals("")){
			if(url.contains("culturetv.hanyastar.com.cn")){
				url = url.replace("culturetv.hanyastar.com.cn", bos);
			}
			if(url.contains("wenhuabu-media.bj.bcebos.com")){
				url = url.replace("wenhuabu-media.bj.bcebos.com", bos);
			}
			if(url.contains("osshanyadev.oss-cn-hangzhou.aliyuncs.com")){
				url = url.replace("osshanyadev.oss-cn-hangzhou.aliyuncs.com", oss);
			}
			return url;
		}else{
			return "";
		}
	}
	
	
    //生成随机数字和字母,  
    public static String getStringRandom(int length) {  
          
        String val = "";  
        Random random = new Random();  
          
        //参数length，表示生成几位随机数  
        for(int i = 0; i < length; i++) {  
              
            String charOrNum = random.nextInt(2) % 2 == 0 ? "char" : "num";  
            //输出字母还是数字  
            if( "char".equalsIgnoreCase(charOrNum) ) {  
                //输出是大写字母还是小写字母  
                int temp = random.nextInt(2) % 2 == 0 ? 65 : 97;  
                val += (char)(random.nextInt(26) + temp);  
            } else if( "num".equalsIgnoreCase(charOrNum) ) {  
                val += String.valueOf(random.nextInt(10));  
            }  
        }  
        return val;  
    } 
	
    // 返回数字
	public static int backInt(String numStr) {
		return isNull(numStr) ? 0 : Integer.parseInt(numStr);
	}
	
	// 判断为空
    public static boolean isNull(Object obj) {
        if (obj == null || "null".equalsIgnoreCase(String.valueOf(obj))) return true;
        else {
            if ("".equalsIgnoreCase(String.valueOf(obj).trim())) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 判断是否电话号码
     * @param phone
     * @return
     */
    public static boolean isMobileNO(String phone) {
        Pattern p = Pattern.compile("^[1]([3][0-9]{1}|59|58|88|89)[0-9]{8}$");
        Matcher m = p.matcher(phone);
        return m.matches();
    }
    
    /**
     * 判断是否金额
     * @param phone
     * @return
     */
    public static boolean isAmount(String amount) {
    	Pattern p = Pattern.compile("^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$");
    	Matcher m = p.matcher(amount); 
        return m.matches();
    }
    
    
	/** 
	 * 生成交易订单号
	 * @param str 
	 * @return 
	 * @throws WriterException 
	 */ 
	public static String getTransOrderNo() throws Exception
	{
		String times = DateFormat.dateToString(new Date(), CommonConstant.DateFormat.DatetimesFormat);
		String orderNo = times + RandomValidateCode.createRandomNumber(6);
		return orderNo;
	}
	
	/**
	 * 替换html标签
	 */
    public static String delHTMLTag(String htmlStr){ 
        String regEx_script="<script[^>]*?>[\\s\\S]*?<\\/script>"; //定义script的正则表达式 
        String regEx_style="<style[^>]*?>[\\s\\S]*?<\\/style>"; //定义style的正则表达式 
        String regEx_html="<[^>]+>"; //定义HTML标签的正则表达式 
         
        Pattern p_script=Pattern.compile(regEx_script,Pattern.CASE_INSENSITIVE); 
        Matcher m_script=p_script.matcher(htmlStr); 
        htmlStr=m_script.replaceAll(""); //过滤script标签 
         
        Pattern p_style=Pattern.compile(regEx_style,Pattern.CASE_INSENSITIVE); 
        Matcher m_style=p_style.matcher(htmlStr); 
        htmlStr=m_style.replaceAll(""); //过滤style标签 
         
        Pattern p_html=Pattern.compile(regEx_html,Pattern.CASE_INSENSITIVE); 
        Matcher m_html=p_html.matcher(htmlStr); 
        htmlStr=m_html.replaceAll(""); //过滤html标签 

        return htmlStr.trim(); //返回文本字符串 
    } 
    
    /**
     * 限制字符串只显示限制长度
     */
    public static String showStrLimit(String str, int length){
    	String newStr = "";
    	if(str.length() > length){
    		newStr = str.substring(0, length) + "......";
    	} else {
    		newStr = str;
    	}
    	return newStr;
    }
}
