package com.manage.tool;

import java.util.Map;

import com.jfinal.plugin.ehcache.CacheKit;

/**
 * @desc 描述：配置管理
 * @author 作者: xiaofu
 * @date 创建时间：2016年12月13日 上午10:31:41
 */
public class ConfigManager
{
//	private static Log4jLog log = Log4jLog.getLog(ConfigManager.class);
	private static String cacheName = "system";
	private static String configCache = "system_configCache";
	private static ConfigManager instance;

	public static ConfigManager getInstance()
	{
		if (null == instance)
		{
			instance = new ConfigManager();
		}
		return instance;
	}

//	/**
//	 * 从数据库装载
//	 */
//	public synchronized void loadDbConfig()
//	{
//		String sql = "select * from sys_config";
//		List<SysConfig> cfgList = SysConfig.dao.find(sql);
//		Map<String, Object> cfgMap = new HashMap<String, Object>();
//		for (SysConfig cfg : cfgList)
//		{
//			cfgMap.put(cfg.getCfgKey(), cfg.getCfgValue());
//		}
//		CacheKit.put(cacheName, configCache, cfgMap);
//	}
	/**
	 * 扩展外页至配置
	 * @param extMap
	 * @return
	 */
	public synchronized  void loadExtTableConfig(Map<String,?> extMap )
	{
		//增加扩展数据 这里没有做覆盖数据安全检查
		Map<String,Object> cfgMap = CacheKit.get(cacheName, configCache);
		cfgMap.putAll(extMap);
		CacheKit.put(cacheName, configCache, cfgMap);
	} 
	/**
	 * 由Jfinal装载
	 */
	public synchronized void loadFileConfig()
	{

	}

//	/**
//	 * 从默认缓存读取配置
//	 * 
//	 * @param key
//	 * @return 返回配置对像
//	 * @throws Exception
//	 * @throws SysException
//	 */
//	public Object getDBConfigObject(String key)
//	{
//		Map<String,Object> cfgMap = CacheKit.get(cacheName, configCache);
//		Object obj = cfgMap.get(key);
//		if (null == obj)
//		{
//			log.error("从缓存获取失败，将从DB中装载");
//			String sql = "select * from sys_config where cfg_key='" + key + "'";
//			obj = SysConfig.dao.findFirst(sql);
//		}
//		return obj;
//	}

//	/**
//	 * 返回某一个配置项的值
//	 * 
//	 * @param key
//	 * @return
//	 */
//	public Object getDBValue(String key)
//	{
//		Object obj = getDBConfigObject(key);
//		Object retObj = null;
//		if (null == obj)
//		{
//			log.error("没有找到这个配置项 key:" + key);
//		}
//		else
//		{
//			retObj = obj;
//		}
//		return retObj;
//	}
}
