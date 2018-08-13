/**
 * Project Name:culture-cloud-api
 * File Name:ScanJarStringSource.java
 * Package Name:cn.hanya.web.base.system.plugin
 * Date:2017年6月22日下午12:23:03
 * Copyright (c) 2017, chenzhou1025@126.com All Rights Reserved.
 *
 */

package com.manage.common.plugin;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import com.jfinal.template.IStringSource;

/**
 * ClassName:ScanJarStringSource <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON. <br/>
 * Date: 2017年6月22日 下午12:23:03 <br/>
 * 
 * @author xiaofu
 * @version
 * @since JDK 1.8
 * @see
 */
public class ScanJarStringSource implements IStringSource {

	private String fileName;
	private String encoding;

	public ScanJarStringSource(String fileName) {
		this.fileName = fileName;
		this.encoding = "utf-8";
	}

	public ScanJarStringSource(String fileName, String encoding) {
		this.fileName = fileName;
		this.encoding = encoding;
	}

	@Override
	public boolean isModified() {
		return true;
	}

	@Override
	public String getKey() {
		return this.fileName;
	}

	@Override
	public StringBuilder getContent() {
		return loadFile(fileName, encoding);
	}

	@Override
	public String getEncoding() {
		return this.encoding;
	}

	private String buildFinalFileName(String fileName) {
		char firstChar = fileName.charAt(0);
		String finalFileName;
		if (firstChar != 47 && firstChar != 92) {
			finalFileName = File.separator + fileName;
		} else {
			finalFileName = fileName;
		}

		return finalFileName;
	}

	private static StringBuilder loadFile(String fileName, String encoding) {
		StringBuilder out = new StringBuilder();
		InputStream inputStream = com.jfinal.template.FileStringSource.class
				.getClassLoader().getResourceAsStream(fileName);
		byte[] b = new byte[4096];
		try {
			for (int n; (n = inputStream.read(b)) != -1;) {
				out.append(new String(b, 0, n, encoding));
			}
		} catch (IOException e) {
			throw new RuntimeException("Error loading sql file.", e);
		} catch (NullPointerException e) {
			throw new RuntimeException("sql file not find:" + fileName );
		} finally {
			if (inputStream != null) {
				
			
				try {
					inputStream.close();
				} catch (IOException e) {
					com.jfinal.kit.LogKit.error(e.getMessage(), e);
				}
			}
		}
		return out;
	}
}
