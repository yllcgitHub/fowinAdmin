<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<title>用户列表</title>
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
			  <a href="javascript:;" class="layui-btn layui-btn-small" id="add"><i class="layui-icon">&#xe608;</i>添加用户</a>  
			  
			  <a href="javascript:;" class="layui-btn layui-btn-small" onclick="lockRelease();"><i class="layui-icon">&#xe61e;</i>锁仓释放</a>
			  <a href="javascript:;" class="layui-btn layui-btn-small" onclick="shareBonusRelease();"><i class="layui-icon">&#xe61e;</i>分红释放</a>
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
								<input class="layui-input"   id="phone" name="phone" value=""
									  placeholder="手机号" type="text">
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
					colname : "手机号码",
					type : "text",
					data : "phone"
				},
				{
					colname : "身份证号",
					type : "text",
					data : "id_card"
				},
				{
					colname : "用户姓名",
					type : "text",
					data : "real_name"
				},
				{
					colname : "分红比例",
					type : "text",
					data : "share_bonus_rate"
				},
				{
					colname : "锁仓币总量",
					type : "text",
					data : "lock_num"
				},
				{
					colname : "锁仓币账户余额",
					type : "text",
					data : "lock_balance"
				},
				{
					colname : "自由账户余额",
					type : "text",
					data : "free_balance"
				},
				{
					colname : "注册时间",
					type : "text",
					data : "create_time"
				},
// 				{
// 					colname : "发奖状态",
// 					type : "dict",
// 					data : "bonus_status",
// 					dict : {
// 						0 : '<i class="layui-icon" style="color:blue;"></i>',
// 						1 : '<i class="layui-icon" style="color:green;"></i>',				
// 					},
// 					btn:{
// 						0 : '<a class="layui-text layui-btn-mini">未发</a>',
// 						1 : '<a class="layui-text layui-btn-mini">已发</a>',
// 					}
// 				},
// 				{
// 					colname : "操作",
// 					type : "dict",
// 					data : "bonus_status",
// 					dict : {
// 						0 : '<i class="layui-icon" style="color:blue;"></i>',
// 						1 : '<i class="layui-icon" style="color:green;"></i>',				
// 					},
// 					btn:{
// 						0 : '<a onclick="sendBonus(this)" class="layui-btn layui-btn-mini">发奖</a>',
// 						1 : '',
// 					}
// 				},
// 				{
//					colname : "操作",
//					type : "oper",
//					data :
//					 '<a onclick="sendBonus(this)" class="layui-btn layui-btn-mini">发奖</a>'
//					+ '<a onclick="update(this)" class="layui-btn layui-btn-mini">编辑</a>'
//					+'<a onclick="deleteUser(this);"class="layui-btn layui-btn-mini">删除</a>'
//					+'<a onclick="resetPassword(this);"class="layui-btn layui-btn-mini">重置密码</a>'
//				}
				
				]; 
		
		$('#tbList').ajaxPage({
			url : "${contextPath}/bam/user/userList",
			currPage : 1,
			condition : [ "id", "phone"],
			data_mapping : dataMapping
		});

		// 刷新事件
		function refresh(){
			$('#tbList').ajaxPage.refresh();
		}
		
		
		function lockRelease() {
			htmlobj = $.ajax({
				url : "${contextPath}/bam/user/toLockRelease",
				async : false
			});
			var index = layer.open({
				type : 1,
				title : '锁仓释放',
				content : htmlobj.responseText,
				area : [ '600px', '300px' ],
				zIndex : 999,
				maxHeight : 600,
				maxmin : true,
				end : function() {
					refresh();
				},
				full : function(elem) {
					var win = window.top === window.self ? window : parent.window;
				}
			});
		};
		
		
		function shareBonusRelease() {
			htmlobj = $.ajax({
				url : "${contextPath}/bam/user/toShareBonusRelease",
				async : false
			});
			var index = layer.open({
				type : 1,
				title : '分红释放',
				content : htmlobj.responseText,
				area : [ '600px', '300px' ],
				zIndex : 999,
				maxHeight : 600,
				maxmin : true,
				end : function() {
					refresh();
				},
				full : function(elem) {
					var win = window.top === window.self ? window : parent.window;
				}
			});
		};
		
		
		// 查询事件
		$('#queryBtn').on('click',function(){
			$('#tbList').ajaxPage.refresh();
		});
		
		$('#add').on(
				'click',
				function() {
					htmlobj = $.ajax({
						url : "${contextPath}/bam/user/toAddUser",
						async : false
					});
					var index = layer.open({
						type : 1,
						title : '添加用户',
						content : htmlobj.responseText,
						area : [ '800px', '600px' ],
						zIndex : 999,
						maxHeight : 600,
						maxmin : true,
						end : function() {
							refresh();
						},
						full : function(elem) {
							var win = window.top === window.self ? window : parent.window;
						}
					});

		});
		
// 		// 修改活动
// 		function update(obj) {
// 			// 获取选择的行
// 			var row = $('#tbList').ajaxPage.getRowID(obj);
// 			// 获取选择的行数据
// 			var rowdata = $('#tbList').ajaxPage.getRowData(row);
// 			// 获取选择的行ID
// 			var id = $('#tbList').ajaxPage.getPrimaryID(obj);
// 			$.ajax({
// 				url : "${contextPath}/bam/user/toAddUser",
// 				type : "post",
// 				data : {"id" : id},
// 				async : false,
// 				success : function(result) {//返回数据根据结果进行相应的处理  
// 					if(result.msg== undefined || result.msg== 'undefined'){
// 						layer.open({
// 							type : 1,
// 							title : '修改用户',
// 							content : result,
// 							//btn : [ '保存', '取消' ],
// 							area : [ '800px', '800px' ],
// 							maxmin : true,
// 							end : function() {
// 								refresh();
// 							},
// 							full : function(elem) {
// 								var win = window.top === window.self ? window
// 										: parent.window;
// 							}
// 						});
// 					}else{
// 						layer.msg(result.msg);
// 					}
					
// 				}
// 			});
// 		};
		
		
// 		function resetPassword(obj) {
// 			// 获取选择的行
// 			var row = $('#tbList').ajaxPage.getRowID(obj);
// 			// 获取选择的行数据
// 			var rowdata = $('#tbList').ajaxPage.getRowData(row);
// 			// 获取选择的行ID
// 			var id = $('#tbList').ajaxPage.getPrimaryID(obj);
// 			$.ajax({
// 				url : "${contextPath}/bam/user/toResetPassword",
// 				type : "post",
// 				data : {"id" : id},
// 				async : false,
// 				success : function(result) {//返回数据根据结果进行相应的处理  
// 					if(result.msg== undefined || result.msg== 'undefined'){
// 						layer.open({
// 							type : 1,
// 							title : '修改密码',
// 							content : result,
// 							//btn : [ '保存', '取消' ],
// 							area : [ '600px', '300px' ],
// 							maxmin : true,
// 							end : function() {
// 								refresh();
// 							},
// 							full : function(elem) {
// 								var win = window.top === window.self ? window
// 										: parent.window;
// 							}
// 						});
// 					}else{
// 						layer.msg(result.msg);
// 					}
					
// 				}
// 			});
// 		};
		
// 		function deleteUser(obj){
// 			// 获取选择的行
// 			var row = $('#tbList').ajaxPage.getRowID(obj);
// 			// 获取选择的行数据
// 			var rowdata = $('#tbList').ajaxPage.getRowData(row);
// 			// 获取选择的行ID
// 			var id = $('#tbList').ajaxPage.getPrimaryID(obj);
			
			 
// 			parent.layer.confirm('确认要删除吗？', {
// 				btn : [ '确认', '取消' ], //按钮
// 				shade : false
// 			}, function(index) {
// 				parent.layer.close(index);
// 				respose = $.ajax({
// 					url : "${contextPath}/bam/user/deleteUser",
// 					type : "post",
// 					data : {
// 						"id" : id
// 					},
// 					async : false,
// 					success : function(result) {//返回数据根据结果进行相应的处理  
// 						refresh();
// 					}
// 				});
// 			});
// 		}
		
		// 导出
		function exportXls(){
			var phone = $("#phone").val();
			var urlPath = "${contextPath}/bam/user/exports?phone="+phone;
			window.open(urlPath); 
		}
		
	</script>
	
</body>
</html>