package com.manage.common;
import java.util.Properties;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.Const;
import com.jfinal.core.JFinal;
import com.jfinal.log.Log4jLog;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.render.ViewType;
import com.jfinal.template.Engine;
import com.manage.common.plugin.ControllerPlugin;
import com.manage.common.plugin.PropertiesPlugin;
import com.manage.common.plugin.ScanJarStringSource;
import com.manage.controller.bam.HomeController;
import com.manage.dao.model._MappingKit;


public class SystemConfig extends JFinalConfig {
	
	private static Log4jLog log = Log4jLog.getLog(SystemConfig.class);
	
	/**
	 * 系统常量配置
	 */
	@Override
	public void configConstant(Constants me) {
//		log.info("加载系统数据库配置。");
		new PropertiesPlugin(loadPropertyFile("config.properties")).start();
		
//		log.info("configConstant 设置字符集");
		me.setEncoding("UTF-8"); 
		
//		log.info("configConstant 设置是否开发模式");
		me.setDevMode(true);
		
		me.setViewType(ViewType.JSP);//设置视图类型为Jsp，否则默认为FreeMarker
		//me.setJsonFactory(new JacksonFactory());
		
//		log.info("configConstant 视图error page设置");
//		me.setErrorView(400, "/common/400.html");
//		me.setError401View("/common/401.html");
//		me.setError403View("/common/403.html");
//		me.setError404View("/common/404.html");
//		me.setError500View("/common/500.html");
		//设置文件上传大小5G
		me.setMaxPostSize(512 * Const.DEFAULT_MAX_POST_SIZE);
		
		
	}

	@Override
	public void configRoute(Routes me) {
		// TODO Auto-generated method stub
		log.info("configRoute 路由扫描注册");
		me.add("/", HomeController.class);
		new ControllerPlugin(me).start();
	}

	@Override
	public void configPlugin(Plugins me) {
		// TODO Auto-generated method stub
		log.info("configPlugin 配置Druid数据库连接池连接属性");
		
		Properties properties = loadPropertyFile("config.properties");
		String driverClass = properties.getProperty("driver.class").trim();
		String jdbcUrl = properties.getProperty("mysql.jdbcUrl").trim();
		String userName = properties.getProperty("mysql.userName").trim();
		String password = properties.getProperty("mysql.passWord").trim();
		String devMode = properties.getProperty("config.devMode").trim();
		String uploadPath = properties.getProperty("file.upload.path").trim();
		
		String serverDomain = properties.getProperty("server.domain").trim();
		
		String bindAddrBonus = properties.getProperty("bindAddrBonus").trim();
		String shareBonus = properties.getProperty("shareBonus").trim();
		String maxShareNum = properties.getProperty("maxShareNum").trim();
		String shareUrl =  properties.getProperty("shareUrl").trim();
		
		log.info("uploadPath = " + uploadPath);
		com.manage.common.Cons.FILE_PATH=uploadPath;
		com.manage.common.Cons.SERVER_DOMAIN=serverDomain;
		
		com.manage.common.Cons.BIND_ADDR_BONUS = bindAddrBonus;
		com.manage.common.Cons.SHARE_BONUS = shareBonus;
		com.manage.common.Cons.MAX_SHARE_NUM = maxShareNum;
		com.manage.common.Cons.SHARE_URL = shareUrl;
		
		
		log.info("jdbcUrl ==== " + jdbcUrl);
		
//		String jdbcUrl = "jdbc:mysql://218.104.153.143:3306/credit?characterEncoding=UTF-8&autoReconnect=true&failOverReadOnly=false&maxReconnects=10";
//		String userName = "root";
//		String password = "123456";
//		String driverClass = "com.mysql.jdbc.Driver";
		DruidPlugin druidPlugin = new DruidPlugin(jdbcUrl, userName, password, driverClass);

		log.info("configPlugin 配置Druid数据库连接池大小");
		druidPlugin.setInitialSize(10);
		druidPlugin.setMinIdle(10);
		druidPlugin.setMaxActive(100);
		druidPlugin.setMaxWait(10*1000);
		druidPlugin.setMinEvictableIdleTimeMillis(10*1000);
		druidPlugin.setTimeBetweenConnectErrorMillis(10*1000);
		druidPlugin.setTimeBetweenEvictionRunsMillis(10*1000);
		
		druidPlugin.setMaxWait(10*1000);
		log.info("configPlugin 配置ActiveRecord插件");
		ActiveRecordPlugin arpMain = new ActiveRecordPlugin(DictKeys.db_dataSource_main, druidPlugin);
		//arp.setTransactionLevel(4);//事务隔离级别
		arpMain.setDevMode(Boolean.getBoolean(devMode)); // 设置开发模式
		arpMain.setShowSql(true); // 是否显示SQL
		arpMain.addSqlTemplate(new ScanJarStringSource("sql/admin.sql"));
		arpMain.addSqlTemplate(new ScanJarStringSource("sql/user.sql"));
		
		
		//arpMain.setBaseSqlTemplatePath(PathKit.getRootClassPath()+File.separator+"sql");
		//arpMain.addSqlTemplate("sql-config.sql");
		log.info("configPlugin 数据库类型判断");
		arpMain.setDialect(new MysqlDialect());
		
		log.info("configPlugin 添加druidPlugin插件");
		// 配置SQL监控 
//		druidPlugin.addFilter(new StatFilter());
//		WallFilter wall = new WallFilter();
//		wall.setDbType("mysql");
//		druidPlugin.addFilter(wall);
		me.add(druidPlugin);
		//ORM Mapping
		_MappingKit.mapping(arpMain);
		me.add(arpMain); // 多数据源继续添加
		log.info("加载mysql主数据源完成");
//		QuartzPlugin quartzPlugin =  new QuartzPlugin("quartzjob.properties");
//	    me.add(quartzPlugin);
	}

	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub
		log.info("configInterceptor 权限认证拦截器");
		me.add(new AuthInterceptor());
	}

	@Override
	public void configHandler(Handlers me) {
//		// TODO Auto-generated method stub
//		log.info("configHandler 全局配置处理器，主要是记录日志和request域值处理");
		me.add(new GlobalHandler());
//		DruidStatViewHandler dvh = new DruidStatViewHandler("/druid");
//		me.add(dvh);
	}
	/**
	 * 系统启动完成后执行
	 */
	@Override
	public void afterJFinalStart() {
		
	}
	
	/**
	 * 系统关闭前调用
	 */
	@Override
	public void beforeJFinalStop() {
		
	}

	@Override
	public void configEngine(Engine arg0) {
		// TODO Auto-generated method stub

	}

	/**
	 * Run Server
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		JFinal.start("culture-cloud-mrp", 8080, "/", 0);
	}
}
