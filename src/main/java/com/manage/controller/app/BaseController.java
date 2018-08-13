package com.manage.controller.app;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.manage.common.Cons;
import com.manage.common.DictKeys;
import com.manage.common.plugin.PropertiesPlugin;
import com.manage.dao.model.User;
import com.manage.tool.ResultCode;

/**
* @Title: BaseController.java 
* @Description: TODO(Controller基础类，所有Controller需继承此类来实现url注解<br>
 * 表扫描插件会将所有继承此类的Controller加载完成URL注解) 
* @author xiaofu
* @date 2017年5月27日 上午11:30:11 
* @version V1.0
 */
public abstract class BaseController extends Controller {
	
	private static String SUCCESS_CODE = "200";
	private static String FAIL_CODE = "500";
	private static String CON_FAIL_CODE = "501";
	
	/**
	 * 全局变量
	 */
	protected String ids;			// 主键
	protected List<?> list;			// 公共list
	
	/**
	 * 请求/WEB-INF/下的视图文件
	 */
	public void toUrl() {
		String toUrl = getPara("toUrl");
		render(toUrl);
	}

	/**
	 * 获取当前请求国际化参数
	 * @return
	 */
	protected String getI18nPram() {
		return getAttr("localePram");
	}

	/**
	 * 获取当前国际化资源
	 * @return
	 */
	protected Map<String, String> getI18nMap() {
		return getAttr("i18nMap");
	}

	/**
	 * 获取当前国际化资源值
	 * @return
	 */
	protected String getI18nVal(String key) {
		Map<String, String> i18nMap = getI18nMap();
		return i18nMap.get(key);
	}

	/**
	 * 获取项目请求根路径
	 * @return
	 */
	protected String getCxt() {
		return getAttr("contextPath");
	}

	/**
	 * 获取ParamMap
	 * @return
	 */
	protected Map<String, String> getParamMap(){
		return getAttr("paramMap");
	}

	/**
	 * 添加值到ParamMap
	 * @return
	 */
	protected void addToParamMap(String key, String value){
		Map<String, String> map = getAttr("paramMap");
		map.put(key, value);
	}
	
	
	/**
	 * 获取checkbox值，数组
	 * @param name
	 * @return
	 */
	protected String[] getParas(String name) {
		return getRequest().getParameterValues(name);
	}
	

	/**
	 * 效验Referer有效性
	 */
	protected boolean authReferer() {
		String referer = getRequest().getHeader("Referer");
		if (null != referer && !referer.trim().equals("")) {
			referer = referer.toLowerCase();
			String domainStr = (String) PropertiesPlugin.getParamMapValue(DictKeys.config_domain_key);
			String[] domainArr = domainStr.split(",");
			for (String domain : domainArr) {
				if (referer.indexOf(domain.trim()) != -1) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 返回成功数据
	 * @param obj
	 * @return
	 */
	protected static Map<String, Object> succ(Object obj) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", SUCCESS_CODE);
		map.put("msg", "操作成功");
		map.put("data", obj);
		map.put("status", "0");
		
		return map;
	}
	
	
	protected static Map<String, Object> result(String codeID, String data) { 
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", codeID);
		map.put("msg", ResultCode.getDescription(codeID));
		map.put("data", data);
		
		return map;
	}
	
	protected static Map<String, Object> result(String codeID) { 
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", codeID);
		map.put("msg", ResultCode.getDescription(codeID));
		
		return map;
	}
	

	/**
	 * 返回分页数据
	 * @param obj
	 * @return
	 */
	protected static <T> Map<String, Object> succPage(Page<T> page) {
		
		Map<String, Object> resultMap = Maps.newHashMap();
		List<T> list = page.getList();
		if(list != null && list.size() > 0 ) {
			
			if(list.get(0) instanceof Record){
				List<Map<String, Object>> recordColumnsList = Lists.newArrayList();
				for (T record:list) {
					Record r = (Record)record;
					recordColumnsList.add(r.getColumns());
					resultMap.put("data", recordColumnsList);
				}
			}
			if(list.get(0) instanceof Model) {
				resultMap.put("data", list);
			}
		}else {
			resultMap.put("data", page);
		}
		resultMap.put("pageNumber", page.getPageNumber());
		resultMap.put("totalPage", page.getTotalPage());
		resultMap.put("pageSize",page.getPageSize());
		resultMap.put("totalRow",page.getTotalRow());
		resultMap.put("code", SUCCESS_CODE);
		resultMap.put("message", "success");
		
		return resultMap;
	}

	/**
	 * 返回成功数据
	 * @param obj
	 * @return
	 */
	protected Map<String, Object> fail(Object obj) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", FAIL_CODE);
		map.put("message", "fail");
		map.put("data", obj);
		
		return map;
	}
	
	/**
	 * 返回错误消息
	 * @param obj
	 * @return
	 */
	protected Map<String, Object> failMsg(String msg) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", CON_FAIL_CODE);
		map.put("message", msg);
		return map;
	}

	/**
	 * 获取用户信息
	 * @param obj
	 * @return
	 */
	protected User getUser() {

		User user = (User)getSession().getAttribute("user");
		return user;
	}
	
	/**
	 * 获取用户信息
	 * @param obj
	 * @return
	 */
	protected int getUserId() {

		User user = (User)getSession().getAttribute("user");
		return user.getId();
	}
	
	/**
	 * 获取分页参数-第几页
	 * @param obj
	 * @return
	 */
	protected int getPageNumber() {
		Integer pageNumber = super.getParaToInt("pageNumber");
		Integer currPage = super.getParaToInt("currPage");
		if( pageNumber == null ){
			if(currPage == null){
				return 1;
			} else {
				return currPage;
			}
		}
		
		return pageNumber;
	}
	
	/**
	 * 获取分页参数-第几页
	 * @param obj
	 * @return
	 */
	protected int getPageSize() {
		Integer pageSize = super.getParaToInt("pageSize");
		if( pageSize == null ){
			return Cons.PAGE_SIZE;
		}
		return pageSize;
	}
	/**
	 * 获取分页参数-第几页
	 * @param obj
	 * @return
	 */
	protected int getPcPageSize() {
		Integer pageSize = super.getParaToInt("pageSize");
		if( pageSize == null ){
			return Cons.PC_PAGE_SIZE;
		}
		return pageSize;
	}
}




