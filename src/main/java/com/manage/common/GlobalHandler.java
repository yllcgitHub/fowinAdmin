package com.manage.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jfinal.handler.Handler;
import com.jfinal.log.Log4jLog;

/**
 * 全局拦截器
 * @author xiaofu
 *
 */
public class GlobalHandler extends Handler {
	
	private static Log4jLog log = Log4jLog.getLog(GlobalHandler.class);
	
	@Override
	public void handle(String target, HttpServletRequest request, HttpServletResponse response, boolean[] isHandled) {
//		String contextpath = ToolWeb.getContextPath(request);
//		String prdPath = "http://credit.bluedti.net/credit";
		
		response.addHeader("Access-Control-Allow-Origin","*");  
		response.addHeader("Access-Control-Allow-Methods","POST");  
		response.addHeader("Access-Control-Allow-Headers","x-requested-with,content-type"); 
		
		request.setAttribute("contextPath", Cons.SERVER_DOMAIN);
//		log.info("========== contextPath config :  " + Cons.SERVER_DOMAIN);
		/**
		Map<String, Cookie> cookieMap = ToolWeb.readCookieMap(request);
		request.setAttribute("cookieMap", cookieMap);
		request.setAttribute("paramMap", ToolWeb.getParamMap(request));
		request.setAttribute("decorator", "none");
		response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
		response.setHeader("Pragma","no-cache"); //HTTP 1.0
		response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
		**/
		next.handle(target, request, response, isHandled);
	}
	
	/**
	 * 获取HttpServletRequest中相关信息
	 * @param request
	 */
	public void getHttpRequestInfo(HttpServletRequest request){
		
	}
	
}
