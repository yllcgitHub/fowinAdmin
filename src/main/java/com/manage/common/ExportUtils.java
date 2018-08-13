package com.manage.common;

import java.io.File;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.manage.common.annotation.FieldMeta;
import com.manage.tool.ExcelCol;
import com.manage.tool.ExcelCommon;
import com.manage.tool.ToolString;

public class ExportUtils {
	/**
	 * 
	 * @param request
	 * @param response
	 * @param columnKeys
	 * @param columnNames
	 * @param titleName
	 * @param fileName
	 * @param voList
	 */
	public static void export(HttpServletRequest request,
			HttpServletResponse response, List<?> dataList, String titleName,
			String fileName) {
		
		Map<String, Object> map = ExportUtils.reflect(dataList.get(0));

		List<String> columnKeys = (List<String>) map.get("columnKeys");
		List<String> columnNames = (List<String>) map.get("columnNames");
		try {
			// 标题
			List<JSONObject> titleList = Lists.newArrayList();
			for (int i = 0; i < columnKeys.size(); i++) {
				titleList.add((JSONObject) JSON.toJSON(new ExcelCol(
						columnKeys.get(i), columnNames.get(i))));
			}

			JSONArray column = ExcelCommon.getJSONArrayByList(titleList);
			JSONArray data = ExcelCommon.getJSONArrayByList(dataList);

			ExcelCommon excelUtil = new ExcelCommon();

			File outFile = excelUtil.dataToExcel(column, data, titleName, request);
			response.setContentType("application/vnd.ms-excel;charset=utf-8");
			response.setHeader("Content-Disposition", "attachment;filename="
					+ fileName + ".xls");
			response.setCharacterEncoding("utf-8");
			OutputStream out = response.getOutputStream();
			byte[] dataByte = ExcelCommon.file2Byte(outFile.getAbsolutePath());
			out.write(dataByte);
			out.flush();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	public static Map<String, Object> reflect(Object model) {
		List<String> annotated = new ArrayList<String>(); 	 // 属性注解
		List<String> keyList = new ArrayList<String>(); 	 // 属性名称
		// List<Object> valueList = new ArrayList<Object>(); // 属性值

		for (Field field : model.getClass().getDeclaredFields()) {
			field.setAccessible(true);
			if( field.getDeclaredAnnotations().length>0) {
				FieldMeta fieldMeta = (FieldMeta) field.getDeclaredAnnotations()[0];
				annotated.add(fieldMeta.name()); 	// 获取属性注解
				keyList.add(field.getName()); 		// 获取属性名称
				// valueList.add(field.get(model)); // 获取属性值
			}
		}

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("columnNames", annotated);
		map.put("columnKeys", keyList);
		// map.put("columnValues", valueList);
		return map;
	}
	
}
