	// 分页处理开始		
	var pageNumber = 1;
	var totalPage = 1;
	var pageSize = 5;
	var scrollTop;               // 滚动条距离顶部的高度
    var scrollHeight;            // 当前页面的总高度
    var windowHeight;            // 当前可视的页面高度
 	var loadHeight;  		    // 加载临界点
	var startY;
 	var endY;
   	$(window).scroll(function(){
	   	scrollTop = $(this).scrollTop();               // 滚动条距离顶部的高度
	    windowHeight = $(this).height();               // 当前可视的页面高度
	    loadHeight = scrollTop + windowHeight ;  	    // 加载临界点
   	})
   	
   	 function getElem(id) {
   		var ele = document.getElementsByClassName(id)[0];
   		var height = ele.offsetHeight;
   		var wrap = {
   			'height' :height,
   			'ele': ele
   		}
   		return wrap
   	 }
   	
   	function page(fn, content){
   		fn();
   		var contentBodyBox = getElem(content).ele;
   		var loadingWrap = $(".dropload-up");
   		
   		contentBodyBox.addEventListener('touchstart', function(event) {  	   	 	
	  	   	startY = event.touches[0].clientY;
	  	    scrollHeight = getElem(content).height;
		},false);
   		
   		contentBodyBox.addEventListener('touchmove', function(event) {
   			
   			loadingWrap.find('.dropload-load').remove()
	  	   
	  	    scrollHeight = getElem(content).height;
		  	  if (!loadHeight || loadHeight >= scrollHeight) {
		  		  if (pageNumber <= totalPage) {
		  			var loading = '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
			  	    loadingWrap.append(loading)
		  		  } else {
				  	    loadingWrap.html('没有更多数据了')
		  		  }
		  	  }
		},false);
   		
	   	contentBodyBox.addEventListener('touchend', function(event) {
	   		loadingWrap.find('.dropload-load').remove()
	  	   	endY = event.changedTouches[0].clientY;
	  	    moveHeight = Math.abs(startY - endY);
	  	    if(startY > endY) {
	  	    	if ((!loadHeight || loadHeight >= scrollHeight) && pageNumber <= totalPage) {
	  	    	 pageNumber++;
	  	    	 fn();
 	            }	
	  	    }
		},false);
   		
   	}
   	// 分页处理结束