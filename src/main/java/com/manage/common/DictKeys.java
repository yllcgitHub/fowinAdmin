package com.manage.common;

import java.text.SimpleDateFormat;

/**
* @Title: DictKeys.java 
* @Package hanya.web.base.system.common 
* @Description: TODO 系统相关配置常量参数 
* @author xiaofu
* @date 2016年5月27日 上午9:12:27 
* @version V1.0
 */
public abstract class DictKeys {
	
	/**
	 * 系统当前时间
	 */
	public static final SimpleDateFormat CURRENTTIME = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
	
	/**
	 * 以系统当前时间为图片命名
	 */
	public static final SimpleDateFormat DATEFORMAT = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	

	/**
	 * URL缓存Key
	 */
	public static final String cache_name_page = "SimplePageCachingFilter";
	
	/**
	 * 系统缓存，主要是权限和数据字典等
	 */
	public static final String cache_name_system = "system";
	
	
	/**
	 * 系统缓存，无需验证的URL
	 */
	public static final String cache_name_UnVerificationPermission = "UnVerificationPermission";

	/**
	 * 扫描的包
	 */
	public static final String config_scan_package = "config.scan.package";

	/**
	 * 扫描的jar
	 */
	public static final String config_scan_jar = "config.scan.jar";
	
	/**
	 * 开发模式
	 */
	public static final String config_devMode = "config.devMode";
		
	/**
	 * 加密密钥
	 */
	public static final String config_securityKey_key = "config.securityKey";

	/**
	 * # cookie 值的时间
	 */
	public static final String config_maxAge_key = "config.maxAge";

	/**
	 * # 域名或者服务器IP，多个逗号隔开，验证Referer时使用
	 */
	public static final String config_domain_key = "config.domain";

	
	/**
	 * 当前数据库类型
	 */
	public static final String db_type_key = "db.type";


	/**
	 * 当前数据库类型：mysql
	 */
	public static final String db_type_mysql = "mysql";


	/**
	 * 数据库连接参数：驱动
	 */
	public static final String db_connection_driverClass = "driverClass";
	
	/**
	 * 数据库连接参数：连接URL
	 */
	public static final String db_connection_jdbcUrl = "jdbcUrl";
	
	/**
	 * 数据库连接参数：用户名
	 */
	public static final String db_connection_userName = "userName";
	
	/**
	 * 数据库连接参数：密码
	 */
	public static final String db_connection_passWord = "passWord";

	/**
	 * 数据库连接参数：数据库服务器IP
	 */
	public static final String db_connection_ip = "db_ip";
	
	/**
	 * 数据库连接参数：数据库服务器端口
	 */
	public static final String db_connection_port = "db_port";
	
	/**
	 * 数据库连接参数：数据库名称
	 */
	public static final String db_connection_dbName = "db_name";

	/**
	 * 数据库连接池参数：初始化连接大小
	 */
	public static final String db_initialSize = "db.initialSize";

	/**
	 * 数据库连接池参数：最少连接数
	 */
	public static final String db_minIdle = "db.minIdle";

	/**
	 * 数据库连接池参数：最多连接数
	 */
	public static final String db_maxActive = "db.maxActive";

	/**
	 *  主数据源名称：系统主数据源
	 */
	public static final String db_dataSource_main = "db.dataSource.main";
	/**
	 *  redis 配置相关
	 */
	public static final String config_redis_name = "config.redis.name";
	public static final String config_redis_host = "config.redis.host";
	public static final String config_redis_port = "config.redis.port";
	public static final String config_redis_pwd = "config.redis.pwd";
	/**
	 * 是否验证用户Token开关
	 */
	public static final String config_verify_usertoken = "config.verify.usertoken";
	/**
	 * 非验证Token的api配置
	 */
	public static final String config_unverify_apis = "config.unverify.apis";
}
