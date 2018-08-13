<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>自由账户明细</title>
<%@ include file="/jsp/commJSCSS.jsp" %>
<script type="text/javascript" src="${contextPath}/res/js/index.js"></script>
<script type="text/javascript" src="${contextPath}/res/js/ajaxPage.js"></script>
</head>
<body>
	<div class="admin-main">
		<!-- 页面顶部操作按钮 -->
		<blockquote class="layui-elem-quote">
		      <a href="javascript:;" class="layui-btn layui-btn-small" onclick="$('#tbList').ajaxPage.refresh();"><i class="layui-icon">&#x1002;</i>刷新 </a>
		      <a href="javascript:;" class="layui-btn layui-btn-small" onclick="exportXls();"><i class="layui-icon">&#xe61e;</i>导出</a>
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
								<input class="layui-input"   id="vipNo" name="vipNo" value=""
									  placeholder="用户编号" type="text">
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
					data : "id",
				},

				{
					colname : "会员编号",
					type : "text",
					data : "vip_no"
				},
				{
					colname : "交易前余额",
					type : "text",
					data : "before_balance"
				},
				{
					colname : "交易金额",
					type : "text",
					data : "trade_balance"
				},
				{
					colname : "交易后金额",
					type : "text",
					data : "after_balance"
				},
				{
					colname : "交易类型",
					type : "text",
					data : "remark"
				},
				{
					colname : "交易时间",
					type : "text",
					data : "create_time"
				},
				
				]; 
		
		$('#tbList').ajaxPage({
			url : "${contextPath}/bam/user/accFreeList",
			currPage : 1,
			condition : [ "id", "vipNo"],
			data_mapping : dataMapping
		});

		// 刷新事件
		function refresh(){
			$('#tbList').ajaxPage.refresh();
		}
		
		// 查询事件
		$('#queryBtn').on('click',function(){
			$('#tbList').ajaxPage.refresh();
		});
		
		
		// 导出
		function exportXls(){
			var phone = $("#phone").val();
			var urlPath = "${contextPath}/bam/user/exportsAccFree?vipNo="+vipNo;
			window.open(urlPath); 
		}
		
	</script>
	
</body>
</html>