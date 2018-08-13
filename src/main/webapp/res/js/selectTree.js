(function($) {
	var $this;
	var $selectedObj;
	var selectTree;
	var selectTreeContent,selectTreeSeleted;
	// 插件的定义     
	$.fn.selectTree = function(options) {
		//get specific parameter to opts
		var opts = $.extend({}, $.fn.selectTree.defaults, options);
		var url =opts.url;
		$selectedObj=$("#"+opts.selectedObj);
		$this=this;
		selectTree=opts.selectTree;
		selectTreeContent="_"+selectTree+"Content";
		selectTreeSeleted="_"+selectTree+"Seleted";
		var content ='<div id="'+selectTreeContent+'" class="MenuContent"	style="display: none; position: absolute;">	<ul id="'+selectTreeSeleted+'" class="ztree ztree-select"></ul>	</div>'
		$this.after(content);
	};
	 
	function onCheck() {
	};

	$.fn.selectTree.showTree =function(url,selectTree)   {
		var setting = {
				async:{
					enable : true,
					url:url
				},
			check : {
				enable : true,
				chkStyle: "checkbox",
				chkboxType: { "Y": "ps", "N": "ps" }
			},
			data : {
				simpleData : {
					enable : true,
					rootPId : 0 
				}
			},
			callback : {
				beforeAsync : onCheck,
				onCheck : onCheck
			}
		};
	$.fn.zTree.init($("#"+selectTreeSeleted), setting);
		var o = $this;
		var obj = $("#"+selectTree);
		thisOffset = obj.offset(); //$("#pubCategroyTree").offset();
		var layerOffset = $(".layui-layer").offset();
		//alert(JSON.stringify(thisOffset)+"  "+JSON.stringify(layerOffset));
		//+ obj.height()
		$("#"+selectTreeContent).css({
			left : (thisOffset.left - layerOffset.left) + "px",
			top : (thisOffset.top - layerOffset.top) + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	};
	function hideTree() {
		$("#"+selectTreeContent).fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	};
	function onBodyDown(event) {
		if (!(event.target.id == selectTree || event.target.id == selectTreeContent|| event.target.id == selectTreeSeleted || $(
				event.target).parents("#"+selectTreeContent).length > 0)) {
			hideTree();
		}
	};
	
	// 插件的defaults     
	$.fn.selectTree.defaults = {
		 selectTree:"",
		 selectedObj:""
	};
	// 闭包结束     
})(jQuery);



	