
//获取热门搜索
function getHotSearch() {
	$.post(urlPath, {
		'deviceType' : 'DIC_DEVICE_TYPE_1',
		'apiKey' : 'api_get_getHotSearch',
		contentType : "application/json;charset=utf-8",
		datatype : 'json'
	}, function(data, status) {
		if (status == "success") {
			$.each(data.returnData,function(i,obj){
				$("#HotSearch").append('<dd><a href="javascript:void(0)" onclick="searchKeywordClick(this)">'+obj.searchKeyword+'</a></dd>');
			});
		} else {
			console.log("API调用出错!");
		}
	});
}
//获取导航、搜索分类
function getNavigate() {
	$.post(urlPath, {
		'deviceType' : 'DIC_DEVICE_TYPE_1',
		'apiKey' : 'api_get_navigate',
		contentType : "application/json;charset=utf-8",
		datatype : 'json'
	}, function(data, status) {
		if (status == "success") {
			//var datatemp=JSON.stringify(data.returnData);
			$.each(data.returnData,function(i,obj){
				if(i==0){
				}
				else if((data.returnData.length-2)==i){
				}else if((data.returnData.length-1)==i){
				}
				else{
						if(i==1){
						$("#searchtemp").append('<span class="xselect-title" id="'+obj.resourceTypeDic+'">'+obj.navName+'</span><i class="icon-arrow icon-arrow-down"></i>');
					}else{
						$("#searchul").append('<li class="xselect-item" id ="'+obj.resourceTypeDic+'" onclick="categoryClick(this)">'+obj.navName+'</li>');
					}
				}
			});
		} else {
			console.log("API调用出错!");
		}
	});
}
//获取区域
function getArea() {
	$.post(urlPath, {
		'deviceType' : 'DIC_DEVICE_TYPE_1',
		'apiKey' : 'api_get_areaByLevel',
		contentType : "application/json;charset=utf-8",
		datatype : 'json'
	}, function(data, status) {
		if (status == "success") {
			var localAreaId=getLocalCookieAreaId()
			//var datatemp=JSON.stringify(data.returnData);
			$.each(data.returnData,function(i,obj){
					if(i==0){
					if(localAreaId==null||localAreaId==""){
						$("#J_RegionHeaderInner").append('<div class="item"><a data-id="'+obj.area_id+'" class="selected" href="javascript:void(0)" onclick="areaClick(this)">'+obj.area_name+'</a></div>');
						saveLocalCookieAreaId(obj.area_id);
						$("#areatemp span").text(obj.area_name);
					}else if(localAreaId==obj.area_id){
						$("#J_RegionHeaderInner").append('<div class="item"><a data-id="'+obj.area_id+'" class="selected" href="javascript:void(0)" onclick="areaClick(this)">'+obj.area_name+'</a></div>');
						$("#areatemp span").text(obj.area_name);
					}else{
						$("#J_RegionHeaderInner").append('<div class="item"><a data-id="'+obj.area_id+'" href="javascript:void(0)" onclick="areaClick(this)">'+obj.area_name+'</a></div>');
					}
				}else{
					if(localAreaId==obj.area_id){
						$("#J_RegionHeaderInner").append('<div class="item"><a data-id="'+obj.area_id+'" class="selected" href="javascript:void(0)" onclick="areaClick(this)">'+obj.area_name+'</a></div>');
						$("#areatemp span").text(obj.area_name);
					}else{
						$("#J_RegionHeaderInner").append('<div class="item"><a data-id="'+obj.area_id+'"  href="javascript:void(0)" onclick="areaClick(this)">'+obj.area_name+'</a></div>');
					}
				}
			});
		} else {
			console.log("API调用出错!");
		}
	});
}
//热门搜索点击事件
function searchKeywordClick(btn){
	var searchKeywordtext=$(btn).text();
	/*var searchType=$("#searchtemp span").attr("id"); //资源类型
	var areaId=$("#areatemp span").attr("id"); //区域ID

	var param = searchKeywordtext+"&"+searchType;
	if(searchType == 'DIC_RESOURCE_TYPE_9'){
		location.href="./search-venue.html?"+"param="+encodeURI(param);
	}else if(searchType == 'DIC_RESOURCE_TYPE_7'){
		location.href="./search-activity.html?"+"param="+encodeURI(param);
	}else if(searchType == 'DIC_RESOURCE_TYPE_8'){
		location.href="./search-live.html?"+"param="+encodeURI(param);
	}else if(searchType == 'DIC_RESOURCE_TYPE_1'){
		location.href="./search-vod.html?"+"param="+encodeURI(param);
	}else if(searchType == 'DIC_RESOURCE_TYPE_12'){
		location.href="./search-app.html?"+"param="+encodeURI(param);
	}*/
	location.href = "./search.html?" + "keyWord=" + encodeURI(searchKeywordtext);
}
//区域点击事件
function areaClick(btn){
	var areatext=$(btn).text();
	$(".item a").removeClass("selected");
	$(btn).attr("class","selected");
	$("#areatemp span").text(areatext);
	$("#areatemp span").attr("id",$(btn).attr("data-id"));
	saveLocalCookieAreaId($(btn).attr("data-id"));
}
//搜索资源分类点击事件
function categoryClick(btn){
	var categorytext=$(btn).text();
	$("#searchtemp span").text(categorytext);
	//alert($(btn).attr("id"));
	$("#searchtemp span").attr("id",$(btn).attr("id"));

}

/**
 * 获取区域ID
 */
function getAreaId(){
	var areaId=$("#areatemp span").attr("id"); //区域ID
	return areaId;
};
 // 弹出
  $(".J_Popup").on({
        mouseenter: function() {
            $(this).addClass("popup-active");
        },
        mouseleave: function() {
            $(this).removeClass("popup-active");
        }
    });
    // 自定义下拉选择项
    $(".J_Select").on({
        mouseenter: function() {
            $(this).addClass("xselect-unfold");
        },
        mouseleave: function() {
            $(this).removeClass("xselect-unfold");
        }
    });
    $(".xselect-item").on("click", function () {
        var $this = $(this);
        $this.parents(".J_Select").removeClass("xselect-unfold").find(".xselect-title").text($this.text());
    });
    // 模拟 退出操作提示
    $(".J_SignOut").on("click", function () {
    	//saveLocalCookieUserId("","","","","");
    	removeLocalCookieUserId();
    	saveUserVisitor();
        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shade: 0.8,
            shadeClose: true,
            area: "550px",
            content: $("#J_ModalSignOutSuccess")
        });
        $(".page-header").find(".signinfo").addClass("hidden").end().find(".sign").removeClass("hidden");
        //layer.close(layer.index);
        //var menuId = getLocalCookieMenuId();
        window.location.href = 'index.html';
    });