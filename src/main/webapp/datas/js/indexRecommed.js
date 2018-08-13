 $(document).ready(function(){
		//getNavigate();
		//getArea();
		//getHotSearch();
	 findAllCultureApps();//首页APP推荐
	 getBizPubCategoryRecommed();//首页点播推荐
	 }); 
 
 	//从cookie读取用户ID
	var userId = getLocalCookieUserId();
	//手机号码
	var userPhone = getLocalCookieUserMobile();
	//区域
    var areaID = getLocalCookieAreaId();
    //当前页页码
    var currentPageNo = 1;
    //每页数量
    var pageSize = 4;
    //总页数
    var totalPage = 0;
  //是剧集或者子集  <有无 detail  三种状态 （空），（null），（detail）
	var subType = 'detail';
 
    //得到【收藏列表】
	function getCollect(RESOURCE_TYPE) { //http://127.0.0.1:8080/national-culture-cloud-h5/api/v1/encrypt  ${contextPath}
		//RESOURCE_TYPE  传进来的资源类型如 ：DIC_RESOURCE_TYPE_1（点播）
		var getcollect;//收藏列表
		if (userPhone != undefined && userPhone != "" && userPhone != null && userPhone != "null" && userPhone != "undefined") {
			$.post(urlPath, {
				'deviceType': 'DIC_RESOURCE_TYPE_1',
				'apiKey': 'api_get_getBizPubCategoryCollect',
				/*api_get_navigate  */
				'sourceType': RESOURCE_TYPE,
				'creator': userId,
				//areaI,地区ID暂时取0
				contentType: "application/json;charset=utf-8",
				datatype: 'json'
			}, function (data, status) {
				if (status == "success") {
					getcollect = data;
					console.log(getcollect);
				} else {
					console.log("API调用出错!");
				}
			});
		}
	}
	
	//资源首页【点播】推荐
	function getBizPubCategoryRecommed() { //http://127.0.0.1:8080/national-culture-cloud-h5/api/v1/encrypt  ${contextPath}
		//RESOURCE_TYPE  传进来的资源类型如 ：DIC_RESOURCE_TYPE_1（点播）
		getCollect('DIC_RESOURCE_TYPE_1');//收藏列表
		var getcollect;//收藏列表
			$.post(urlPath, {
				'deviceType': 'DIC_RESOURCE_TYPE_1',
				'apiKey': 'api_get_getBizPubCategoryRecommed',
				'pageNumber': currentPageNo,
				'pageSize': pageSize,
				'sourceType': 'PUBLISH_COLUMN_DIC_2',
				'userId': userId,
				contentType: "application/json;charset=utf-8",
				datatype: 'json'
			}, function (data, status) {
				if (status == "success") {
					$(data.returnData).each(function(i,obj){
						$("#plantingRecommed").append('<div class="pure-u-1-4">'+
				               ' <div class="column-inner">'+
				                 ' <div class="module-wrapper media-item media-cover media-card">'+
				                   ' <a class="object" href="channel-vod-detail.html?resourceId='+obj.sourceId+'&subType=detail&collectionId='+obj.collectionId+'">'+
				                    '  <img onerror=this.src="img/media-guide-demo.jpg" class="img-fit" src="'+obj.poster+'" alt="" width="285" height="214">'+
				                    '  <span class="tag tag-view"><i class="icon icon-view"></i>'+obj.visitNum+'</span>'+
				                   ' </a>'+
				                  '  <div class="caption">'+
				                  '    <h3 class="title"><a href="channel-vod-detail.html?resourceId='+obj.sourceId+'&subType=detail&collectionId='+obj.collectionId+'">'+obj.sourceName+'</a></h3>'+
				                  '  </div>'+
				                '  </div>'+
				               ' </div>'+
				             ' </div>');
					});
				} else {
					console.log("API调用出错!");
				}
			});
	}
	

	//---------------------------------------鹏哥代码
	 if(null==userId||""==userId||userId== undefined){
	    	userId =0;
	    }
		
	 //$(document).ready(function () {
		 
	
	 //资源首页【APP】推荐
		function findAllCultureApps(){
			  var params = {
						'deviceType': 'DIC_RESOURCE_TYPE_1',
						'apiKey': 'api_get_getBizPubCategoryAppRecommed',
						'pageNumber': currentPageNo,
						'pageSize': 4,
						'sourceType': 'PUBLISH_COLUMN_DIC_5',
						'userId': userId,
						contentType: "application/json;charset=utf-8",
						datatype: 'json'	
				}
			$.post(urlPath,params,function(data){
				if(data.returnCode == "1"){
					$(data.returnData).each(function(i,obj){
						totalPage = data.totalPage;
						//if(totalPage>0){
							var appDesc=obj.appDesc;
							var len=appDesc.length;
							if(len>44){
								appDesc=appDesc.substring(0,46);
							}
							 var ShouCangHtml =
	                                "<div class='attach-item J_ModuleFavoriteAPP module-favorite-app' id='" +obj.sourceId +"' Canel=''  >" +
	                                "<i class='icon'></i><span class='point J_ModuleFavoriteAPPToggle' >收藏</span></div>";
	                            if (null != obj.cacId) {
	                                ShouCangHtml = "<div class='attach-item J_ModuleFavoriteAPP module-favorite-app module-favorite-app-active' id='" +obj.sourceId +"' Canel='canel'  >" +
	                                    "<i class='icon'></i><span class='point J_ModuleFavoriteAPPToggle' >已收藏</span></div>";
	                            }
	                            $("#favAppList").append(
	                                    '<div class="pure-u-1-2">' +
	                                    '    <div class="item-inner media-side">' +
	                                    '        <div class="object">' +
	                                    '            <a class="J_ViewCount" href=' + obj.appHref + ' target="_blank" value=' +obj.sourceId +'>' +
	                                    '              <img src=' + obj.appImgUrl + ' alt="" width="172" height="184" />' +
	                                    '            </a>' +
	                                    '        </div>' +
	                                    '        <div class="caption">' +
	                                    '            <h3 class="headline">' +
	                                    '              <a href=' + obj.appHref + ' target="_blank"  value=' + obj.sourceId + '  class="J_ViewCount">' + obj.appName + '</a>' +
	                                    '            </h3>' +
	                                    '            <div class="abstract">' +
	                                    '                <p>'+ appDesc +'</p>' +
	                                    '            </div>' +
	                                    '            <div class="attach attach-inline">' +
	                                    '                <div class="attach-main">' +
	                                    '                    ' + ShouCangHtml +
	                                    '                    <div class="attach-item view-count">' +
	                                    '                        <i class="icon"></i>' +
	                                    '                        <span class="point">' + obj.appBaseNumber + '</span>' +
	                                    '                    </div>' +
	                                    '                </div>' +
	                                    '                <div class="attach-aside">' +
	                                    '                    <div class="favorite-popup app-qr-popup popup-wrapper J_Popup">' +
	                                    '                        <div class="popup-header">' +
	                                    '                            <i class="icon"></i>扫一扫' +
	                                    '                            <br>手机浏览' +
	                                    '                        </div>' +
	                                    '                        <div class="popup-container">' +
	                                    '                            <div class="popup-panel">' +
	                                    '                                <i class="icon-arrow icon-arrow-up"></i>' +
	                                    '                                <div class="popup-inner" data-qrheight="100" data-qrwidth="100" data-qrurl="obj.appHref">' +
	                                    '                                    <img class="img-responsive" src=' + obj.androidUrl + '>' +
	                                    '                                </div>' +
	                                    '                            </div>' +
	                                    '                        </div>' +
	                                    '                    </div>' +
	                                    '                </div>' +
	                                    '            </div>' +
	                                    '        </div>' +
	                                    '    </div>' +
	                                    '</div>'
	                                );
								});
					
					}else{
	    			console.log("API调用出错!");
	    		}
				
				$(".J_ViewCount").on("click", function () {
					userVistHitory($(this));
					//alert($(this).attr("value"));
				});

                 function userVistHitory($obj) {
                     var appId = $obj.attr("value");
                     console.log($obj)
                     if ("" != userId || userId != null) {
                         var params = {
                             'apiKey': 'api_get_saveCultureAppVistHistory',
                             'deviceType': 'DIC_DEVICE_TYPE_1',
                             'appId': appId,
                             'userId': userId,
                             contentType: "application/json;charset=utf-8",
                             datatype: 'json'
                         };
                         $.post(urlPath, params, function (data) {
                             if (data.returnCode == "1") {
                                 console.log("保存浏览记录!");
                             }
                         });
                         //window.open($(obj).attr("href"));
                     }
                 }

                 function XModal(modalWidth, modalID) {
                     layer.open({
                         type: 1,
                         title: false,
                         closeBtn: 0,
                         shade: 0.8,
                         shadeClose: true,
                         area: modalWidth,
                         content: $(modalID)
                     });
                 }
                 $(".module-favorite-app").on("click", function () { //收藏
                     var appId = $(this).attr("id");
                     var Canel = $(this).attr("Canel");
                     var p = $(this);
                     if (userId == 0 || userPhone == undefined || userPhone == "" ||
                         userPhone == null || userPhone == "null") {
                         XModal("550px", "#J_ModalNoLoginVerify");
                     } else {
                         if (Canel == "canel") { //如果有值就取消
                             var params = {
                                 'apiKey': 'api_get_deleteUserCultureApps',
                                 'deviceType': 'DIC_DEVICE_TYPE_1',
                                 'appId': appId,
                                 'userId': userId,
                                 contentType: "application/json;charset=utf-8",
                                 datatype: 'json'
                             };
                             $.post(urlPath, params, function (data) {
                                 //p.replaceWith("<span class='fav-app-add' id="+obj.id+" Canel='' onclick='collect(this)'>"
                                 //+"<img src='img/icon-favorite.png' alt='favorite'><span>收藏</span></span>");
                                 p.removeClass("module-favorite-app-active");
                                 p.find(".J_ModuleFavoriteAPPToggle").html("收藏");
                                 p.attr("Canel", "");
                             });
                         } else { //加入收藏
                             var params = {
                                 'apiKey': 'api_get_saveCultureAppCollect',
                                 'deviceType': 'DIC_DEVICE_TYPE_1',
                                 'appId': appId,
                                 'userId': userId,
                                 contentType: "application/json;charset=utf-8",
                                 datatype: 'json'
                             };
                             $.post(urlPath, params, function (data) {
                                 //p.replaceWith("<div class='collect clearfix collect-act' style='width:50px' id='"+obj.id+"' Canel='' onclick='collect(this)'><span class='pull-left'  >已收藏</span></div>");
                                 p.addClass("module-favorite-app-active");
                                 p.find(".J_ModuleFavoriteAPPToggle").html("已收藏");
                                 p.attr("Canel", "canel");
                             });
                         }
                     }

                 });
	    	});
		}
		
		
		/**翻页加载更多**/
		function ajaxAddMore(){
			pageNumber=pageNumber+1;
			if(pageNumber>totalPage){
				console.log("已经是最后一页!");
			}else{
				findAllCultureApps();
			}
		}
		function tiaoZhuan(obj){
			window.open($(obj).attr("href"));
		}
		
		function collect(obj){
			var appId =$(obj).attr("id");
			var Canel =$(obj).attr("Canel");
			var p=$(obj);
			if(userId==0||userPhone == undefined || userPhone == "" || userPhone == null|| userPhone == "null"){
				location.href="./user-signin.html";
			}else{
				if(Canel=="canel"){//如果有值就取消
					var params = {
							'apiKey' : 'api_get_deleteUserCultureApps',
			    			'deviceType' : 'DIC_DEVICE_TYPE_2',
			    			'appId':appId,
			    			'userId':userId,
							 contentType : "application/json;charset=utf-8",
							 datatype : 'json'	
					};
					$.post(urlPath,params,function(data){
						p.replaceWith('<div class="collect clearfix" id='+obj.id+' Canel=""  onclick="collect(this)" ><i class="icon-collect pull-left"></i><span class="pull-left collect_tip">收藏</span></div>');
					});
				}else{//加入收藏
					var params = {
							'apiKey' : 'api_get_saveCultureAppCollect',
			    			'deviceType' : 'DIC_DEVICE_TYPE_1',
			    			'appId':appId,
			    			'userId':userId,
							 contentType : "application/json;charset=utf-8",
							 datatype : 'json'	
					};
					$.post(urlPath,params,function(data){
						p.replaceWith('<div class="collect clearfix active" id="'+obj.id+'" Canel=""  onclick="collect(this)"><i class="icon-collect pull-left"></i><span class="pull-left collect_tip">已收藏</span></div>');
					});
				}
					}				
			
			}
		function vistHitory(obj){
			var appId =$(obj).attr("value");
			if(""!=userId||userId!=null||userId!="null"){
				var params = {
						'apiKey' : 'api_get_saveCultureAppVistHistory',
		    			'deviceType' : 'DIC_DEVICE_TYPE_2',
		    			'appId':appId,
		    			'userId':userId,
						contentType : "application/json;charset=utf-8",
						datatype : 'json'	
				};
				$.post(urlPath,params,function(data){
					if(data.returnCode == "1"){
						console.log("保存浏览记录!");
						}
				});
				window.open($(obj).attr("hrefUrl"));
			}
			}
		//---------------------------------------鹏哥代码
		//页面跳转带中文参数
		function toUrl(getUrl){
			//alert(getUrl);
			window.location.assign(encodeURI(getUrl));
		}
	
		