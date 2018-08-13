package com.manage.tool;

import java.io.File;

import javax.sql.DataSource;

import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.c3p0.C3p0Plugin;

public class GeneratorJavaBean {

	public static DataSource getDataSource() {
		
		String url ="jdbc:mysql://192.168.0.200:3306/fowinAdmin?characterEncoding=UTF-8&autoReconnect=true&failOverReadOnly=false&zeroDateTimeBehavior=convertToNull";
		String username = "root";
		String password = "123456";
		C3p0Plugin c3p0Plugin = new C3p0Plugin(url,username,password);
		
		c3p0Plugin.start();
		return c3p0Plugin.getDataSource();
	}

	public static void main(String[] args) {
		// base model 所使用的包名
		String baseModelPackageName = "com.manage.dao.entity";
		// base model 文件保存路径
		String path = System.getProperty("user.dir");
//		path = "E:\\code5\\national-culture-cloud-hub";
		
		String baseModelOutputDir = path
				+ "/src/main/java/com/manage/dao/entity";
		System.out.println("生成存放路径:" + baseModelOutputDir);
		// model 所使用的包名 (MappingKit 默认使用的包名)
		String modelPackageName = "com.manage.dao.model";
		// model 文件保存路径 (MappingKit 与 DataDictionary 文件默认保存路径)
		String modelOutputDir = path + "/src/main/java/com/manage/dao/model";

		// 删除model下所有文件 ，避免旧的model报错
		File file = new File(modelOutputDir);
		if(file.isDirectory()) {
			for(File t : file.listFiles()) {
				t.delete();
			}
		}
		
		// 创建生成器
		Generator gernerator = new Generator(getDataSource(),
				baseModelPackageName, baseModelOutputDir, modelPackageName,
				modelOutputDir);
		// 设置数据库方言
		gernerator.setDialect(new MysqlDialect());
		// 添加不需要生成的表名
		gernerator.addExcludedTable("v_upload_task");
		gernerator.addExcludedTable("logic_program_tmp");
		gernerator.addExcludedTable("IP-COUNTRY-REGION-CITY-LATITUDE-LONGITUDE-ISP");
		// 设置是否在 Model 中生成 dao 对象
		gernerator.setGenerateDaoInModel(true);
		// 设置是否生成字典文件
		gernerator.setGenerateDataDictionary(true);
		// 设置需要被移除的表名前缀用于生成modelName。例如表名 "osc_user"，移除前缀 "osc_"后生成的model名为
		// "User"而非 OscUser
		gernerator.setRemovedTableNamePrefixes("t_");
		// 生成
		gernerator.generate();
		System.out.println(">>>>>>>>生成完毕>>>>>>>");
	}
}
