package com.manage.common.plugin;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.jfinal.log.Log4jLog;
import com.jfinal.plugin.IPlugin;
import com.manage.common.DictKeys;


public class PropertiesPlugin implements IPlugin {
	private static Log4jLog log = Log4jLog.getLog(PropertiesPlugin.class);

	/**
	* 保存系统配置参数值
	*/
	private static Map<String, Object> paramMap = new HashMap<String, Object>();
	
	private Properties properties;
	
	public PropertiesPlugin(Properties properties){
		this.properties = properties;
	}
	
	/**
	 * 获取系统配置参数值
	 * @param key
	 * @return
	 */
	public static Object getParamMapValue(String key){
		return paramMap.get(key);
	}
	
	@Override
	public boolean start() {
		
		String scan_jar = properties.getProperty(DictKeys.config_scan_jar).trim();
		if(null != scan_jar && !scan_jar.isEmpty()){
			List<String> list = new ArrayList<String>();
			String[] jars = scan_jar.split(",");
			for (String jar : jars) {
				list.add(jar.trim());
			}
			paramMap.put(DictKeys.config_scan_jar, list);
		}else{
			paramMap.put(DictKeys.config_scan_jar, new ArrayList<String>());
		}
		
		
		// 把常用配置信息写入map
		String scan_package = properties.getProperty(DictKeys.config_scan_package).trim();
		if(null != scan_package && !scan_package.isEmpty()){
			List<String> list = new ArrayList<String>();
			String[] pkgs = scan_package.split(",");
			for (String pkg : pkgs) {
				list.add(pkg.trim());
			}
			paramMap.put(DictKeys.config_scan_package, list);
		}else{
			paramMap.put(DictKeys.config_scan_package, new ArrayList<String>());
		}
		
		return true;
	}

	@Override
	public boolean stop() {
		// TODO Auto-generated method stub
		paramMap.clear();
		return false;
	}

}
