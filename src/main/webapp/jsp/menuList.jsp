<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>菜单列表</title>
<%@ include file="/jsp/commJSCSS.jsp" %> 
<script type="text/javascript" src="${contextPath}/res/js/index.js"></script>
<script type="text/javascript" src="${contextPath}/res/js/ajaxPage.js"></script>
</head>
<body>
	<div class="admin-main">
	
	
		<!-- 页面顶部操作按钮 -->
		<blockquote class="layui-elem-quote">
		      <a href="javascript:;" class="layui-btn layui-btn-small" onclick="$('#tbList').ajaxPage.refresh();"><i class="layui-icon">&#x1002;</i>刷新 </a>
			  <a href="javascript:;" class="layui-btn layui-btn-small" id="add"><i class="layui-icon">&#xe608;</i>添加菜单</a>  
		</blockquote>
		<i class="layui-icon" style="color: green;"></i>
		
		<!-- 表格的查询条件 -->
		<fieldset class="layui-elem-field">
			<legend>条件查询</legend>
			<div class="layui-field-box">
				<form method="post" action="" class="layui-form">
					<div class="layui-form-item layui-form-text">
						<div class="layui-form-item">
						
							<div class="layui-input-inline">
								<input class="layui-input" 	id="name" name="name" value=""
									  placeholder="菜单名称" type="text">
							</div>
							
							<div class="layui-input-inline">
								 <button class="layui-btn"  lay-submit type="button"  id="queryBtn" >查询</button>
								 <button type="reset" class="layui-btn layui-btn-primary">重置</button>
								 	 
							</div>
							
						</div>
				</form>
			</div>
		</fieldset>
		
		<!-- 定义table，用于ajax填充数据 -->
		<table class="layui-table" id="tbList">
			<thead>
			</thead>
			<tbody>
			</tbody>
		</table>
		
		<!-- 翻页 --->
	 	<div class="layui-page">
			 记录条数：<hy:select name="pageSize" dictName="DIC_PAGESIZE" attr='onchange="refresh();"'/>
			<div id="page" class="page"></div>
		</div> 
		
	 </div>
 	<!-- 以下是js部分 -->
 	<!-- 定义表格显示数据 -->
	<script type="text/javascript">
		var dataMapping = [
				{
					colname : "id",
					primary : "yes",
					type : "checkbox",
					data : "id"
				},
				{
					colname : "菜单ID",
					type : "text",
					data : "id"
				},
				{
					colname : "菜单名称",
					type : "text",
					data : "name"
				},
				{
					colname : "菜单url",
					type : "text",
					data : "url"
				},
				{
					colname : "菜单父ID",
					type : "text",
					data : "pid"
				},	
				{
					colname : "菜单级别",
					type : "text",
					data : "level"
				},	
				{
					colname : "菜单l",
					type : "text",
					data : "icon"
				},	
				{
					colname : "操作",
					type : "oper",
					data :
					 '<a onclick="update(this)" class="layui-btn layui-btn-mini">编辑</a>'
					+'<a onclick="delete(this);"class="layui-btn layui-btn-mini">删除</a>'
				}]; 
		
		$('#tbList').ajaxPage({
			url : "${contextPath}/bam/menu/list",
			currPage : 1,
			condition : [ "id", "name"],
			data_mapping : dataMapping
		});
		
		
		// 查询事件
		$('#queryBtn').on('click',function(){
			$('#tbList').ajaxPage.refresh();
		});
		
		$('#add').on(
				'click',
				function() {
					htmlobj = $.ajax({
						url : "${contextPath}/bam/menu/toAddMenu",
						async : false
					});
					var index = layer.open({
						type : 1,
						title : '添加菜单',
						content : htmlobj.responseText,
						area : [ '800px', '600px' ],
						zIndex : 999,
						maxHeight : 600,
						maxmin : true,
						end : function() {
						},
						full : function(elem) {
							var win = window.top === window.self ? window : parent.window;
						}
					});

		});
		
	</script>
	
</body>
</html>