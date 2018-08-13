/**
 * 这里一个公共页面JS
 * @auther:luorongfeng 
 */
//基础配置
layui.config({
		  dir: 'res/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
		  ,version: false //一般用于更新组件缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
		  ,debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
		  ,base: 'res/layui/lay/modules/' //设定扩展的Layui组件的所在目录，一般用于外部组件扩展
		});
//加载模块
layui.use(['icheck','layer','layedit','laydate','form', 'element','flow'], function() {
					var $ = layui.jquery;
				
					layer = parent.layer === undefined ? layui.layer : parent.layer
					,layedit = layui.layedit
					,laydate = layui.laydate
					,form = layui.form()
					,flow = layui.flow
					,element = layui.element();
				//相关模块公共事件
				//处理checkbox事件 begin
				$('.site-table tbody tr').on('click', function(event) {
					var $this = $(this);
					var $input = $this.children('td').eq(0).find('input');
					$input.on('ifChecked', function(e) {
						$this.css('background-color', '#EEEEEE');
					});
					$input.on('ifUnchecked', function(e) {
						$this.removeAttr('style');
					});
					$input.iCheck('toggle');
				}).find('input').each(function() {
					var $this = $(this);
					$this.on('ifChecked', function(e) {
						$this.parents('tr').css('background-color', '#EEEEEE');
					});
					$this.on('ifUnchecked', function(e) {
						$this.parents('tr').removeAttr('style');
					});
				});
				$('#selected-all').on('ifChanged', function(event) {
					var $input = $('.site-table tbody tr td').find('input');
					$input.iCheck(event.currentTarget.checked ? 'check' : 'uncheck');
				});
});
