/**
 * <p>这是一个异步请求支持JSON数据的联动下拉列表插件</p>
 *  Dynamic Select plugin for JSON
 *  传入json数据对象，根据JSON数据，进行下拉联动，操作SELECT，根据获取到的select进行操作。这里是无限级联动.
 *  数据格式： [{k:"430",v:"湖南",c:[{k:"0731",v:"长沙",c:[{k:"073101",v:"芙蓉区"},{k:"073102",v:"天心区"}]}]}]
 *  使用方法： var jdata=  [{k:"430",v:"湖南",c:[{k:"0731",v:"长沙",c:[{k:"073101",v:"芙蓉区"},{k:"073102",v:"天心区"}]}]}];
	     ajax请求：  //var jdata= $.ajax({	url : "res/js/area.js",async : false});
	     绑定到select:$("#test1").dynSelect({select_btn:["test1","test2","test3"],json_data:jdata});
	     select_btn:按顺序绑定到id
	     json_data: json格式数据
 * @auth Ron 
 * @param $ v1.0 2017-01-05
 */
// 创建一个闭包     
(function($) {
	var $this;
	var level=1;
	var select_btn=[];
	var json_data=[];
	// 插件的定义     
	$.fn.dynSelect = function(options) {
		//get specific parameter to opts
		var opts = $.extend({}, $.fn.dynSelect.defaults, options);
		//window.console.log(JSON.stringify(opts));
		level=opts.level;
		//opts.json_data !== undefined && typeof(opts.json_data) === 'object';
		json_data = opts.json_data||eval('('+opts.json_data+')');
		select_btn=opts.select_btn;
		//$.log("length:"+select_btn.length);
		//register event for fisrt select
		bindChangeEvent( $(this),0,json_data);
		buildSelect( $(this),json_data);
	};
	//get child as key
	function getChild(data,k) {
		var arr = $.grep(data, function(n, i){
			  return (k==n.k);
			});
		return arr.length>0?arr[0].c:[];
	};
	//build select label
	function buildSelect(sel,data){
		var opt="";
		sel.empty();
		opt+="<option>所有</option>";
		for (var i = 0, l =(data!=undefined && typeof data!="undefined"?data.length:0); i < l; i++) {
			opt+="<option value="+data[i].k+">"+data[i].v+"</option>";
		}
		sel.append(opt);
	};
	//register change event for select label
	function bindChangeEvent(sel,idx,data)
	{
		// here event depend on layui's form  
		layui.use(['jquery','form'], function() {
			var $=layui.jquery, form=layui.form();
			var filter='select('+sel.attr("lay-filter")+")";
			form.on(filter, function(d) {
				renderSelect(idx,d,data);
			});
		});
		
	};
	function rebuildSelect(idx){
		for(var i=idx;i<select_btn.length;i++){
			var nextSel = $('#' + select_btn[i]);
			buildSelect(nextSel,[]);
			//$.log("rebuild:"+select_btn[i]);
		}
			
	}
	//
	function renderSelect(idx, d, data) {
		var child = getChild(data, d.value);
		var nextSel = $('#' + select_btn[idx + 1]);
		//$.log(idx + "  " + JSON.stringify(child));
		if (idx < select_btn.length - 2) {
			bindChangeEvent(nextSel, idx + 1, child);
			rebuildSelect(idx+1);
		}
		buildSelect(nextSel, child);
		form.render();
	}
	;
	
	
	// 插件的defaults     
	$.fn.dynSelect.defaults = {
		 select_btn:["sel"],
		json_data : [{"k":"请选择","v":""}] 
	};
	// 闭包结束     
})(jQuery);

